let containerDom = document.querySelector(".container");
let formDom = document.querySelector(".gameStarter");
let startDom = document.querySelector("#startButton");
let endDom = document.querySelector("#endButton");
let battleFieldDom = document.querySelector(".battlefield");

let attackButtonPlayer1 = document.querySelector("#attackButton1");
let reviveButtonPlayer1 = document.querySelector("#reviveButton1");
let attackButtonPlayer2 = document.querySelector("#attackButton2");
let reviveButtonPlayer2 = document.querySelector("#reviveButton2");

let player1PokemonBattleHP = document.querySelector("#hpPlayer1");
let player2PokemonBattleHP = document.querySelector("#hpPlayer2");

let player1PokemonBattleHPText = document.querySelector(
  ".battle-pokemon-1 label"
);
let player2PokemonBattleHPText = document.querySelector(
  ".battle-pokemon-2 label"
);
battleFieldDom.style.display = "none";

// Constant
let player1Object;
let player2Object;
let player1PokemonImg;
let player2PokemonImg;

let pokemonProperties = {
  bulbasaur: {
    imageLoc: "./assests/bulbasaur2.gif",
    type: "grass",
    attack: 100,
    hp: 100,
  },
  charmander: {
    imageLoc: "./assests/charmander1.gif",
    type: "fire",
    attack: 100,
    hp: 100,
  },
  squirtle: {
    imageLoc: "./assests/squirtle.webp",
    type: "water",
    attack: 100,
    hp: 100,
  },
};

//Pokemon Class
class PokemonClass {
  // initialize property
  constructor(name, element, hp, pokemonDiv) {
    this.name = name;
    this.element = element;
    this.hp = hp;
    this.pokemonDom = pokemonDiv;
  }

  attack(opponent) {
    if (opponent instanceof PokemonClass) {
      opponent.hp -= 10;
    } else {
      console.log("Can attack same class only");
    }
  }

  revive() {
    console.log("revive");
    this.hp = this.hp + 10;
  }

  moveUp() {
    let pokemonPosition = this.pokemonDom.style.top.replace("px", "");

    if (pokemonPosition == 0) {
      let newPokemonPosition = Number(pokemonPosition);
      this.pokemonDom.style.top = String(newPokemonPosition) + "px";
    } else {
      let newPokemonPosition = Number(pokemonPosition) - 90;
      this.pokemonDom.style.top = String(newPokemonPosition) + "px";
    }
  }

  moveDown() {
    let pokemonPosition = this.pokemonDom.style.top.replace("px", "");
    if (pokemonPosition >= 350) {
      let newPokemonPosition = Number(pokemonPosition);
      this.pokemonDom.style.top = String(newPokemonPosition) + "px";
    } else {
      let newPokemonPosition = Number(pokemonPosition) + 90;
      this.pokemonDom.style.top = String(newPokemonPosition) + "px";
    }
  }

  moveRight() {
    let pokemonPosition = this.pokemonDom.style.left.replace("px", "");
    if (pokemonPosition >= 600) {
      let newPokemonPosition = Number(pokemonPosition);
      this.pokemonDom.style.left = String(newPokemonPosition) + "px";
    } else {
      let newPokemonPosition = Number(pokemonPosition) + 90;

      this.pokemonDom.style.left = String(newPokemonPosition) + "px";
    }
  }

  moveLeft() {
    let pokemonPosition = this.pokemonDom.style.left.replace("px", "");
    if (pokemonPosition <= 0) {
      let newPokemonPosition = Number(pokemonPosition);
      this.pokemonDom.style.left = String(newPokemonPosition) + "px";
    } else {
      let newPokemonPosition = Number(pokemonPosition) - 90;
      this.pokemonDom.style.left = String(newPokemonPosition) + "px";
    }
  }
}

function startGame() {
  let player1Pokemon = document.getElementById("player1").value;
  let player2Pokemon = document.getElementById("player2").value;
  formDom.setAttribute("style", "display:none;");
  startDom.setAttribute("style", "display:none;");
  console.log("Player 1 selected:", player1Pokemon);
  console.log("Player 2 selected:", player2Pokemon);

  let listPlayerProperties = {
    player1: {
      position: `left:0;top:0;`,
      pokemonImage: pokemonProperties[player1Pokemon]["imageLoc"],
      name: "player1",
    },
    player2: {
      position: `left:630px;top:360px`,
      pokemonImage: pokemonProperties[player2Pokemon]["imageLoc"],
      name: "player2",
    },
  };

  let player1PokemonDiv = createPokemonDiv(listPlayerProperties["player1"]);
  let player2PokemonDiv = createPokemonDiv(listPlayerProperties["player2"]);

  player1Object = new PokemonClass(
    player1Pokemon,
    pokemonProperties[player1Pokemon]["type"],
    pokemonProperties[player1Pokemon]["hp"],
    player1PokemonDiv
  );
  player2Object = new PokemonClass(
    player2Pokemon,
    pokemonProperties[player2Pokemon]["type"],
    pokemonProperties[player2Pokemon]["hp"],
    player2PokemonDiv
  );
}

