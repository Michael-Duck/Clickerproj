let gold = 0;
let level = 1;
let xp = 0;
let xpNeeded = 100;
let clickPower = 1;
let attackPower = 5;
let enemyHP = 100;
let healthPotions = 0;
let playerHP = 100;
let maxPlayerHP = 100;

const enemies = [
    { name: "Goblin", hp: 100, xpReward: 20, goldReward: 10 },
    { name: "Orc", hp: 200, xpReward: 40, goldReward: 20 },
    { name: "Dragon", hp: 500, xpReward: 100, goldReward: 50 }
];

let currentEnemy = enemies[0];

function updateDisplay() {
    document.getElementById('gold').textContent = gold;
    document.getElementById('level').textContent = level;
    document.getElementById('xp').textContent = xp;
    document.getElementById('xpNeeded').textContent = xpNeeded;
    document.getElementById('enemyHP').textContent = enemyHP;
    document.getElementById('enemyName').textContent = currentEnemy.name;
    document.getElementById('healthPotions').textContent = healthPotions;
}

function getRandomEnemy() {
    return enemies[Math.floor(Math.random() * enemies.length)];
}

document.getElementById('clickBtn').addEventListener('click', () => {
    gold += clickPower;
    updateDisplay();
});

document.getElementById('attackBtn').addEventListener('click', () => {
    enemyHP -= attackPower;
    if (enemyHP <= 0) {
        xp += currentEnemy.xpReward;
        gold += currentEnemy.goldReward;
        currentEnemy = getRandomEnemy();
        enemyHP = currentEnemy.hp;
        if (xp >= xpNeeded) {
            level++;
            xp = 0;
            xpNeeded = Math.floor(xpNeeded * 1.5);
            maxPlayerHP += 20;
            playerHP = maxPlayerHP;
        }
    }
    updateDisplay();
});

document.getElementById('upgradeClick').addEventListener('click', () => {
    if (gold >= 10) {
        gold -= 10;
        clickPower++;
        updateDisplay();
    }
});

document.getElementById('upgradeAttack').addEventListener('click', () => {
    if (gold >= 20) {
        gold -= 20;
        attackPower += 2;
        updateDisplay();
    }
});

document.getElementById('buyPotion').addEventListener('click', () => {
    if (gold >= 50) {
        gold -= 50;
        healthPotions++;
        updateDisplay();
    }
});

document.getElementById('usePotion').addEventListener('click', () => {
    if (healthPotions > 0 && playerHP < maxPlayerHP) {
        healthPotions--;
        playerHP = Math.min(playerHP + 50, maxPlayerHP);
        updateDisplay();
    }
});

updateDisplay();
