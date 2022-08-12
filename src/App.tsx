import { useEffect, useState } from "react";
import "./App.css";
import { PokemonList } from "./PokemonList";
import { Pokemon } from "./entity/Pokemon";
import { POKEMON_API } from "./constants";
import { getNumberFromUrl } from "./helper";
import { PokemonDetail as PokemonDetailType } from "./entity/PokemonDetail";
import { PokemonDetail } from "./PokemonDetail";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<PokemonDetailType>({
    name: "",
    ptype: "",
    pnumber: 0,
    pweight: 0,
  });

  const pokemonOnClick = (id: number) => {
    const callAPI = async () => {
      const response = await fetch(`${POKEMON_API}/pokemon/${id}`);
      const result = await response.json();

      const pokemonDetail: PokemonDetailType = {
        name: result.name,
        ptype: result.types[0].type.name,
        pnumber: parseInt(result.id),
        pweight: result.weight,
      };

      setCurrentPokemon(pokemonDetail);
    };

    callAPI();
  };

  useEffect(() => {
    const callAPI = async () => {
      const response = await fetch(`${POKEMON_API}/pokemon`);
      const result = await response.json();

      const pokemonResult = result.results.map((item: any) => {
        return { name: item.name, id: getNumberFromUrl(item.url) };
      });

      setPokemons(pokemonResult);
    };

    callAPI();
  }, []);

  return (
    <div className="App">
      <PokemonDetail pokemon={currentPokemon} />
      <PokemonList pokemons={pokemons} onClick={pokemonOnClick} />
    </div>
  );
}

export default App;
