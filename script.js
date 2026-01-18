// Game state
let game = {
    bots: 0,
    coins: 0,
    clickPower: 1,
    idlePower: 0,
    prestigeMultiplier: 1,
    upgradeClickCost: 10,
    upgradeIdleCost: 20,
    prestigeReq: 50
};

// DOM elements
const botCountEl = document.getElementById("botCount");
const coinCountEl = document.getElementById("coinCount");
const clickBotBtn = document.getElementById("clickBot");
const upgradeClickBtn = document.getElementById("upgradeClick");
const upgradeIdleBtn = document.getElementById("upgradeIdle");
const prestigeBtn = document.getElementById("prestige");
const upgradeClickCostEl = document.getElementById("upgradeClickCost");
const upgradeIdleCostEl = document.getElementById("upgradeIdleCost");
const prestigeReqEl = document.getElementById("prestigeReq");

// Load game
if (localStorage.getItem("botFactoryGame")) {
    game = JSON.parse(localStorage.getItem("botFactoryGame"));
    updateDisplay();
}

// Click bot
clickBotBtn.addEventListener("click", () => {
    game.bots += game.clickPower * game.prestigeMultiplier;
    game.coins += game.clickPower * game.prestigeMultiplier;
    updateDisplay();
});

// Upgrade click
upgradeClickBtn.addEventListener("click", () => {
    if (game.coins >= game.upgradeClickCost) {
        game.coins -= game.upgradeClickCost;
        game.clickPower += 1;
        game.upgradeClickCost = Math.floor(game.upgradeClickCost * 1.5);
        updateDisplay();
    }
});

// Upgrade idle
upgradeIdleBtn.addEventListener("click", () => {
    if (game.coins >= game.upgradeIdleCost) {
        game.coins -= game.upgradeIdleCost;
        game.idlePower += 1;
        game.upgradeIdleCost = Math.floor(game.upgradeIdleCost * 1.5);
        updateDisplay();
    }
});

// Prestige
prestigeBtn.addEventListener("click", () => {
    if (game.bots >= game.prestigeReq) {
        game.bots = 0;
        game.coins = 0;
        game.clickPower = 1;
        game.idlePower = 0;
        game.prestigeMultiplier += 1;
        game.upgradeClickCost = 10;
        game.upgradeIdleCost = 20;
        updateDisplay();
        alert(`Prestige activated! Multiplier is now x${game.prestigeMultiplier}`);
    }
});

// Idle production every second
setInterval(() => {
    game.bots += game.idlePower * game.prestigeMultiplier;
    game.coins += game.idlePower * game.prestigeMultiplier;
    updateDisplay();
}, 1000);

// Update display
function updateDisplay() {
    botCountEl.textContent = game.bots;
    coinCountEl.textContent = game.coins;
    upgradeClickCostEl.textContent = game.upgradeClickCost;
    upgradeIdleCostEl.textContent = game.upgradeIdleCost;
    prestigeReqEl.textContent = game.prestigeReq;
    saveGame();
}

// Save game
function saveGame() {
    localStorage.setItem("botFactoryGame", JSON.stringify(game));
}
