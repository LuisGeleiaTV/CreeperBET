// Funções para gerenciar o saldo de diamantes
function getDiamondBalance() {
    const balance = localStorage.getItem('diamondBalance');
    return balance ? parseInt(balance) : 1000;
}

function updateDiamondBalance(newBalance) {
    localStorage.setItem('diamondBalance', newBalance);
    const balanceElement = document.getElementById('diamond-balance');
    if (balanceElement) {
        const oldBalance = parseInt(balanceElement.textContent);
        balanceElement.textContent = newBalance;
        
        // Add animation class based on whether balance increased or decreased
        if (newBalance > oldBalance) {
            balanceElement.classList.add('balance-increase');
            setTimeout(() => balanceElement.classList.remove('balance-increase'), 1000);
        } else if (newBalance < oldBalance) {
            balanceElement.classList.add('balance-decrease');
            setTimeout(() => balanceElement.classList.remove('balance-decrease'), 1000);
        }
    }
}

function updateDiamondDisplay() {
    const balanceElement = document.getElementById('diamond-balance');
    if (balanceElement) {
        balanceElement.textContent = getDiamondBalance();
    }
}

// Celebration popup
function showCelebration(message, isWin = true) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.style.background = isWin ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255, 0, 0, 0.9)';
    popup.innerHTML = `
        <h2>${isWin ? '🎉 Parabéns! 🎉' : '😢 Que pena!'}</h2>
        <p>${message}</p>
        <button onclick="this.parentElement.remove()">Continuar</button>
    `;
    document.body.appendChild(popup);
}

// Save game state
function saveGameState() {
    localStorage.setItem('diamondBalance', getDiamondBalance());
}

// Load game state
function loadGameState() {
    const savedBalance = localStorage.getItem('diamondBalance');
    if (savedBalance) {
        updateDiamondDisplay();
    }
}

// Som de clique global
let clickSound = null;

// Função para inicializar o som de clique
function initializeClickSound() {
    if (!clickSound) {
        clickSound = new Audio('../assets/minecraft menu click.mp3');
        clickSound.volume = 0.3;
    }
}

// Função para tocar o som de clique
function playClickSound() {
    if (!clickSound) {
        initializeClickSound();
    }
    clickSound.currentTime = 0;
    clickSound.play();
}

// Função para adicionar som de clique em todos os botões
function addClickSoundToButtons() {
    // Adicionar som em todos os botões
    document.querySelectorAll('button, .button, [role="button"]').forEach(button => {
        button.addEventListener('click', playClickSound);
    });

    // Adicionar som em todos os inputs quando pressionar Enter
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                playClickSound();
            }
        });
    });

    // Adicionar som em elementos clicáveis com cursor pointer
    document.querySelectorAll('[style*="cursor: pointer"]').forEach(element => {
        element.addEventListener('click', playClickSound);
    });
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se já existe um saldo salvo
    const savedBalance = localStorage.getItem('diamondBalance');
    if (!savedBalance) {
        // Se não existir, cria o saldo inicial
        localStorage.setItem('diamondBalance', '1000');
    }
    updateDiamondDisplay();
    
    // Inicializar som de clique e adicionar em todos os botões
    initializeClickSound();
    addClickSoundToButtons();

    // Adicionar o HTML do popup ao carregar a página
    const shopPopup = document.createElement('div');
    shopPopup.innerHTML = `
        <div class="shop-overlay"></div>
        <div class="diamond-shop-popup">
            <button class="close-button">&times;</button>
            <h2>Loja de Diamantes</h2>
            <div class="diamond-package">
                <div class="package-info">
                    <div class="diamond-amount">
                        <img src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/6a/Diamond_JE2_BE2.png" alt="Diamond">
                        100 diamantes
                    </div>
                </div>
                <div class="package-price">
                    <span class="original-price">R$ 24,99</span>
                    <span class="discounted-price">R$ 19,99</span>
                </div>
            </div>
            <div class="diamond-package">
                <div class="package-info">
                    <div class="diamond-amount">
                        <img src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/6a/Diamond_JE2_BE2.png" alt="Diamond">
                        200 diamantes
                    </div>
                </div>
                <div class="package-price">
                    <span class="original-price">R$ 37,49</span>
                    <span class="discounted-price">R$ 29,99</span>
                </div>
            </div>
            <div class="diamond-package best-value" style="position: relative;">
                <div class="best-value-tag">MELHOR CUSTO</div>
                <div class="package-info">
                    <div class="diamond-amount">
                        <img src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/6a/Diamond_JE2_BE2.png" alt="Diamond">
                        500 diamantes
                    </div>
                </div>
                <div class="package-price">
                    <span class="original-price">R$ 74,99</span>
                    <span class="discounted-price">R$ 59,99</span>
                </div>
            </div>
            <div class="diamond-package">
                <div class="package-info">
                    <div class="diamond-amount">
                        <img src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/6a/Diamond_JE2_BE2.png" alt="Diamond">
                        1000 diamantes
                    </div>
                </div>
                <div class="package-price">
                    <span class="original-price">R$ 124,99</span>
                    <span class="discounted-price">R$ 99,99</span>
                </div>
            </div>
            <div class="diamond-package">
                <div class="package-info">
                    <div class="diamond-amount">
                        <img src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/6a/Diamond_JE2_BE2.png" alt="Diamond">
                        10000 diamantes
                    </div>
                </div>
                <div class="package-price">
                    <span class="original-price">R$ 324,99</span>
                    <span class="discounted-price">R$ 259,99</span>
                </div>
                <div class="discount-badge">-20%</div>
            </div>
        </div>
    `;
    document.body.appendChild(shopPopup);

    // Event listeners para o popup
    const diamondBalance = document.querySelector('.diamond-balance');
    const shopOverlay = document.querySelector('.shop-overlay');
    const shopPopupElement = document.querySelector('.diamond-shop-popup');
    const closeButton = document.querySelector('.diamond-shop-popup .close-button');

    function showShop() {
        shopOverlay.style.display = 'block';
        shopPopupElement.style.display = 'block';
    }

    function hideShop() {
        shopOverlay.style.display = 'none';
        shopPopupElement.style.display = 'none';
    }

    diamondBalance.addEventListener('click', showShop);
    closeButton.addEventListener('click', hideShop);
    shopOverlay.addEventListener('click', hideShop);

    // Adicionar efeito de clique nos pacotes
    document.querySelectorAll('.diamond-package').forEach(package => {
        package.addEventListener('click', () => {
            const amount = package.querySelector('.diamond-amount').textContent.trim();
            const price = package.querySelector('.discounted-price').textContent;
            alert(`Compra do pacote de ${amount} por ${price} será implementada em breve!`);
        });
    });
}); 