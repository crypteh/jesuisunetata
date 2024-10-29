document.addEventListener('DOMContentLoaded', () => {
    const referralLinkInput = document.getElementById('referral-link');
    const referralList = document.getElementById('referral-list');

    // Simulate fetching referral data (Replace with actual API calls)
    const referralData = [
        { username: 'Referral1' },
        { username: 'Referral2' },
        { username: 'Referral3' },
    ];

    // Generate referral link (Mock data, replace with actual link generation logic)
    referralLinkInput.value = 'https://yourgame.com/referral/12345';

    // Populate the referral list
    referralData.forEach(referral => {
        const referralItem = document.createElement('li');
        referralItem.textContent = referral.username;
        referralList.appendChild(referralItem);
    });

    document.getElementById('copy-referral-link').addEventListener('click', () => {
        referralLinkInput.select();
        document.execCommand('copy');
        alert('Referral link copied!');
    });

    document.getElementById('back-to-main').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});