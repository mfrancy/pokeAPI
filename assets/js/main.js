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

function changeColor(type) {
  let colorCardPokemon; 
  let colorTypePokemon;

  if (type === 'grass') {
    colorCardPokemon = '#49d0b0'
     colorTypePokemon = '#2d8772'

  } else if (type === 'fire') {  
    colorCardPokemon ='#f13636e3'
    colorTypePokemon ='#a71616e3'
  } else if (type === 'water') {
    colorCardPokemon = '#0b57d0'
    colorTypePokemon = '#0b45a3'
  } else {
    colorCardPokemon = '#83d00b'
    colorTypePokemon = '#5e9509'
  }

  return [colorCardPokemon, colorTypePokemon];
}

function createHtml(detalhesPokemon) {
  const [colorPokemon, colorType] = changeColor(detalhesPokemon.types[0].type.name);
  const typePokemon = detalhesPokemon.types[1] ? `<li style="background-color: ${colorType}" class="type">${detalhesPokemon.types[1]?.type?.name}</li>` : ''
  // const colorPokemon = changeColor(detalhesPokemon.types[0].type.name)

    return `<li id="pokemon-list" style="background-color: ${colorPokemon}";  class="pokemon">
          <span id="number-pokemon" class="number">#00${detalhesPokemon.id}</span>
          <span id="name-pokemon" class="name">${detalhesPokemon.name}</span>
          <div class="detail">
            <ol class="types">       
              <li class="type" style="background-color: ${colorType}">${detalhesPokemon.types[0].type.name}</li>
              ${typePokemon}
            </ol>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${detalhesPokemon.id}.svg"
              alt=""
              srcset=""
            />
          </div>
        </li>`
        
}

document.addEventListener('DOMContentLoaded', async () => {
    const lista = document.querySelector('ol')
    const {results: listaPokemon} = await getListNamePokemon(14)
    // const arrayDePokemons = listaPokemon.map(async function (element) {
    //     console.log(element.name)
    //     const detalhesPokemon = await showPokemon(element.name)
    //     return createHtml(detalhesPokemon)
    // })
    // console.log(await arrayDePokemons)

    for (let i = 0; i < listaPokemon.length; i++) {
        const detalhesPokemon = await showPokemon(listaPokemon[i].name)
        const itemHtml = createHtml(detalhesPokemon)
        console.log(detalhesPokemon)
        lista.innerHTML += itemHtml
    }

})