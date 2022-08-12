import { Pokemon } from "./entity/Pokemon";
import "./PokemonList.css";

interface PokemonListProps {
  pokemons: Pokemon[];
  onClick: Function;
}

export const PokemonList = ({ pokemons, onClick }: PokemonListProps) => {
  return (
    <div className="pokemon-list-container">
      {pokemons.map((pokemon, index) => (
        <div
          className="pokemon-list-item"
          key={index}
          onClick={() => onClick(pokemon.id)}
        >
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
