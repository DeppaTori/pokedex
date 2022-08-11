import { useEffect, useState } from "react";
import { POKEMON_API } from "./constants";
import { Pokemon } from "./entity/Pokemon";
import { getNumberFromUrl } from "./helper";
import "./PokemonList.css";

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const callAPI = async () => {
      const response = await fetch(`${POKEMON_API}/pokemon`);
      const result = await response.json();
      setPokemons(
        result.results.map((item: any) => {
          return { name: item.name, id: getNumberFromUrl(item.url) };
        })
      );
    };

    callAPI();
  }, []);

  return (
    <div className="pokemon-list-container">
      {pokemons.map((pokemon, index) => (
        <div className="pokemon-list-item" key={index}>
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id
              .toString()
              .padStart(3, "0")}.png`}
          />
          <div>{pokemon.id.toString().padStart(3, "0")}</div>
          <div>{pokemon.name}</div>
        </div>
      ))}
    </div>
  );
};
