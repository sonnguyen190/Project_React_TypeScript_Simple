import React from "react";
import { Pokemon } from "../interface";

interface Props {
  pokemons: Pokemon[];
}
const PokeCollections: React.FC<Props> = (props) => {
  const { pokemons } = props;
  return (
    <div>
      {pokemons.map((poke) => (
        <>
          <img src={poke.sprites.front_default}></img>
          <span>{poke.name}</span>
        </>
      ))}
    </div>
  );
};

export default PokeCollections;