function createPokemonDiv(playerProperties) {
  const newDiv = document.createElement("div");
  newDiv.classList.add(`pokemon`);
  newDiv.id = playerProperties["name"];
  const newImg = document.createElement("img");
  newImg.src = playerProperties["pokemonImage"];
  newImg.alt = playerProperties["name"];

  newImg.setAttribute("style", "display");
  newImg.setAttribute("style", "width: 80px;height: 80px;");
  newDiv.appendChild(newImg);

  newDiv.setAttribute("style", playerProperties["position"]);

  containerDom.appendChild(newDiv);

  let pokemonDiv = newDiv;

  return pokemonDiv;
}

function checkCollision() {
  if (
    player1Object.pokemonDom.style.left ==
      player2Object.pokemonDom.style.left &&
    player1Object.pokemonDom.style.top == player2Object.pokemonDom.style.top
  ) {
    console.log("Pokemon Collides");
    prompt("Want to start Battle?");
    startBattleSetup();
  }
}

function startBattleSetup() {
  containerDom.style.display = "none";
  battleFieldDom.style.display = "flex";

  let player1PokemonBattleImg = document.querySelector(
    "#player1PokemonBattle img"
  );

  player1PokemonBattleImg.src =
    pokemonProperties[player1Object.name]["imageLoc"];

  player1PokemonBattleImg;
  let player2PokemonBattleImg = document.querySelector(
    "#player2PokemonBattle img"
  );
  player2PokemonBattleImg.src =
    pokemonProperties[player2Object.name]["imageLoc"];
  let player1PokemonBattleHP = document.querySelector("#hpPlayer1");
  player1PokemonBattleHP.value = 100;

  let player2PokemonBattleHP = document.querySelector("#hpPlayer2");
  player2PokemonBattleHP.value = 100;
  let playerTurn = Math.floor(Math.random() * 2) + 1;
  startPokemonBattle(playerTurn);
}

function attackPokemon(params) {
  if (params == "player1PokemonAttack") {
    player1Object.attack(player2Object);
    // player2Object.hp -= 10;
    player2PokemonBattleHP.value = player2Object.hp;
  } else {
    player2Object.attack(player1Object);
    // player1Object.hp -= 10;
    player1PokemonBattleHP.value = player1Object.hp;
  }
}

function revivePokemon(params) {
  if (params == "player1PokemonRevive") {
    player1Object.revive();
    player1PokemonBattleHP.value = player1Object.hp;
  } else {
    player2Object.revive();
    player2PokemonBattleHP.value = player2Object.hp;
  }
}

function startPokemonBattle(params) {
  if (params == 1) {
    attackButtonPlayer1.disabled = false;
    reviveButtonPlayer1.disabled = false;
    attackButtonPlayer2.disabled = true;
    reviveButtonPlayer2.disabled = true;
  } else if (params == 2) {
    attackButtonPlayer1.disabled = true;
    reviveButtonPlayer1.disabled = true;
    attackButtonPlayer2.disabled = false;
    reviveButtonPlayer2.disabled = false;
  }
}

function checkHp() {
  player1PokemonBattleHPText.innerText = "HP:" + player1Object.hp;
  player2PokemonBattleHPText.innerText = "HP:" + player2Object.hp;
  if (player1Object.hp <= 0) {
    alert("Player 2 wins");
    location.reload();
  }

  if (player2Object.hp <= 0) {
    alert("Player 1 wins");
    location.reload();
  }
}

// Event listeners for Player 1
attackButtonPlayer1.addEventListener("click", function () {
  startPokemonBattle(2);
  checkHp();
});

reviveButtonPlayer1.addEventListener("click", function () {
  startPokemonBattle(2);
  checkHp();
});

// Event listeners for Player 2
attackButtonPlayer2.addEventListener("click", function () {
  startPokemonBattle(1);
  checkHp();
});

reviveButtonPlayer2.addEventListener("click", function () {
  startPokemonBattle(1);
  checkHp();
});

window.addEventListener("keydown", function name(event) {
  console.log(event.key);

  if (event.key == "ArrowRight") {
    player1Object.moveRight();
  }

  if (event.key == "d") {
    player2Object.moveRight();
  }

  if (event.key == "ArrowDown") {
    player1Object.moveDown();
  }

  if (event.key == "s") {
    player2Object.moveDown();
  }

  if (event.key == "ArrowLeft") {
    player1Object.moveLeft();
  }

  if (event.key == "a") {
    player2Object.moveLeft();
  }

  if (event.key == "ArrowUp") {
    player1Object.moveUp();
  }

  if (event.key == "w") {
    player2Object.moveUp();
  }

  checkCollision();
});
