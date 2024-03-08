document.addEventListener("DOMContentLoaded", function() {
    let currentSlide = 0;
    let startX = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let autoSlideInterval;

    const radioButtons = document.querySelectorAll('input[name="radio-btn"]');

    // Adicionando evento de clique para cada botão de rádio
    radioButtons.forEach((radioBtn, index) => {
        radioBtn.addEventListener('click', function() {
            clearInterval(autoSlideInterval); // Limpa o intervalo atual
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide(); // Reinicia o avanço automático do slide
        });
    });

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval); // Limpa o intervalo atual
        autoSlideInterval = setInterval(nextSlide, 5000); // Define o intervalo para avanço automático
    }

    // Adicionando detecção de eventos de toque para dispositivos móveis
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', function(e) {
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Deslizou para a esquerda
                nextSlide();
            } else {
                // Deslizou para a direita
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                showSlide(currentSlide);
            }
            clearInterval(autoSlideInterval); // Limpa o avanço automático
            startAutoSlide(); // Reinicia o avanço automático do slide
        }
    });

    // Mostra o primeiro slide e inicia o avanço automático
    showSlide(currentSlide);
    startAutoSlide();
});

