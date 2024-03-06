document.addEventListener("DOMContentLoaded", function() {
  let currentSlide = 0;
  let autoSlideInterval; // Variável para armazenar o intervalo da troca automática de slides
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.style.display = i === index ? 'block' : 'none';
      });

      const currentSlideElement = slides[index];

      // Se o slide atual for um vídeo, reproduza-o
      if (currentSlideElement.querySelector('video')) {
          const video = currentSlideElement.querySelector('video');
          video.play();

          // Definir um evento para quando o vídeo terminar
          video.addEventListener('ended', function() {
              video.pause(); // Pausa o vídeo
              video.currentTime = 0; // Reinicia o vídeo
              nextSlide(); // Avança para o próximo slide após o término do vídeo
          });

          // Define o tempo de duração do slide igual ao tempo de duração do vídeo
          const videoDuration = Math.floor(video.duration * 1000); // Duração do vídeo em milissegundos
          clearInterval(autoSlideInterval); // Limpa o intervalo atual
          autoSlideInterval = setInterval(nextSlide, videoDuration); // Define o novo intervalo baseado na duração do vídeo
      } else {
          // Se for uma imagem, mantenha o intervalo padrão de 6 segundos
          clearInterval(autoSlideInterval); // Limpa o intervalo atual
          autoSlideInterval = setInterval(nextSlide, 6000); // Define o novo intervalo para imagens
      }
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
  }

  // Mostra o primeiro slide
  showSlide(currentSlide);
});

