// Elementos DOM
const DOM = {
    app: document.getElementById('app'),
    loader: document.querySelector('.loader'),
    envelopeContainer: document.getElementById('envelope-container'),
    letter: document.getElementById('letter'),
    letterContent: document.getElementById('letter-content'),
    gallery: document.getElementById('gallery'),
    galleryGrid: document.getElementById('gallery-grid'),
    gameSection: document.getElementById('game'),
    musicBtn: document.getElementById('music-btn'),
    galleryBtn: document.getElementById('gallery-btn'),
    gameBtn: document.getElementById('game-btn'),
    uploadBtn: document.getElementById('upload-btn'),
    photoUpload: document.getElementById('photo-upload'),
    currentYear: document.getElementById('current-year'),
    petalsContainer: document.getElementById('petals-container')
};

// Estado da Aplicação
const AppState = {
    loaded: false,
    audio: null,
    musicPlaying: false,
    currentView: 'envelope'
};

// Inicialização
function init() {
    // Configuração inicial
    DOM.currentYear.textContent = new Date().getFullYear();
    
    // Simular carregamento
    setTimeout(() => {
        DOM.loader.style.opacity = '0';
        DOM.app.style.opacity = '1';
        
        setTimeout(() => {
            DOM.loader.remove();
            AppState.loaded = true;
            
            // Iniciar componentes
            createPetals();
            setupEventListeners();
        }, 600);
    }, 1500);
}

// Criar efeito de pétalas
function createPetals() {
    const petalCount = window.innerWidth < 768 ? 12 : 18;
    const colors = [
        'rgba(255, 209, 220, 0.7)',
        'rgba(248, 200, 220, 0.7)',
        'rgba(245, 181, 200, 0.7)'
    ];
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        // Configuração aleatória
        const size = Math.random() * 14 + 6;
        const duration = 15 + Math.random() * 10;
        const delay = Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.background = color;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        petal.style.borderRadius = '50% 0 50% 50%';
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        DOM.petalsContainer.appendChild(petal);
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Envelope
    DOM.envelopeContainer.addEventListener('click', openEnvelope);
    
    // Controles
    DOM.musicBtn.addEventListener('click', toggleMusic);
    DOM.galleryBtn.addEventListener('click', () => toggleSection('gallery'));
    DOM.gameBtn.addEventListener('click', () => toggleSection('game'));
    
    // Galeria
    DOM.uploadBtn.addEventListener('click', () => DOM.photoUpload.click());
    DOM.photoUpload.addEventListener('change', handlePhotoUpload);
}

// Abrir envelope
function openEnvelope() {
    if (AppState.currentView !== 'envelope') return;
    
    DOM.envelopeContainer.style.pointerEvents = 'none';
    
    // Animação do envelope
    DOM.envelopeContainer.style.transform = 'translateY(-40px) scale(0.95)';
    DOM.envelopeContainer.style.opacity = '0';
    
    setTimeout(() => {
        DOM.envelopeContainer.classList.add('hidden');
        showLetter();
    }, 600);
}

// Mostrar carta
function showLetter() {
    DOM.letter.classList.remove('hidden');
    DOM.letter.classList.add('show');
    
    // Animar conteúdo da carta
    animateLetterContent();
    
    AppState.currentView = 'letter';
}

// Animar conteúdo da carta
function animateLetterContent() {
    const messages = [
        "Hoje é nosso dia...",
        "Cada momento contigo é especial.",
        "Seu sorriso ilumina meus dias.",
        "Obrigado por ser você.",
        "Te amo mais que as palavras podem dizer."
    ];
    
    DOM.letterContent.innerHTML = '';
    
    messages.forEach((message, index) => {
        const p = document.createElement('p');
        p.textContent = message;
        p.style.opacity = '0';
        p.style.transform = 'translateY(10px)';
        
        DOM.letterContent.appendChild(p);
        
        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
            p.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }, index * 1200);
    });
}

// Alternar seções
function toggleSection(section) {
    const element = DOM[`${section}Section`];
    
    if (element.classList.contains('hidden')) {
        // Esconder outras seções
        document.querySelectorAll('.gallery, .game').forEach(el => {
            if (el !== element) {
                el.classList.remove('show');
                setTimeout(() => el.classList.add('hidden'), 300);
            }
        });
        
        // Mostrar seção atual
        element.classList.remove('hidden');
        setTimeout(() => element.classList.add('show'), 10);
        
        // Rolagem suave
        setTimeout(() => {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 50);
    } else {
        element.classList.remove('show');
        setTimeout(() => element.classList.add('hidden'), 300);
    }
}

// Alternar música
function toggleMusic() {
    if (!AppState.audio) {
        // Implementar player de música personalizado
        alert('Adicione sua música favorita no código!');
        return;
    }
    
    if (AppState.musicPlaying) {
        AppState.audio.pause();
        DOM.musicBtn.innerHTML = '<span class="btn-icon">🎵</span><span class="btn-text">Música</span>';
    } else {
        AppState.audio.play();
        DOM.musicBtn.innerHTML = '<span class="btn-icon">⏸</span><span class="btn-text">Pausar</span>';
    }
    
    AppState.musicPlaying = !AppState.musicPlaying;
}

// Manipular upload de fotos
function handlePhotoUpload(event) {
    const files = event.target.files;
    const maxPhotos = 6 - DOM.galleryGrid.children.length;
    
    if (files.length > maxPhotos) {
        alert(`Você pode adicionar no máximo ${maxPhotos} fotos. Escolha suas favoritas!`);
        return;
    }
    
    Array.from(files).slice(0, maxPhotos).forEach(file => {
        if (!file.type.match('image.*')) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            createPhotoElement(e.target.result);
        };
        reader.readAsDataURL(file);
    });
}

// Criar elemento de foto
function createPhotoElement(imageSrc) {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid animate-fade-in';
    
    polaroid.innerHTML = `
        <div class="polaroid-img">
            <img src="${imageSrc}" alt="Nosso momento">
        </div>
        <p class="polaroid-caption">Nosso momento</p>
    `;
    
    DOM.galleryGrid.appendChild(polaroid);
}

// Iniciar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);