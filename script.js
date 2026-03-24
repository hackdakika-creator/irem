let currentChapter = 1;
let punchStage = 0;
let tomatoStage = 0;
let loveClicks = 0;
let musicStarted = false;

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            showChapterText("1. BÖLÜM: YUMRUK BÖLÜMÜ");
        }, 800);
    }, 2500);
});

function showChapterText(text) {
    const overlay = document.getElementById('chapter-overlay');
    const overlayText = document.getElementById('overlay-text');
    const chapterTitle = document.getElementById('chapter-title');
    overlayText.innerText = text;
    overlay.classList.remove('hidden');
    setTimeout(() => {
        overlay.classList.add('hidden');
        chapterTitle.innerText = text;
    }, 2000);
}

function useItem() {
    const faceImg = document.getElementById('face');
    const stage = document.getElementById('character-stage');
    const bgMusic = document.getElementById('bg-music');
    const punchSound = document.getElementById('sound-punch');
    const tomatoSound = document.getElementById('sound-tomato');
    const loveSound = document.getElementById('sound-love');

    // MÜZİĞİ BAŞLAT (Tarayıcı engeline takılmamak için ilk tıkta açılır)
    if (!musicStarted) {
        bgMusic.volume = 0.3; // Sesi %30 seviyesine (kısık) çektim
        bgMusic.play().catch(e => console.log("Müzik başlatılamadı:", e));
        musicStarted = true;
    }

    stage.classList.add('shake');
    setTimeout(() => stage.classList.remove('shake'), 150);

    if (currentChapter === 1) {
        punchSound.currentTime = 0;
        punchSound.play();
        createProjectile("🥊");
        punchStage++;
        if (punchStage <= 5) faceImg.src = `yigithan-yuz-${punchStage}.png`;
        if (punchStage === 5) {
            currentChapter = 2;
            setTimeout(() => showChapterText("2. BÖLÜM: DOMATES BÖLÜMÜ"), 500);
        }
    } 
    else if (currentChapter === 2) {
        tomatoSound.currentTime = 0;
        tomatoSound.play();
        createProjectile("🍅");
        tomatoStage++;
        if (tomatoStage === 1) faceImg.src = "yigithan-yuz-6.png"; 
        if (tomatoStage === 2) {
            faceImg.src = "yigithan-yuz-7.png";
            setTimeout(() => {
                currentChapter = 3;
                showChapterText("3. BÖLÜM: SEVGİ BÖLÜMÜ");
                faceImg.src = "yigithan-yuz-0.png";
            }, 1500);
        }
    }
    else if (currentChapter === 3) {
        loveSound.currentTime = 0;
        loveSound.play();
        createTetrisHearts();
        loveClicks++;
        if(loveClicks >= 15) {
            setTimeout(() => {
                document.getElementById('final-screen').classList.remove('hidden');
            }, 1000);
        }
    }
}

function createProjectile(emoji) {
    const stage = document.getElementById('character-stage');
    const item = document.createElement('div');
    item.className = 'projectile';
    item.innerText = emoji;
    const starts = [{x:-100,y:100}, {x:400,y:100}, {x:150,y:450}];
    const start = starts[Math.floor(Math.random()*starts.length)];
    item.style.left = start.x + 'px'; item.style.top = start.y + 'px';
    item.style.transform = 'scale(0.5)';
    stage.appendChild(item);
    setTimeout(() => {
        item.style.left = '100px'; item.style.top = '120px';
        item.style.transform = 'scale(1.5) rotate(15deg)';
        setTimeout(() => {
            item.style.opacity = '0';
            setTimeout(() => item.remove(), 100);
        }, 100);
    }, 10);
}

function createTetrisHearts() {
    const stage = document.getElementById('character-stage');
    for (let i = 0; i < 6; i++) {
        const kalp = document.createElement('div');
        kalp.className = 'tetris-heart';
        kalp.innerText = "💖";
        kalp.style.left = (Math.random() * 80 + 10) + '%';
        kalp.style.top = (Math.random() * 40 + 30) + '%';
        stage.appendChild(kalp);
        let pos = parseInt(kalp.style.top);
        let opac = 1;
        const move = setInterval(() => {
            pos -= 2; opac -= 0.05;
            kalp.style.top = pos + '%'; kalp.style.opacity = opac;
            if (opac <= 0) { clearInterval(move); kalp.remove(); }
        }, 50);
    }
}