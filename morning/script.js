//this statement

console.log("OOP");

function Test() {
  console.log(this);
}

//expression

const testExp = () => {
  return 1;
};

//initialize a Pokemon Bluperint
// function Pokemon(name, element, hp) {
//   this.name = name;
//   this.element = element;
//   this.hp = hp;
// }

// Pokemon.prototype.attack = function (opponent) {
//   if (opponent instanceof Pokemon) {
//     opponent.hp -= 10;
//   } else {
//     console.log("Can attack same class only");
//   }
// };

// Pokemon.prototype.revive = function () {
//   console.log("revive");
//   this.hp = this.hp + 10;
// };

// let pikachu = new Pokemon("Pikachu", "Electricity", 100);
// let charmender = new Pokemon("Charmender", "Fire", 100);

// Digimon
// function Digimon(name, element, hp) {
//   this.name = name;
//   this.element = element;
//   this.hp = hp;
// }

// Digimon.prototype.attack = function (opponent) {
//   if (opponent instanceof Digimon) {
//     opponent.hp -= 10;
//   } else {
//     console.log("Can attack same class only");
//   }
// };

// Digimon.prototype.revive = function () {
//   console.log("revive");
//   this.hp = this.hp + 10;
// };

// let agumon = new Digimon("Agumon", "Electricity", 100);

//ES6 syntax
function Pokemon(name, element, hp) {
  this.name = name;
  this.element = element;
  this.hp = hp;
}

Pokemon.prototype.attack = function (opponent) {
  if (opponent instanceof Pokemon) {
    opponent.hp -= 10;
  } else {
    console.log("Can attack same class only");
  }
};

Pokemon.prototype.revive = function () {
  console.log("revive");
  this.hp = this.hp + 10;
};

class PokemonClass {
  // initialize property
  constructor(name, element, hp) {
    this.name = name;
    this.element = element;
    this.hp = hp;
  }

  attack(opponent) {
    if (opponent instanceof Pokemon) {
      opponent.hp -= 10;
    } else {
      console.log("Can attack same class only");
    }
  }

  revive() {
    console.log("revive");
    this.hp = this.hp + 10;
  }
}

// moveUp;
// moveDown;
// moveRight;
// moveLeft;

let pokemonDom = document.querySelector(".pokemon");

// window.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     addTask();
//   }
// });

// pokemonDom.setAttribute("style", "left:100px");

// function moveUP(pokemon){
//     pokemonDom.s
// }

window.addEventListener("keydown", function name(event) {
  console.log(event.key);
  if (event.key == "ArrowRight") {
    let pokemonPosition = pokemonDom.style.left.replace("px", "");

    if (pokemonPosition >= 800) {
      let newPokemonPosition = Number(pokemonPosition);
      pokemonDom.style.left = String(newPokemonPosition) + "px";
    } else {
      let newPokemonPosition = Number(pokemonPosition) + 90;

      pokemonDom.style.left = String(newPokemonPosition) + "px";
    }
  }

  if (event.key == "ArrowDown") {
    let pokemonPosition = pokemonDom.style.top.replace("px", "");

    if (pokemonPosition >= 800) {
      let newPokemonPosition = Number(pokemonPosition);
      pokemonDom.style.top = String(newPokemonPosition) + "px";
    } else {
      let newPokemonPosition = Number(pokemonPosition) + 90;

      pokemonDom.style.top = String(newPokemonPosition) + "px";
    }
    // let newPokemonPosition = Number(pokemonPosition) + 90;
    // pokemonDom.style.top = String(newPokemonPosition) + "px";
  }

  if (event.key == "ArrowLeft") {
    let pokemonPosition = pokemonDom.style.left.replace("px", "");

    let newPokemonPosition = Number(pokemonPosition) - 90;
    pokemonDom.style.left = String(newPokemonPosition) + "px";
  }

  if (event.key == "ArrowUp") {
    let pokemonPosition = pokemonDom.style.top.replace("px", "");
    let newPokemonPosition = Number(pokemonPosition) - 90;
    pokemonDom.style.top = String(newPokemonPosition) + "px";
  }
});
