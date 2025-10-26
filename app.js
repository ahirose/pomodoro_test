// Service Worker登録
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// タイマーの初期設定
const TIMER_DURATION = 10 * 60; // 10分 = 600秒
let timeRemaining = TIMER_DURATION;
let timerInterval = null;

// DOM要素の取得
const timerDisplay = document.getElementById('timer');
const resetBtn = document.getElementById('resetBtn');
const progressBar = document.getElementById('progress');

// 時間をMM:SS形式にフォーマット
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 進捗バーを更新
function updateProgress() {
    const progress = (timeRemaining / TIMER_DURATION) * 100;
    progressBar.style.width = `${progress}%`;
}

// タイマー表示を更新
function updateDisplay() {
    timerDisplay.textContent = formatTime(timeRemaining);
    updateProgress();
}

// カウントダウン処理
function countdown() {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateDisplay();
    } else {
        // タイマー終了
        clearInterval(timerInterval);
        timerInterval = null;

        // 通知を表示
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('タイマー終了', {
                body: '10分が経過しました！',
                icon: 'icon-192.png'
            });
        }

        // 音を鳴らす（オプション）
        playSound();
    }
}

// タイマー開始
function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(countdown, 1000);
    }
}

// タイマーリセット
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeRemaining = TIMER_DURATION;
    updateDisplay();
    startTimer();
}

// 簡単なビープ音
function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// 通知の許可をリクエスト
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// イベントリスナー
resetBtn.addEventListener('click', resetTimer);

// ページ読み込み時に自動でタイマーを開始
window.addEventListener('load', () => {
    updateDisplay();
    startTimer();
});
