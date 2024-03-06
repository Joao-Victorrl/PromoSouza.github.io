document.addEventListener("DOMContentLoaded", function() {
  let currentSlide = 0;
  let autoSlideInterval; // Variável para armazenar o intervalo da troca automática de slides
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const buttons = document.querySelectorAll('.manual-btn');
  let videoPlaying = false; // Variável para controlar se um vídeo está sendo reproduzido atualmente

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });

    // Se o slide atual for um vídeo
    if (slides[index].querySelector('video')) {
      const video = slides[index].querySelector('video');
      video.play();
      videoPlaying = true;

      // Defina um evento de término para o vídeo
      video.onended = function() {
        videoPlaying = false;
        nextSlide(); // Avança para o próximo slide após o término do vídeo
      };
    } else {
      // Se não for um vídeo, avance para o próximo slide após 6 segundos, apenas se nenhum vídeo estiver sendo reproduzido
      if (!videoPlaying) {
        setTimeout(nextSlide, 6000); // Tempo em milissegundos (6 segundos)
      }
    }

    // Adiciona a classe 'active' ao botão correspondente
    buttons.forEach((btn, i) => {
      btn.classList.remove('active');
      if (i === index) {
        btn.classList.add('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Mostra a primeira imagem
  showSlide(currentSlide);

  // Intervalo para trocar de slide a cada 6 segundos (6000ms)
  autoSlideInterval = setInterval(nextSlide, 6000);

  // Pausar a troca automática de slides enquanto o vídeo estiver sendo reproduzido
  document.querySelectorAll('.slide video').forEach(video => {
    video.addEventListener('play', function() {
      clearInterval(autoSlideInterval);
    });
    video.addEventListener('pause', function() {
      autoSlideInterval = setInterval(nextSlide, 6000);
    });
  });

  // Adicionando funcionalidade de troca manual
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', function() {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Adicionando funcionalidade de troca manual anterior
  document.querySelector('#prevSlide').addEventListener('click', function() {
    prevSlide();
  });
});
