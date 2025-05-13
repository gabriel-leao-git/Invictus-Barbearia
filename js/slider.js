document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider');
    const sliderNav = document.querySelector('.slider-nav');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    // Dados dos slides
    const slidesData = [
        {
            image: 'imagens/slides/cabelo-rosa.png',
            title: '',
            text: 'CORTE PERSONALIZADO'
        },
        {
            image: 'imagens/slides/cabelo-xx.png',
            title: '',
            text: 'CORTE ESTILIZADO'
        },
        {
            image: 'imagens/slides/cabelo-nike-rosa.png',
            title: '',
            text: 'CORTE da NIKE'
        },
        {
            image: 'imagens/slides/cabelo-estrela-rosa.png',
            title: '',
            text: 'VOCÊ ESCOLHE SEU ESTILO'
        }
    ];

    // Criar slides dinamicamente
    slidesData.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `slide ${index === 0 ? 'active' : ''}`;
        slideElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${slide.image}')`;
        
        slideElement.innerHTML = `
            <div class="slide-content">
                <h2>${slide.title}</h2>
                <p>${slide.text}</p>
            </div>
        `;
        
        sliderContainer.insertBefore(slideElement, sliderNav);
    });

    // Controle do slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;

    // Função para mostrar slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }

    // Slide anterior
    function prevSlide() {
        let newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
        resetInterval();
    }
    
    // Próximo slide
    function nextSlide() {
        let newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
        resetInterval();
    }

    // Reiniciar intervalo do auto-slide
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Iniciar auto-slide
    function startSlider() {
        if (slides.length > 0) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    // Pausar ao interagir
    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderContainer.addEventListener('mouseleave', startSlider);

    // Inicializar
    startSlider();
});