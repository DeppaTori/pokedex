import { render, screen } from "@testing-library/react";
import App from "./App";
import { POKEMON_API } from "./constants";
import user from "@testing-library/user-event";

describe("App", () => {
  let windowFetch: any = null;

  const responses = {
    count: 2,
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

  const responseDetail = {
    name: "spearow",
    id: "21",
    types: [
      {
        type: {
          name: "fire",
        },
      },
    ],
    weight: 250,
  };

  const responseDetail2 = {
    name: "spearowx",
    id: "211",
    types: [
      {
        type: {
          name: "firex",
        },
      },
    ],
    weight: 250,
  };

  const fetchResponseOk = (body: any) =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(body),
    } as Response);

  beforeEach(() => {
    windowFetch = jest.spyOn(window, "fetch");
    windowFetch.mockReturnValue(fetchResponseOk(responses));
  });

  afterEach(() => {
    windowFetch.mockRestore();
  });

  it("calls first page of pokemon api", () => {
    render(<App />);
    expect(window.fetch).toHaveBeenCalledWith(
      `${POKEMON_API}/pokemon?offset=0&limit=905`
    );
  });

  it.skip("calls amount of api based on count props from first api call", async () => {
    jest
      .spyOn(window, "fetch")
      .mockReturnValueOnce(fetchResponseOk(responses))
      .mockReturnValueOnce(fetchResponseOk(responseDetail))
      .mockReturnValueOnce(fetchResponseOk(responseDetail2));

    render(<App />);
    expect(await screen.findAllByText(responses.results[0].name)).toHaveLength(
      1
    );
    expect(window.fetch).toHaveBeenCalledTimes(3);
  });

  it("calls api detail when one of the pokemon is clicked", async () => {
    jest
      .spyOn(window, "fetch")
      .mockReturnValueOnce(fetchResponseOk(responses))
      .mockReturnValueOnce(fetchResponseOk(responseDetail))
      .mockReturnValueOnce(fetchResponseOk(responseDetail2))
      .mockReturnValueOnce(fetchResponseOk(responseDetail));

    render(<App />);

    user.click(await screen.findByText(responses.results[0].name));

    expect(window.fetch).toHaveBeenCalledTimes(4);
    expect(window.fetch).toHaveBeenLastCalledWith(`${POKEMON_API}/pokemon/21`);

    expect(
      await screen.findByText(responseDetail.types[0].type.name)
    ).toBeInTheDocument();
    expect(screen.getByText(responseDetail.weight)).toBeInTheDocument();
    expect(screen.getAllByText(responses.results[0].name)).toHaveLength(2);
    expect(screen.getAllByText("021")).toHaveLength(2);
  });
});
