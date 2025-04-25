let currentPkm = null;
let myPkmns = [];

const pkmnsFromLocalStorage = localStorage.getItem("pokemonTeam");

if (pkmnsFromLocalStorage) {
  myPkmns = JSON.parse(pkmnsFromLocalStorage);
}

const searchPkm = async () => {
  const pkmNameInput = document.getElementById("pkmInput").value;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pkmNameInput}`
    );
    if (response === Error || "") {
    }
    currentPkm = await response.json();
    const pkmHtml = `
        <div>
            <h2>${currentPkm.name}</h2>
            <img src="${currentPkm.sprites.front_default}" alt="${currentPkm.name}" />
            <button onclick="addToTeam()">Add to team</button>
        </div>
    `;
    document.getElementById("pkmResult").innerHTML = pkmHtml;
  } catch (error) {
    alert("Enter a valid Pokemon name!");
  }
};

const addToTeam = () => {
  if (myPkmns.length >= 6) {
    alert("Seu time está cheio.");
    return;
  }

  if (myPkmns.some((pkm) => pkm.name === currentPkm.name)) {
    alert("Este pokemon já esta no seu time.");
    return;
  }

  const pokemonToAdd = {
    name: currentPkm.name,
    img: currentPkm.sprites.front_default,
  };

  myPkmns.push(pokemonToAdd);
  localStorage.setItem("pokemonTeam", JSON.stringify(myPkmns));

  displayTeam();
};

const displayTeam = () => {
  const teamHTML = myPkmns
    .map((pkm) => {
      return `
            <div>
                <h3>${pkm.name}</h3>
                <img src="${pkm.img}" alt="${pkm.name}" />
                <button onclick="removePkm('${pkm.name}')">Remove</button>
            </div>
        `;
    })
    .join("");
  document.getElementById("myTeam").innerHTML = teamHTML;
};

const removePkm = (pokemonName) => {
  myPkmns = myPkmns.filter((pokemon) => pokemon.name !== pokemonName);
  localStorage.setItem("pokemonTeam", JSON.stringify(myPkmns));
  displayTeam();
};

displayTeam();
