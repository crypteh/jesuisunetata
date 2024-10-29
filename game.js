document.addEventListener('DOMContentLoaded', () => {
    const welcomePage = document.getElementById('welcome-page');
    const mainGame = document.getElementById('main-game');
    const progressBar = document.getElementById('progress-bar');
    const farmPlot = document.getElementById('farm-plot');
    const balanceDisplay = document.getElementById('balance');
    const incomePerClickDisplay = document.getElementById('income-per-click');
    const clickEffect = document.getElementById('click-effect');
    const walletAddressDisplay = document.getElementById('wallet-address');
    const connectWalletButton = document.getElementById('connect-wallet');
    const boostButton = document.getElementById('boost-button');
    const boostTimerDisplay = document.getElementById('boost-timer');
    const boostCountdownDisplay = document.getElementById('boost-countdown');

    let balance = 0;
    let incomePerClick = 1;
    let farmReady = false;
    let boostActive = false;
    const farmDuration = 4 * 60 * 60 * 1000;  // 4 hours in milliseconds
    let boostTimeLeft = 30;  // Boost duration in seconds

    // 1. Welcome page with progress bar
    let progress = 0;
    const progressBarInterval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(progressBarInterval);
            welcomePage.style.display = 'none';  // Hide welcome page
            mainGame.style.display = 'block';    // Show the main game
        }
    }, 60);  // Progress bar completes in 1 seconds (100% in 5000ms)

    // 2. Wallet connection logic (mock)
    // 3. This is stimulate wallect connection later we will implement a real using ton blockchain
    function connectWallet() {
        const walletAddress = '0x' + Math.random().toString(36).substring(2, 10);
        walletAddressDisplay.textContent = walletAddress;
        connectWalletButton.textContent = 'Disconnect Wallet';
        walletAddressDisplay.classList.add('wallet-connected');
    }

    connectWalletButton.addEventListener('click', () => {
        if (connectWalletButton.textContent === 'Connect Wallet') {
            connectWallet();
        } else {
            walletAddressDisplay.textContent = 'Not connected';
            walletAddressDisplay.classList.remove('wallet-connected');
            connectWalletButton.textContent = 'Connect Wallet';
        }
    });

    // 3. Start farming cycle
    function startFarming() {
        farmReady = false;
        farmPlot.src = 'assets/main_image.png';  // Change to growing farm image
        farmPlot.classList.add('growing-animation');  // Add growing animation effect
        setTimeout(() => {
            farmReady = true;
            farmPlot.src = 'assets/farm-plot-ready.png';  // Change to ready farm image
            farmPlot.classList.remove('growing-animation');
            farmPlot.classList.add('ready-animation');  // Add ready effect
            alert('Your crops are ready to harvest!');
        }, farmDuration);
    }

    // Start farming when the game loads
    startFarming();

    // 4. Clicker functionality
    farmPlot.addEventListener('click', (event) => {
        if (farmReady) {
            balance += 100;  // Reward for harvesting crops
            balanceDisplay.textContent = balance;
            farmReady = false;  // Reset farming state
            farmPlot.classList.remove('ready-animation');
            startFarming();  // Start new farming cycle
        } else {
            let currentIncome = incomePerClick;
            if (boostActive) {
                currentIncome *= 5;  // Apply 5x boost
            }
            balance += currentIncome;
            balanceDisplay.textContent = balance;
            balanceDisplay.classList.add('balance-update');  // Highlight balance update
            incomePerClickDisplay.classList.add('click-highlight');  // Highlight click

            // Show click effect
            clickEffect.textContent = `+${currentIncome}`;
            clickEffect.style.left = `${event.clientX}px`;
            clickEffect.style.top = `${event.clientY}px`;
            clickEffect.classList.add('show');

            // Remove highlight effect after animation
            setTimeout(() => {
                clickEffect.classList.remove('show');
                incomePerClickDisplay.classList.remove('click-highlight');
            }, 500);
        }
    });

    // 5. Boost functionality
    boostButton.addEventListener('click', () => {
        if (!boostActive) {
            activateBoost();
        } else {
            alert("Boost already active!");
        }
    });

    function activateBoost() {
        boostActive = true;
        boostButton.disabled = true;
        boostButton.classList.add('boost-active');
        boostTimerDisplay.style.display = 'block';

        const boostInterval = setInterval(() => {
            boostTimeLeft -= 1;
            boostCountdownDisplay.textContent = boostTimeLeft;

            if (boostTimeLeft <= 0) {
                clearInterval(boostInterval);
                endBoost();
            }
        }, 1000);
    }

    function endBoost() {
        boostActive = false;
        boostButton.disabled = false;
        boostButton.classList.remove('boost-active');
        boostTimerDisplay.style.display = 'none';
        boostTimeLeft = 30;  // Reset boost time
        alert('Boost has ended!');
    }
});