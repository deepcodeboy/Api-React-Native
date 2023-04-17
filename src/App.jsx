import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'


function App() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    console.log(pokemons)
  }, [pokemons])

  
    const getPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0')
      const listaPokemons = await response.json()
      const { results } = listaPokemons

      const newPokemons = results.map(async (pokemon) => {

        const response = await fetch(pokemon.url)
        const poke = await response.json()

        return {
          id: poke.id,
          name: poke.name,
          img: poke.sprites.other["official-artwork"].front_default
        }
      })
      setPokemons(await Promise.all(newPokemons))
    }
    
    const handleBorrar=(nombre)=>{//borra un elemento de la lista
      setPokemons(pokemons.filter(e=>e.name!=nombre))
    }

  return (
    <>
      <Navbar />
      <div className="App">
        <h1>Pokedex</h1>
      <button onClick={getPokemons}>Listar Pokemons</button>

        <div className='row'>
          {
            pokemons.map((pokemon, index) => {
              return (
                <div key={index}>
                  <img src={pokemon.img} alt={pokemon.name}></img><br />
                  <span>#{pokemon.id}</span><br />
                  <p>{pokemon.name}</p>
                  <button onClick={() => handleBorrar(pokemon.name)}>Quitar</button>
                </div>
              )
            })
          }

        </div>
      </div>
    </>
  )
}

export default App
