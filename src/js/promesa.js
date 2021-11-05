// const fetchData = require('../utils/fechdata')
const API = 'https://pokeapi.co/api/v2/pokemon/'

fetchData(API)
  .then(data => {
    const RAMDOM = Math.round(Math.random()*(data.count-220))
    return fetchData(API+RAMDOM)
  })
  .then(data => {
    console.log('Nombre ',data.name)
    console.log('Altura', data.height)
    console.log('Numero de la pokedex',data.id)
    console.log('Peso ',data.weight)
    const tipos = data.types
    if(tipos.length === 2) console.log(tipos[1].type.name)
    console.log(tipos[0].type.name)
    console.log(data.sprites.other.home.front_default)
  })
  .catch(error => console.log(error))