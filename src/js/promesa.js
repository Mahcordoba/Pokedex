// Comunicación con el dom
const contenedorCards = document.getElementById('content-card')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
const cargando = document.querySelector('.loanding')

// Otras variables 
let completo = false
let primeraVez = true
// Api 
const API = 'https://pokeapi.co/api/v2/pokemon/'

// funcion de crear nodos
const nuevoNodo = (padre, tipo) =>
{
  const TIPO = document.createElement('IMG')
  TIPO.setAttribute('src',tipos[tipo])
  padre.appendChild(TIPO)
}

// funcion inicial de la pokedex
const firts = ()=>
{
  document.querySelector('.contenedor').classList.add('open')
  document.querySelector('.especial').classList.remove('invisible')
  contenedorCards.classList.remove('invisible')
  primeraVez= false
}

// funcion que sirve para traer un pokemón
const aleatorio = () =>
{
  if(primeraVez) firts()
  
  completo= false;
  cargando.classList.remove('invisible')
  if(document.querySelector('.card') != null) contenedorCards.removeChild(document.querySelector('.card'))
   
  fetchData(API)
  .then(data => {
    const RAMDOM = Math.round(Math.random()*(data.count-220))
    return fetchData(API+RAMDOM)
  })
  .then(data => {
    const clone = template.cloneNode(true)
    clone.querySelector('.name').textContent = data.name
    clone.querySelector('.number').textContent = data.id
    clone.querySelector('.peso').textContent += data.weight + ' Kg'
    clone.querySelector('.altura').textContent += data.height + ' M'
    clone.querySelector('.imagen').setAttribute('src', data.sprites.other.home.front_default)
    // se crea una variable para guardar los tipos de los pokemón
    const tipos = data.types
    nuevoNodo(clone.querySelector('.tipos'),tipos[0].type.name)
    if(tipos.length === 2) nuevoNodo(clone.querySelector('.tipos'),tipos[1].type.name) 
    contenedorCards.appendChild(clone)
    completo= true
  })
  .catch(error => console.log(error))
  .finally(()=>
  {
    setTimeout(()=>{
      if(completo)
      {
        cargando.classList.add('invisible')
        document.querySelector('.card').classList.remove('invisible')
      }  
    },1300)
  })
}

