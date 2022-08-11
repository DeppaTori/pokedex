import { render, screen } from "@testing-library/react";
import { POKEMON_API } from "../constants";
import { PokemonList } from "../PokemonList";

describe("PokemonList", () => {
  const responses = {
    results: [
      {
        name: "spearow",
        url: "https://pokeapi.co/api/v2/pokemon/21/",
      },
      {
        name: "fearow",
        url: "https://pokeapi.co/api/v2/pokemon/22/",
      },
    ],
  };

  const fetchResponseOk = (body: any) =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(body),
    });

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockReturnValue(fetchResponseOk(responses));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it("calls first page of pokemon api", () => {
    render(<PokemonList />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(`${POKEMON_API}/pokemon`);
  });

  it("renders pokemon names", async () => {
    render(<PokemonList />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(
      await screen.findByText(responses.results[0].name)
    ).toBeInTheDocument();
    expect(screen.getByText("021")).toBeInTheDocument();
  });
});
