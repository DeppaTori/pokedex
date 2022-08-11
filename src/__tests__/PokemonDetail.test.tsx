import { render, screen } from "@testing-library/react";
import { PokemonDetail } from "../PokemonDetail";

describe("PokemonDetail", () => {
  it("renders pokemon name, type, number, weight", () => {
    const pokemonDetail = {
      name: "pokemon name",
      ptype: "fire",
      pnumber: 1,
      pweight: 3.5,
    };
    render(<PokemonDetail pokemon={pokemonDetail} />);
    expect(screen.getByText(pokemonDetail.name)).toBeInTheDocument();
    expect(screen.getByText(pokemonDetail.ptype)).toBeInTheDocument();
    expect(screen.getByText("001")).toBeInTheDocument();
    expect(screen.getByText(pokemonDetail.pweight)).toBeInTheDocument();
  });
});
