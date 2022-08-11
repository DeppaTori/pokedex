import { getNumberFromUrl } from "../helper";

describe("helper", () => {
  it("returns pokemon number from url", () => {
    expect(getNumberFromUrl("https://pokeapi.co/api/v2/pokemon/21/")).toBe(21);
    expect(getNumberFromUrl("https://pokeapi.co/api/v2/pokemon/91/")).toBe(91);
    expect(getNumberFromUrl("https://pokeapi.co/api/v2/pokemon/1/")).toBe(1);
  });
});
