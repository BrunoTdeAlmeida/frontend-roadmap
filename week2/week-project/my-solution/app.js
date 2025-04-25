let currentPkm = null
let myPkmns = []

const pkmnsFromLocalStorage = localStorage.getItem('pokemonTeam')

if (pkmnsFromLocalStorage) {
    myPkmns = JSON.parse(pkmnsFromLocalStorage)
}

const searchPkm = async () => {
    const pkmNameInput = document.getElementById('pkmInput').value

    // verificando se o input está vazio
    if (!pkmNameInput) {
        alert('Choose a pokemon')
    }

    // buscar pkm digitaod na api
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmNameInput}`)

    currentPkm = await response.json()

    const pkmHtml = `
        <div>
            <h2>${currentPkm.name}</h2>
            <img src="${currentPkm.sprites.front_default}" alt="${currentPkm.name}" />
            <button onclick="addToTeam()">Add to team</button>
        </div>
    `

    document.getElementById('pkmResult').innerHTML = pkmHtml
}

const addToTeam = () => {
    // verificar se a pt está cheia
    if (myPkmns.length >= 6) {
        alert('Seu time está cheio.')
        return
    }

    // verificar se o pkm ja esta na pt
    if (myPkmns.some((pkm) => pkm.name === currentPkm.name)) {
        alert('Este pokemon já esta no seu time.')
        return
    }

    const pokemonToAdd = {
        name: currentPkm.name,
        img: currentPkm.sprites.front_default
    }

    myPkmns.push(pokemonToAdd)
    localStorage.setItem('pokemonTeam', JSON.stringify(myPkmns))

    displayTeam()
}

const displayTeam = () => {
    const teamHTML = myPkmns.map((pkm) => {
        console.log(pkm)
        return `
            <div>
                <h3>${pkm.name}</h3>
                <img src="${pkm.img}" alt="${pkm.name}" />
                <button>Remove</button>
            </div>
        `
    }).join('')

  
    document.getElementById('myTeam').innerHTML = teamHTML 
}

displayTeam()