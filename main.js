document.addEventListener("DOMContentLoaded", function () {
    const carrusel = document.querySelector('.carrusel');
    let index = 0;
    const totalSlides = 3;

    setInterval(() => {
      index = (index + 1) % totalSlides;
      carrusel.style.transform = `translateX(-${index * (100 / totalSlides)}%)`;
      carrusel.style.transition = 'transform 0.5s ease-in-out';
    }, 5000);
  });
