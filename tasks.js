document.addEventListener('DOMContentLoaded', () => {
    const youtubeTaskBtn = document.getElementById('youtube-task-btn');
    const tiktokTaskBtn = document.getElementById('tiktok-task-btn');
    const youtubeTimer = document.getElementById('youtube-timer');
    const tiktokTimer = document.getElementById('tiktok-timer');
    const youtubeTimeLeft = document.getElementById('youtube-time-left');
    const tiktokTimeLeft = document.getElementById('tiktok-time-left');
    const youtubeClaimBtn = document.getElementById('youtube-claim-btn');
    const tiktokClaimBtn = document.getElementById('tiktok-claim-btn');
    const balanceDisplay = document.getElementById('user-balance');

    let balance = 0;

    // Load balance from local storage if available
    if (localStorage.getItem('balance')) {
        balance = parseInt(localStorage.getItem('balance'), 10);
        balanceDisplay.textContent = balance;
    }

    // Rewards for tasks
    const taskRewards = {
        youtube: 100,   // YouTube task reward
        tiktok: 150     // TikTok task reward
    };

    // Timer and task claim logic
    youtubeTaskBtn.addEventListener('click', () => {
        startTaskTimer(youtubeTimer, youtubeTimeLeft, youtubeClaimBtn);
    });

    tiktokTaskBtn.addEventListener('click', () => {
        startTaskTimer(tiktokTimer, tiktokTimeLeft, tiktokClaimBtn);
    });

    youtubeClaimBtn.addEventListener('click', () => {
        if (!youtubeClaimBtn.disabled) {
            claimReward('youtube');
            resetClaimButton(youtubeClaimBtn);
        }
    });

    tiktokClaimBtn.addEventListener('click', () => {
        if (!tiktokClaimBtn.disabled) {
            claimReward('tiktok');
            resetClaimButton(tiktokClaimBtn);
        }
    });

    function startTaskTimer(timerElement, timeLeftElement, claimButton) {
        timerElement.style.display = 'block';
        let timeLeft = 15;
        timeLeftElement.textContent = timeLeft;

        const countdown = setInterval(() => {
            timeLeft--;
            timeLeftElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdown);
                timerElement.style.display = 'none';
                activateClaimButton(claimButton);
            }
        }, 1000);
    }

    function claimReward(taskType) {
        const reward = taskRewards[taskType];
        balance += reward;
        balanceDisplay.textContent = balance;

        // Save balance to local storage
        localStorage.setItem('balance', balance);
        alert(`Reward claimed: ${reward}`);
    }

    function activateClaimButton(button) {
        button.disabled = false;
        button.classList.add('active');
    }

    function resetClaimButton(button) {
        button.disabled = true;
        button.classList.remove('active');
    }

    document.getElementById('back-to-main').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});