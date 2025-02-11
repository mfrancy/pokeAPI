const pokemonList = document.getElementById('pokemon-list')
const numberPokemon = document.getElementById('number-pokemon')
const lista = document.querySelector('ol')
const openModalBtn = document.getElementById("name-pokemon")
const allPokemons = document.getElementById("allPokemons")

const typeColors = {
  grass: { colorCard: '#83d00b', colorType: '#5e9509' },
  fire: { colorCard: '#a71616e3', colorType: '#f13636e3' },
  water: { colorCard: '#0b57d0', colorType: '#0b45a3' },
  bug: { colorCard: '#8B5A2B', colorType: '#4B3621' },
  psychic: { colorCard: '#6A0DAD', colorType: '#9D5BDF' },
  rock: { colorCard: '#C2B280', colorType: '#8B6F33' },
  fairy: { colorCard: '#F9A7D5', colorType: '#F17BC0' },
  normal: { colorCard: '#B7A491', colorType: '#8B7960' },
  fighting: { colorCard: '#C66215', colorType: '#8B3A00' },
  poison: { colorCard: '#A040A0', colorType: '#6A006A' },
  electric: { colorCard: '#F7D02C', colorType: '#C7A008' },
  ghost: { colorCard: '#705898', colorType: '#4A3C6E' },
  ground: { colorCard: '#E2BF65', colorType: '#9B7653' },
  ice: { colorCard: '#98D8D8', colorType: '#63A4A4' },
  dragon: { colorCard: '#7038F8', colorType: '#4A1FA5' },
  dark: { colorCard: '#705848', colorType: '#4A3825' },
  default: { colorCard: '#A0A0A0', colorType: '#707070' },
  steel: { colorCard: '#B8B8B8', colorType: '#787878' }
}


function showModalHtml(detalhesPokemon) {


  return `<div class="modal-header">
        <div>
          <h2>${detalhesPokemon.name.toUpperCase()}</h2>
        </div>
        <div>
          <i id="fechar-modal" class="fa-solid fa-xmark animationBtn"></i>
        </div>
      </div>
      <div class="modal-body">
        <div class="imgModal">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${detalhesPokemon.id}.svg"
            alt=""
            srcset=""
          />
        </div>
        <div class="modalDetalhes">
          <div class="tituloDetalhes">
            <h6>detalhes</h6>
          </div>
        </div>
      </div>`
}


allPokemons.addEventListener('click', async function (e) {
  const btnPokemon = e.target.closest('.btnPokemon')
  const pokemonId = btnPokemon.getAttribute('data-pokemon')
  const modalPokemon = document.querySelector('.modal');
  const modalId = await showPokemon(pokemonId);


  console.log(pokemonId)

  modalPokemon.innerHTML = showModalHtml(modalId)

  modalPokemon.style.display = 'block'

  const btnCloseModal = document.getElementById('fechar-modal')


  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', function () {
      const modalPokemon = document.querySelector('.modal')
      modalPokemon.style.display = 'none'
    })
  } else {
    console.log('Botão não existe')
  }




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
  // let colorCardPokemon; 
  // let colorTypePokemon;

  // if (type === 'grass') {
  //   colorCardPokemon = '#49d0b0'
  //    colorTypePokemon = '#2d8772'

  // } else if (type === 'fire') {  
  //   colorCardPokemon ='#a71616e3'
  //   colorTypePokemon ='#f13636e3'
  // } else if (type === 'water') {
  //   colorCardPokemon = '#0b57d0'
  //   colorTypePokemon = '#0b45a3'
  // } else {
  //   colorCardPokemon = '#83d00b'
  //   colorTypePokemon = '#5e9509'
  // }

  return typeColors[type]

}


function createHtml(detalhesPokemon) {
  const tipoPokemon = detalhesPokemon?.types[0]?.type?.name || 'default';
  // console.log('Tipo:', tipoPokemon)
  const corCard = typeColors[tipoPokemon]?.colorCard;
  const corType = typeColors[tipoPokemon]?.colorType;
  const typePokemon = detalhesPokemon.types[1] ? `<li style="background-color: ${corType}" class="type">${detalhesPokemon.types[1]?.type?.name}</li>` : ''
  // const colorPokemon = changeColor(detalhesPokemon.types[0].type.name)


  return `<li id="pokemon-list" style="background-color: ${corCard}";  class="pokemon animation animationBtn">
          <span id="number-pokemon" class="number">#00${detalhesPokemon.id}</span>
          <button style="background-color: ${corType}" class="animationBtn name btnPokemon" data-pokemon="${detalhesPokemon.id}">
            ${detalhesPokemon.name}
          </button>
          <div class="detail">
            <ol class="types">       
              <li class="type" style="background-color: ${corType}">${tipoPokemon}</li>
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
  const { results: listaPokemon } = await getListNamePokemon(10)
  let html = ""



  for (let i = 0; i < listaPokemon.length; i++) {
    const detalhesPokemon = await showPokemon(listaPokemon[i].name)
    // console.log(detalhesPokemon)
    html += createHtml(detalhesPokemon)
  }

  lista.innerHTML = html;
})