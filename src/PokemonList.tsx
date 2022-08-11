import { useEffect, useState } from "react";
import { POKEMON_API } from "./constants";
import { Pokemon } from "./entity/Pokemon";

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const callAPI = async () => {
      const response = await fetch(`${POKEMON_API}/pokemon`);
      const result = await response.json();
      setPokemons(result.results);
    };

    callAPI();
  }, []);

  return (
    <div>
      {pokemons.map((pokemon, index) => (
        <div key={index}>{pokemon.name}</div>
      ))}
    </div>
  );
};
