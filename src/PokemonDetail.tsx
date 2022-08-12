import { PokemonDetail as PokemonDetailType } from "./entity/PokemonDetail";
import "./PokemonDetail.css";
interface PokemonDetailProps {
  pokemon: PokemonDetailType;
}

export const PokemonDetail = ({ pokemon }: PokemonDetailProps) => {
  return (
    <div className="detail-container">
      <div className="detail-title">
        <div>{pokemon.pnumber.toString().padStart(3, "0")}</div>
        <div>
          <h3>{pokemon.name}</h3>
        </div>
        <div>{pokemon.ptype}</div>
      </div>
      <div className="detail-content">
        <div className="detail-image">
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.pnumber
              .toString()
              .padStart(3, "0")}.png`}
          />
        </div>
        <div className="detail-info">
          Weight: <span>{pokemon.pweight}</span> Lbs
        </div>
      </div>
    </div>
  );
};
