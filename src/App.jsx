import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'


function App() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    const getPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0')
      const listaPokemons = await response.json()
      const { results } = listaPokemons

      const newPokemons = results.map(async (pokemon) => {

        const response = await fetch(pokemon.url)
        const poke = await response.json()

        return {
          id: pokemon.id,
          name: poke.name,
          img: poke.sprites.other["official-artwork"].front_default
        }
      })
      setPokemons(await Promise.all(newPokemons))
    }
    getPokemons()
  }, [])

  return (
    <>
      <Navbar />
      <div className="App">
        <h1>Pokedex</h1>
        <div>
          {
            pokemons.map((pokemon, index) => {
              return (
                <div key={index}>
                  <img src={pokemon.img} alt={pokemon.name}></img>
                  <p>{pokemon.name}</p>
                  <span>{pokemon.id}</span>
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
