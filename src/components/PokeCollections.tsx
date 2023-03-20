import { Pokemon } from "../interface";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface Props {
  pokemons: Pokemon[];
}
interface Number1 {
  counterReducer: number;
}
const PokeCollections: React.FC<Props> = (props) => {
  const [number, setNumber] = useState<number>();
  const counter: Number1 = useSelector((state: Number1) => state);

  const { pokemons } = props;
  return (
    <div>
      {pokemons.map((poke) => (
        <div className="item_poke">
          <img src={poke.sprites.front_default}></img>
          <div className="name">{poke.name}</div>
        </div>
      ))}
      <div style={{ fontSize: "50px" }}>{counter.counterReducer}</div>
    </div>
  );
};

export default PokeCollections;
