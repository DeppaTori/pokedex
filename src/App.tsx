import { useEffect, useState } from "react";
import "./App.css";
import { PokemonList } from "./PokemonList";
import { Pokemon } from "./entity/Pokemon";
import { POKEMON_API } from "./constants";
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
  const [pokemonAPIs, setPokemonAPIs] = useState<string[]>([]);

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
      const results = await Promise.all(
        pokemonAPIs.map(async (url: string) => {
          const resp = await fetch(url);
          const res = await resp.json();
          return res;
        })
      );

      const pokemonResult = results.map((item: any) => {
        return {
          name: item.name,
          id: item.id,
          ptypes: item.types.map((ty: any) => ty.type.name),
        };
      });

      setPokemons(pokemonResult);
    };

    callAPI();
  }, [pokemonAPIs]);

  useEffect(() => {
    const callAPI = async () => {
      const response = await fetch(`${POKEMON_API}/pokemon?offset=0&limit=905`);
      const result = await response.json();

      setPokemonAPIs(result.results.map((item: any) => item.url));
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
