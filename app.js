var grupoTarjetas = ["🦄", "🍦", "🌈", "👽", "👾", "🤖", "👹"];
var totalTarjetas = grupoTarjetas.concat(grupoTarjetas);

var contadorAciertos = 0;
var contadorErrores = 0;
var tiempoRestante = 60; // Tiempo total en segundos para el juego
var temporizador;

reparteTarjetas();
actualizaContadores();

document.querySelectorAll(".tarjeta").forEach(function(elemento) {
  elemento.addEventListener("click", descubrir);
});

// Iniciar el temporizador
iniciarTemporizador();

function barajaTarjetas() {
  var resultado;
  resultado = totalTarjetas.sort(function() {
    return 0.5 - Math.random();
  });
  return resultado;
}

function reparteTarjetas() {
  var mesa = document.querySelector("#mesa");
  var tarjetasBarajadas = barajaTarjetas();
  mesa.innerHTML = "";

  tarjetasBarajadas.forEach(function(elemento) {
    var tarjeta = document.createElement("div");

    tarjeta.innerHTML =
      "<div class='tarjeta' data-valor= " +
      elemento +
      ">" +
      "<div class='tarjeta__contenido'>" +
      elemento +
      "</div>" +
      "</div>";

    mesa.appendChild(tarjeta);
  });
}

function descubrir() {
  var descubiertas;
  var totalDescubiertas = document.querySelectorAll(
    ".descubierta:not(.acertada)"
  );

  if (totalDescubiertas.length > 1) {
    return;
  }

  this.classList.add("descubierta");

  descubiertas = document.querySelectorAll(".descubierta:not(.acertada)");
  if (descubiertas.length < 2) {
    return;
  }

  comparar(descubiertas);
}

function comparar(tarjetasAComparar) {
  // Compara el valor del atributo data-valor de las dos tarjetas
  var tarjeta1 = tarjetasAComparar[0];
  var tarjeta2 = tarjetasAComparar[1];

  if (tarjeta1.getAttribute("data-valor") === tarjeta2.getAttribute("data-valor")) {
    acierto(tarjetasAComparar);
  } else {
    error(tarjetasAComparar);
  }
}

function acierto(lasTarjetas) {
  // Añade la clase acertada a las tarjetas que han hecho match
  lasTarjetas.forEach(function(tarjeta) {
    tarjeta.classList.add("acertada");
  });

  contadorAciertos++; // Incrementa contador de aciertos
  console.log("Aciertos: " + contadorAciertos);
  actualizaContadores();

  // Verificar si todas las tarjetas han sido acertadas
  if (contadorAciertos === totalTarjetas.length / 2) {
    clearInterval(temporizador); // Detener el temporizador
    setTimeout(function() {
      alert("¡Has ganado! Felicitaciones.");
      resetearJuego(); // Reiniciar el juego al ganar
    }, 500);
  }
}

function error(lasTarjetas) {
  // Añade la clase error a las tarjetas que no han hecho match
  lasTarjetas.forEach(function(tarjeta) {
    tarjeta.classList.add("error");
  });

  contadorErrores++; // Incrementa contador de errores
  console.log("Errores: " + contadorErrores);
  actualizaContadores();

  // Quita las clases descubierta y error después de 1000ms
  setTimeout(function() {
    lasTarjetas.forEach(function(tarjeta) {
      tarjeta.classList.remove("descubierta", "error");
    });
  }, 1000);
}

function iniciarTemporizador() {
  temporizador = setInterval(function() {
    if (tiempoRestante > 0) {
      tiempoRestante--;
      document.querySelector("#temporizador").innerHTML = tiempoRestante + "s";
    } else {
      clearInterval(temporizador); // Detiene el temporizador
      alert("¡Perdiste idiota!"); // Alerta cuando el tiempo se acabe
      // Reiniciar el juego
      resetearJuego();
    }
  }, 1000);
}

function resetearJuego() {
  // Reinicia los contadores y el temporizador
  contadorAciertos = 0;
  contadorErrores = 0;
  tiempoRestante = 30;

  actualizaContadores();
  reparteTarjetas();
  iniciarTemporizador();
}

function actualizaContadores() {
  // Actualiza los contadores de aciertos y errores en el HTML
  document.querySelector("#aciertos").innerHTML = "Aciertos: " + contadorAciertos;
  document.querySelector("#errores").innerHTML = "Errores: " + contadorErrores;
  document.querySelector("#temporizador").innerHTML = tiempoRestante + "s";
}
