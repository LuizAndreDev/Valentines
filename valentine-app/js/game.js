// Estado do Jogo
const GameState = {
    active: false,
    score: 0,
    heartsFound: 0,
    totalHearts: 5,
    hearts: []
};

// Elementos DOM
const DOM = {
    gameArea: document.getElementById('game-area'),
    startBtn: document.getElementById('start-game'),
    scoreElement: document.getElementById('score')
};

// Iniciar Jogo
function startGame() {
    if (GameState.active) return;
    
    resetGame();
    
    GameState.active = true;
    DOM.startBtn.disabled = true;
    DOM.startBtn.textContent = 'Jogando...';
    DOM.gameArea.innerHTML = '';
    
    createHearts();
    
    // Tempo máximo do jogo
    GameState.timeout = setTimeout(endGame, GameState.totalHearts * 1500 + 3000);
}

// Resetar Jogo
function resetGame() {
    GameState.active = false;
    GameState.score = 0;
    GameState.heartsFound = 0;
    GameState.hearts = [];
    DOM.scoreElement.textContent = GameState.score;
    
    if (GameState.timeout) {
        clearTimeout(GameState.timeout);
    }
}

// Criar Corações
function createHearts() {
    for (let i = 0; i < GameState.totalHearts; i++) {
        setTimeout(() => {
            if (!GameState.active) return;
            
            const heart = createHeartElement();
            DOM.gameArea.appendChild(heart);
            GameState.hearts.push(heart);
            
            setTimeout(() => {
                if (heart.style.opacity === '1') {
                    hideHeart(heart);
                }
            }, 2000);
        }, i * 1500);
    }
}

// Criar Elemento de Coração
function createHeartElement() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 30 + 30}px;
        left: ${Math.random() * 80 + 10}%;
        top: ${Math.random() * 60 + 20}%;
        opacity: 0;
        cursor: pointer;
        transition: opacity 0.3s ease;
        z-index: 20;
    `;
    
    heart.addEventListener('click', function() {
        if (heart.style.opacity === '1') {
            handleHeartClick(heart);
        }
    });
    
    setTimeout(() => {
        heart.style.opacity = '1';
    }, 100);
    
    return heart;
}

// Manipular Clique no Coração
function handleHeartClick(heart) {
    if (heart.style.opacity !== '1' || !GameState.active) return;
    
    heart.style.opacity = '0';
    heart.innerHTML = '💘';
    heart.removeEventListener('click', handleHeartClick);
    
    GameState.score++;
    GameState.heartsFound++;
    DOM.scoreElement.textContent = GameState.score;
    
    createConfetti(heart);
    
    if (GameState.heartsFound === GameState.totalHearts) {
        endGame();
    }
}

// Esconder Coração
function hideHeart(heart) {
    if (heart.style.opacity === '1') {
        heart.style.transition = 'opacity 0.5s ease';
        heart.style.opacity = '0';
    }
}

// Criar Efeito Confetti
function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['❤️', '💖', '💘', '💝'][Math.floor(Math.random() * 4)];
        confetti.style.position = 'fixed';
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        confetti.style.fontSize = '20px';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        confetti.style.transform = 'translate(-50%, -50%)';
        confetti.style.animation = 'confetti-fall 1s ease-out forwards';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 1000);
    }
}

// Finalizar Jogo
function endGame() {
    GameState.active = false;
    DOM.startBtn.disabled = false;
    DOM.startBtn.textContent = 'Jogar Novamente';
    
    const message = document.createElement('div');
    message.className = 'game-message animate-fade-in';
    
    if (GameState.score === GameState.totalHearts) {
        message.innerHTML = `<p class="handwriting" style="color: var(--rose-emphasis); font-size: 1.5rem;">Perfeito! Você encontrou todos os corações! 💖</p>`;
    } else if (GameState.score >= GameState.totalHearts / 2) {
        message.innerHTML = `<p style="color: var(--rose-emphasis);">Bom trabalho! Você encontrou ${GameState.score} de ${GameState.totalHearts} corações.</p>`;
    } else {
        message.innerHTML = `<p style="color: var(--deep-berry);">Tente novamente! Você encontrou ${GameState.score} de ${GameState.totalHearts} corações.</p>`;
    }
    
    DOM.gameArea.appendChild(message);
}

// Event Listeners
DOM.startBtn.addEventListener('click', startGame);