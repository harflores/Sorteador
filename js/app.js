const maxNumberInput = document.getElementById('maxNumber');
const btnDraw = document.getElementById('btnDraw');
const btnReset = document.getElementById('btnReset');
const displayArea = document.getElementById('displayArea');
const historySection = document.getElementById('historySection');
const historyGrid = document.getElementById('historyGrid');
const remainingInfo = document.getElementById('remainingInfo');

let availableNumbers = [];
let drawnNumbers = [];
let isDrawing = false;
let poolInitialized = false;

maxNumberInput.addEventListener('input', () => {
    const val = parseInt(maxNumberInput.value, 10);
    if (val > 0 && !isDrawing) {
        if (!poolInitialized || availableNumbers.length + drawnNumbers.length !== val) {
            initPool(val);
        }
        btnDraw.disabled = false;
    } else {
        btnDraw.disabled = true;
    }
});

btnDraw.addEventListener('click', startDraw);
btnReset.addEventListener('click', resetAll);

function initPool(n) {
    availableNumbers = [];
    drawnNumbers = [];
    for (let i = 1; i <= n; i++) {
        availableNumbers.push(i);
    }
    poolInitialized = true;
    historyGrid.innerHTML = '';
    historySection.style.display = 'none';
    btnReset.style.display = 'none';
    updateRemaining();
    displayArea.innerHTML = '<span class="display-placeholder">El n\u00famero ganador aparecer\u00e1 aqu\u00ed</span>';
}

function startDraw() {
    if (isDrawing || availableNumbers.length === 0) return;

    isDrawing = true;
    btnDraw.disabled = true;
    maxNumberInput.disabled = true;

    let count = 3;
    displayArea.innerHTML = `<span class="countdown-number">${count}</span>`;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            displayArea.innerHTML = `<span class="countdown-number">${count}</span>`;
        } else {
            clearInterval(interval);
            pickWinner();
        }
    }, 1000);
}

function pickWinner() {
    const idx = Math.floor(Math.random() * availableNumbers.length);
    const winner = availableNumbers.splice(idx, 1)[0];
    drawnNumbers.push(winner);

    displayArea.innerHTML = `
        <div class="winner-glow"></div>
        <span class="winner-label">N\u00famero Ganador</span>
        <span class="winner-number">${winner}</span>
    `;

    addHistoryBadge(winner);
    updateRemaining();

    historySection.style.display = 'flex';
    btnReset.style.display = 'inline-flex';

    isDrawing = false;

    if (availableNumbers.length === 0) {
        btnDraw.disabled = true;
        remainingInfo.textContent = '\u00a1Todos los n\u00fameros han sido sorteados!';
    } else {
        btnDraw.disabled = false;
    }
}

function addHistoryBadge(number) {
    const badge = document.createElement('span');
    badge.className = 'history-badge';
    badge.textContent = number;
    badge.title = 'Clic para marcar como no v\u00e1lido';
    badge.addEventListener('click', () => toggleInvalid(badge));
    historyGrid.appendChild(badge);
}

function toggleInvalid(badge) {
    badge.classList.toggle('invalid');
    badge.title = badge.classList.contains('invalid')
        ? 'Clic para marcar como v\u00e1lido'
        : 'Clic para marcar como no v\u00e1lido';
}

function updateRemaining() {
    const total = availableNumbers.length + drawnNumbers.length;
    if (availableNumbers.length > 0 && drawnNumbers.length > 0) {
        remainingInfo.textContent = `${availableNumbers.length} de ${total} n\u00fameros disponibles`;
    }
}

function resetAll() {
    const val = parseInt(maxNumberInput.value, 10);
    if (val > 0) {
        initPool(val);
    }
    maxNumberInput.disabled = false;
    btnDraw.disabled = val > 0 ? false : true;
    isDrawing = false;
    poolInitialized = val > 0;
}
