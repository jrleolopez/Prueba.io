<?php
session_start();
include 'db.php';
include 'crud.php';

// Verificar si el usuario ha iniciado sesión y es administrador
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
$stmt->execute([$_SESSION['usuario_id']]);
$usuarioActual = $stmt->fetch();

if ($usuarioActual['role'] != 'admin') {
    header("Location: index.php");  // Redirigir si no es admin
    exit;
}
?>

<a href="logout.php">Cerrar sesión</a>

<h1>Gestionar Usuarios</h1>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($usuarios as $usuario): ?>
        <tr>
            <td><?php echo $usuario['id']; ?></td>
            <td><?php echo $usuario['usuario']; ?></td>
            <td><?php echo $usuario['role']; ?></td>
            <td>
                <a href="index.php?editar_usuario=<?php echo $usuario['id']; ?>">Editar</a>
                <a href="index.php?eliminar_usuario=<?php echo $usuario['id']; ?>" onclick="return confirm('¿Seguro que deseas eliminar este usuario?');">Eliminar</a>
            </td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<!-- Si es edición, mostrar el formulario -->
<?php if (isset($_GET['editar_usuario'])): ?>
    <?php
        $idUsuarioEditar = $_GET['editar_usuario'];
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
        $stmt->execute([$idUsuarioEditar]);
        $usuarioEditar = $stmt->fetch();
    ?>
    <h2>Editar Usuario</h2>
    <form method="POST" action="crud.php">
        <input type="hidden" name="id" value="<?php echo $usuarioEditar['id']; ?>">
        <input type="text" name="usuario" value="<?php echo $usuarioEditar['usuario']; ?>" required>
        <input type="password" name="contraseña" placeholder="Nueva contraseña" required>
        <select name="role">
            <option value="user" <?php echo $usuarioEditar['role'] == 'user' ? 'selected' : ''; ?>>Usuario</option>
            <option value="admin" <?php echo $usuarioEditar['role'] == 'admin' ? 'selected' : ''; ?>>Administrador</option>
        </select>
        <button type="submit" name="editar_usuario">Guardar Cambios</button>
    </form>
<?php endif; ?>
