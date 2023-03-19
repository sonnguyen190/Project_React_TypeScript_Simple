import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import PokeCollections from "./components/PokeCollections";
import { Pokemon } from "./interface";

export interface Pokemons {
  name: string;
  url: string;
}
const App: React.FC = () => {
  const [Pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextPages, setNextPages] = useState<string>("");

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextPages(res.data.next);
      res.data.results.forEach(async (poke: Pokemons) => {
        const pokemon = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${poke.name}`
        );
        setPokemons((p) => [...p, pokemon.data]);
      });
    };
    getPokemon();
  }, []);
  const nextPageOnclick = async () => {
    let res = await axios.get(nextPages);
    setNextPages(res.data.next);
    res.data.results.forEach(async (poke: Pokemons) => {
      const pokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${poke.name}`
      );
      setPokemons((p) => [...p, pokemon.data]);
    });
  };
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header"> Pokemon</header>
        <PokeCollections pokemons={Pokemons}></PokeCollections>
        <div>
          <button onClick={nextPageOnclick}>Load more</button>
        </div>
      </div>
    </div>
  );
};

export default App;
