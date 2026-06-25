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

    launchConfetti();
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

function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#F5A800', '#FFD054', '#C58800', '#FF6B6B', '#4ECDC4', '#FFFFFF', '#FF4081', '#7C4DFF'];
    const shapes = ['rect', 'circle', 'strip'];
    const PARTICLE_COUNT = 150;
    const DURATION = 3000;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 18,
            vy: Math.random() * -18 - 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 12,
            gravity: 0.25 + Math.random() * 0.15,
            opacity: 1,
            wobble: Math.random() * 10
        });
    }

    const start = performance.now();

    function animate(now) {
        const elapsed = now - start;
        if (elapsed > DURATION) {
            canvas.remove();
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const fadeStart = DURATION * 0.7;
        const globalAlpha = elapsed > fadeStart ? 1 - (elapsed - fadeStart) / (DURATION - fadeStart) : 1;

        particles.forEach(p => {
            p.x += p.vx;
            p.vy += p.gravity;
            p.y += p.vy;
            p.vx *= 0.99;
            p.rotation += p.rotationSpeed;
            p.x += Math.sin(p.wobble + elapsed * 0.003) * 0.5;

            ctx.save();
            ctx.globalAlpha = globalAlpha * p.opacity;
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;

            if (p.shape === 'rect') {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            } else if (p.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-p.size / 2, -1, p.size, 3);
            }

            ctx.restore();
        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
