const pokemonList = document.getElementById('pokemon-list')
const numberPokemon = document.getElementById('number-pokemon')
const lista = document.querySelector('ol')
const openModalBtn = document.getElementById("name-pokemon")
const allPokemons = document.getElementById("allPokemons")

allPokemons.addEventListener('click', function (e) {
    const btnPokemon = e.target.closest('.btnPokemon')
    const pokemonId = btnPokemon.getAttribute('data-pokemon')
    const modalPokemon = document.querySelector('.modal')

    modalPokemon.style.display = 'block'

    
})


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
          <button style="background-color: ${colorType}" class="name btnPokemon" data-pokemon="${detalhesPokemon.id}">
            ${detalhesPokemon.name}
          </button>
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


    for (let i = 0; i < listaPokemon.length; i++) {
        const detalhesPokemon = await showPokemon(listaPokemon[i].name)
        const itemHtml = createHtml(detalhesPokemon)
        // console.log(detalhesPokemon)
        lista.innerHTML += itemHtml
    }
})