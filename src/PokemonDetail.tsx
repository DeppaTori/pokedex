import { PokemonDetail as PokemonDetailType } from "./entity/PokemonDetail";

interface PokemonDetailProps {
  pokemon: PokemonDetailType;
}

export const PokemonDetail = ({ pokemon }: PokemonDetailProps) => {
  return (
    <div>
      <div>{pokemon.name}</div>
      <div>{pokemon.ptype}</div>
      <div>{pokemon.pweight}</div>
      <div>{pokemon.pnumber.toString().padStart(3, "0")}</div>
    </div>
  );
};
