const sounds = {
    bgMusic: new Audio("assets/sounds/music.mp3"),
    click: new Audio("assets/sounds/click.mp3"),
    optionSelect: new Audio("assets/sounds/option-select.mp3"),
    sparkle: new Audio("assets/sounds/sparkle.mp3"),
    success: new Audio("assets/sounds/success.mp3"),
    swipe: new Audio("assets/sounds/swipe.mp3")
};

sounds.bgMusic.loop = true;
sounds.bgMusic.volume = 1;

sounds.click.volume = 0.8;
sounds.optionSelect.volume = 0.8;
sounds.sparkle.volume = 0.8;
sounds.success.volume = 0.8;
sounds.swipe.volume = 1;

function safePlay(audio) {
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(err => console.log("Audio error:", err));
}

function playMusic() {
    sounds.bgMusic.play().catch(err => console.log("Music error:", err));
}

function pauseMusic() {
    sounds.bgMusic.pause();
}

function playClick() {
    safePlay(sounds.click);
}

function playSwipe() {
    safePlay(sounds.swipe);
}

function playOptionSelect() {
    safePlay(sounds.optionSelect);
}

function playSparkle() {
    safePlay(sounds.sparkle);
}

function playSuccess() {
    safePlay(sounds.success);
}

function vibratePhone(pattern = 25) {
    if ("vibrate" in navigator) {
        navigator.vibrate(pattern);
    }
}

window.playMusic = playMusic;
window.pauseMusic = pauseMusic;
window.playClick = playClick;
window.playSwipe = playSwipe;
window.playOptionSelect = playOptionSelect;
window.playSparkle = playSparkle;
window.playSuccess = playSuccess;
window.vibratePhone = vibratePhone;