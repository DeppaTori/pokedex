import { render, screen } from "@testing-library/react";
import { PokemonList } from "../PokemonList";

describe("PokemonList", () => {
  it("renders pokemon numbers and names", () => {
    const pokemons = [
      {
        name: "Pokemon 1",
        id: 1,
      },
      {
        name: "Pokemon 2",
        id: 2,
      },
    ];
    render(<PokemonList pokemons={pokemons} />);
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
    expect(screen.getByText(pokemons[1].name)).toBeInTheDocument();
    expect(screen.getByText("001")).toBeInTheDocument();
    expect(screen.getByText("002")).toBeInTheDocument();
  });
});
