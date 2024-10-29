document.addEventListener('DOMContentLoaded', () => {
    const boostButton = document.getElementById('boost-button');
    const boostTimer = document.getElementById('boost-timer');
    const boostCountdown = document.getElementById('boost-countdown');
    const incomePerClickElement = document.getElementById('income-per-click');
    
    let isBoostActive = false;
    let boostCooldown = 3600; // 1 hour in seconds
    let boostDuration = 30; // Boost lasts for 30 seconds
    let incomePerClick = 1;
    let boostedIncomePerClick = incomePerClick * 5;

    // Load boost cooldown from local storage
    if (localStorage.getItem('boostCooldown')) {
        boostCooldown = parseInt(localStorage.getItem('boostCooldown'), 10);
        if (boostCooldown > 0) {
            startBoostCooldown(boostCooldown);
        }
    }

    boostButton.addEventListener('click', () => {
        if (!isBoostActive && boostCooldown <= 0) {
            activateBoost();
        }
    });

    function activateBoost() {
        isBoostActive = true;
        boostCooldown = 3600; // Reset cooldown
        localStorage.setItem('boostCooldown', boostCooldown);

        // Update income per click during boost
        incomePerClickElement.textContent = boostedIncomePerClick;

        boostTimer.style.display = 'block';

        // End boost after duration
        setTimeout(() => {
            deactivateBoost();
        }, boostDuration * 1000);

        // Start cooldown
        startBoostCooldown(boostCooldown);
    }

    function deactivateBoost() {
        isBoostActive = false;
        incomePerClickElement.textContent = incomePerClick; // Reset to normal income
        boostTimer.style.display = 'none';
    }

    function startBoostCooldown(seconds) {
        boostButton.classList.add('disabled');
        boostButton.disabled = true;

        const countdown = setInterval(() => {
            seconds--;
            boostCountdown.textContent = formatTime(seconds);

            if (seconds <= 0) {
                clearInterval(countdown);
                boostButton.classList.remove('disabled');
                boostButton.disabled = false;
                localStorage.removeItem('boostCooldown');
            } else {
                localStorage.setItem('boostCooldown', seconds);
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
});