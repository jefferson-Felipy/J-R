document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");

    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.animation = `fall ${Math.random() * 5 + 3}s linear infinite`;
        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    setInterval(createHeart, 500);
});

// Elementos DOM
const counterElement = document.getElementById('counter');
const dateInput = document.getElementById('start-date');

// Data padrão
const defaultDate = new Date('2020-01-01');
dateInput.valueAsDate = defaultDate;

// Função para calcular dias passados
function calculateDaysPassed(startDate) {
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Função para formatar número com separadores de milhar
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Atualizar contador
function updateCounter() {
    const selectedDate = new Date(dateInput.value);
    const daysPassed = calculateDaysPassed(selectedDate);
    counterElement.textContent = formatNumber(daysPassed);
}

// Atualizar a cada segundo
setInterval(updateCounter, 1000);

// Atualizar quando o usuário mudar a data
dateInput.addEventListener('change', updateCounter);

// Inicializar
updateCounter();

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicators = document.querySelectorAll('.indicator');

    let currentIndex = 0;
    const totalItems = items.length;
    let autoSlideInterval;

    // Função para atualizar o carrossel
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Função para avançar para o próximo slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    // Função para voltar ao slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    // Event listeners para os botões
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event listeners para os indicadores
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', () => {
            currentIndex = parseInt(indicator.getAttribute('data-index'));
            updateCarousel();
        });
    });

    // Iniciar slides automáticos
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // Parar slides automáticos quando o mouse está sobre o carrossel
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Adicionar eventos de mouse
    const carouselContainer = document.querySelector('.body');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    // Adicionar suporte para teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Adicionar suporte para touch (swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;

        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide();
        }
    }

    // Iniciar o carrossel
    updateCarousel();
    startAutoSlide();
});