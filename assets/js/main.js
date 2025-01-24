const pokemonList = document.getElementById('pokemon-list')
const numberPokemon = document.getElementById('number-pokemon')
const lista = document.querySelector('ol')


// const pokedex = []

// async function getUrlPokemons() {
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=5')
//     const data = await response.json()

//     for (let i = 0; i < data.results.length; i++) {
//         console.log(data.results[i].name)

//         const nomePokemon = data.results[i].name
//         const {name} = await getPokemon(nomePokemon)
//         console.log(name)

        // const htmlPokedex = `<li id="pokemon-list"  class="pokemon">
        //   <span id="number-pokemon" class="number">#001</span>
        //   <span id="name-pokemon" class="name">${name}</span>
        //   <div class="detail">
        //     <ol class="types">
        //       <li id class="type">grass</li>
        //       <li class="type">poison</li>
        //     </ol>
        //     <img
        //       src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
        //       alt=""
        //       srcset=""
        //     />
        //   </div>
        // </li>`

//         pokedex.push(htmlPokedex)

//     }

//     lista.innerHTML = pokedex.join(' ')
// }

// async function getPokemon(nome) {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
//     return response.json()
// }

// getUrlPokemons()

async function getListNamePokemon(limite) {
    
 const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limite}`)
 return response.json()
}

async function showPokemon(nome) {
     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
     return response.json()
}

function createHtml(detalhesPokemon) {

    return `<li id="pokemon-list"  class="pokemon">
          <span id="number-pokemon" class="number">#001</span>
          <span id="name-pokemon" class="name">${detalhesPokemon.name}</span>
          <div class="detail">
            <ol class="types">
              <li id class="type">grass</li>
              <li class="type">poison</li>
            </ol>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
              alt=""
              srcset=""
            />
          </div>
        </li>`
}

document.addEventListener('DOMContentLoaded', async () => {
    const lista = document.querySelector('ol')
    const {results: listaPokemon} = await getListNamePokemon(3)
    const arrayDePokemons = listaPokemon.map(async function (element) {
        console.log(element.name)
        const detalhesPokemon = await showPokemon(element.name)
        return createHtml(detalhesPokemon)
    })
    console.log(await arrayDePokemons)

    // for (let i = 0; i < listaPokemon.length; i++) {
    //     const detalhesPokemon = await showPokemon(listaPokemon[i].name)
    //     const itemHtml = createHtml(detalhesPokemon)
    //     lista.innerHTML += itemHtml
    // }

})