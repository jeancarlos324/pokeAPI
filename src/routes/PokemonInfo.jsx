import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dataColors from "../data/dataColors.json";
import question from "../assets/Signo.svg";
import destello from "../assets/destello3.png";
import ChipInfo from "../components/Chips/ChipInfo";
import { motion } from "framer-motion";
const PokemonInfo = () => {
  const [character, setCharacter] = useState([]);
  const [color, setColor] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const params = useParams();
  useEffect(() => {
    let newURL = `https://pokeapi.co/api/v2/pokemon/${params.id}/`;
    axios.get(newURL).then((res) => setCharacter(res.data));
  }, []);

  const newColor = () => {
    const typeColor = character.types?.map((types) => {
      return dataColors
        .filter((type) => type.name == types.type.name)
        .map((item) => item.color)
        .toString();
    });
    if (typeColor?.length === 1) {
      let newTypeColor = [typeColor.toString().concat("cc")];
      setColor(newTypeColor.concat(typeColor.toString().concat("33")));
    } else {
      setColor(typeColor);
    }
  };
  console.log(character);
  return (
    <div
      className="h-screen w-screen flex  md:flex-row justify-start md:justify-center flex-wrap-reverse bg-gradient-to-r from-yellow-400 to-orange-600"
      style={{
        background: `linear-gradient(45deg, ${color?.[0]} 47%, ${color?.[1]} 100%)`,
      }}
    >
      <div className="flex flex-col items-center w-full md:w-3/5 bg-white">
        <h1
          className="text-[60px] uppercase text-slate-200"
          style={{
            color: `${color?.[0]}`,
          }}
        >
          {character.name}
        </h1>
        <div className="flex justify-around w-full">
          <span className="text-[25px] flex flex-col uppercase items-center bg-slate-200 p-1 rounded-lg">
            <b className="text-[12px]">Heigth</b>
            {character.height}
          </span>
          <span className="text-[25px] flex flex-col uppercase items-center bg-slate-200 p-1 rounded-lg">
            <b className="text-[12px]">Weigth</b>
            {character.weight}
          </span>
        </div>
        <div className="flex justify-around w-full">
          <div className="flex flex-col items-center gap-4 w-1/2">
            <h3 className="text-2xl">Types</h3>
            <div className="flex justify-around w-full">
              {character.types?.map((type) => (
                <motion.div
                  className="bg-red-500 px-10 rounded-lg text-[20px] text-white"
                  key={type.slot}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {type.type.name}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 w-1/2 ">
            <h3 className="text-2xl">Abilities</h3>
            <div className="flex justify-around w-full">
              {character.abilities?.map((ability) => (
                <motion.div
                  className="bg-blue-500 px-10  rounded-lg text-[20px] text-white"
                  key={ability.ability.url}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {ability.ability.name}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <h3 className="text-2xl">Stats</h3>
        <div className="grid grid-cols-3 grow w-[90%] p-5 bg-slate-200 rounded-3xl">
          {character.stats?.map((stat) => (
            <ChipInfo
              className="flex flex-col"
              key={stat.stat.name}
              title={stat.stat.name}
              content={stat.base_stat}
            />
          ))}
        </div>
        <h3 className="text-2xl">Movements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-y-auto h-[200px] w-full md:w-[90%]">
          {character.moves?.map((move) => (
            <motion.div
              className="cursor-pointer rounded-lg text-white uppercase"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={move.move.url}
              style={{
                background: `linear-gradient(270deg, ${color?.[0]} 47%, ${color?.[1]} 100%)`,
              }}
            >
              <ChipInfo className="flex flex-col  " content={move.move.name} />
            </motion.div>
          ))}
        </div>
      </div>
      <div className=" flex flex-col items-center relative w-full md:w-2/5  justify-center  md:h-full">
        <div
          className=" absolute h-[100px] w-[100px]  z-20"
          onClick={() => {
            setIsActive(!isActive);
            newColor();
          }}
          style={{ display: `${isActive ? "none" : "block"}` }}
        >
          <img src={question} alt={question} className="animation-frame" />
        </div>
        {!isActive && (
          <div className=" absolute h-[350px] w-[350px] ">
            <img src={destello} alt={destello} className="portal " />
          </div>
        )}
        <div className=" h-[300px] w-[300px] z-10">
          {isActive ? (
            <img
              className="h-full w-full  "
              src={character.sprites?.other["official-artwork"].front_default}
              alt={character.sprites?.other["official-artwork"].front_default}
            />
          ) : (
            <img
              className="h-full w-full brightness-0 animation-frame "
              src={character.sprites?.other["official-artwork"].front_default}
              alt={character.sprites?.other["official-artwork"].front_default}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonInfo;
