import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import PokeCollections from "./components/PokeCollections";
import { Pokemon } from "./interface";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./redux/action/action";

export interface Pokemons {
  name: string;
  url: string;
}
const App: React.FC = () => {
  const dispatch = useDispatch();

  const [Pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextPages, setNextPages] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
    let res = await axios.get(nextPages);
    setNextPages(res.data.next);
    setIsLoading(false);
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
          {isLoading == true ? <div>Loading.....</div> : <></>}
          <button onClick={nextPageOnclick}>Load more</button>
        </div>
      </div>
      <div>asdjashdjasdasdasdkhksdhk</div>
      <button
        style={{ fontSize: "50px" }}
        onClick={() => dispatch(increment(5))}
      >
        +
      </button>
      <button
        style={{ fontSize: "50px" }}
        onClick={() => dispatch(decrement(5))}
      >
        -
      </button>
    </div>
  );
};

export default App;
