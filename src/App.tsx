import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { PokemonList } from "./PokemonList";
import { Pokemon } from "./entity/Pokemon";
import { POKEMON_API } from "./constants";
import { PokemonDetail as PokemonDetailType } from "./entity/PokemonDetail";
import { PokemonDetail } from "./PokemonDetail";

function App() {
  // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const pokemons = useRef<Pokemon[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<PokemonDetailType>({
    name: "",
    ptype: "",
    pnumber: 0,
    pweight: 0,
  });
  const [pokemonAPIs, setPokemonAPIs] = useState<string[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  const pokemonOnClick = (id: number) => {
    const callAPI = async () => {
      const response = await fetch(`${POKEMON_API}/pokemon/${id}`);
      const result = await response.json();

      const pokemonDetail: PokemonDetailType = {
        name: result.name,
        ptype: result.types[0].type.name,
        pnumber: parseInt(result.id),
        pweight: result.weight,
      };

      setCurrentPokemon(pokemonDetail);
    };

    callAPI();
  };

  useEffect(() => {
    const callAPI = async () => {
      const results = await Promise.all(
        pokemonAPIs.map(async (url: string) => {
          const resp = await fetch(url);
          const res = await resp.json();
          return res;
        })
      );

      const pokemonResult = results.map((item: any) => {
        return {
          name: item.name,
          id: item.id,
          ptypes: item.types.map((ty: any) => ty.type.name),
        };
      });

      setFilteredPokemons(pokemonResult);
      pokemons.current = pokemonResult;
      // setPokemons(pokemonResult);
    };

    callAPI();
  }, [pokemonAPIs]);

  useEffect(() => {
    const callAPI = async () => {
      const response = await fetch(`${POKEMON_API}/pokemon?offset=0&limit=905`);
      const result = await response.json();

      setPokemonAPIs(result.results.map((item: any) => item.url));
    };

    callAPI();

    const callTypesAPI = async () => {
      const response = await fetch(`${POKEMON_API}/type`);
      const result = await response.json();
      setPokemonTypes(result.results.map((item: any) => item.name));
    };

    callTypesAPI();
  }, []);

  const filterPokemon = (ptype: string) => {
    setFilteredPokemons(
      pokemons.current.filter((pokemon) => pokemon.ptypes.includes(ptype))
    );
  };

  return (
    <div className="App">
      <div className="buttons-container">
        {pokemonTypes.map((ptype, index) => (
          <button onClick={() => filterPokemon(ptype)} key={index}>
            {ptype}
          </button>
        ))}
      </div>
      <div className="pokemon-information">
        <PokemonDetail pokemon={currentPokemon} />
        <PokemonList pokemons={filteredPokemons} onClick={pokemonOnClick} />
      </div>
    </div>
  );
}

export default App;
