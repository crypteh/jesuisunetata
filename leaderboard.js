document.addEventListener('DOMContentLoaded', () => {
    const userRankDisplay = document.getElementById('user-rank');
    const leaderboardContainer = document.getElementById('leaderboard');

    // Simulate fetching leaderboard data (Replace this with actual API calls later)
    const leaderboardData = [
        { username: 'User1', rank: 1, score: 5000 },
        { username: 'User2', rank: 2, score: 4500 },
        { username: 'User3', rank: 3, score: 4000 },
        // ... up to top 10
    ];

    // Display the user's rank (replace with actual data later)
    userRankDisplay.textContent = '5 (Example)';

    // Populate the leaderboard
    leaderboardData.forEach((user) => {
        const userElement = document.createElement('div');
        userElement.textContent = `${user.rank}. ${user.username} - ${user.score}`;
        leaderboardContainer.appendChild(userElement);
    });

    // Back button functionality
    document.getElementById('back-to-main').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});