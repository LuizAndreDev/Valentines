// Verificar Recursos
export function checkFeatures() {
    const features = {
        audio: !!(window.AudioContext || window.webkitAudioContext),
        animations: 'animate' in document.documentElement.style,
        touch: 'ontouchstart' in window
    };
    
    return features;
}

// Criar Efeito de Pétalas
export function createPetals(container, count = 15) {
    const colors = [
        'rgba(255, 209, 220, 0.7)',
        'rgba(248, 200, 220, 0.7)',
        'rgba(245, 181, 200, 0.7)'
    ];
    
    for (let i = 0; i < count; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
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
        
        container.appendChild(petal);
    }
}

// Animar Elementos em Sequência
export function animateElementsSequentially(elements, delayBetween = 500, initialDelay = 0) {
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-fade-in');
        }, initialDelay + index * delayBetween);
    });
}

// Carregar Recurso
export function loadResource(url, type) {
    return new Promise((resolve, reject) => {
        let resource;
        
        switch (type) {
            case 'image':
                resource = new Image();
                resource.src = url;
                break;
            case 'audio':
                resource = new Audio(url);
                break;
            default:
                reject(new Error('Tipo de recurso não suportado'));
        }
        
        resource.onload = () => resolve(resource);
        resource.onerror = (err) => reject(err);
    });
}