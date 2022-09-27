import axios from "axios";
import React, { useEffect, useState } from "react";
import ChipInfo from "./Chips/ChipInfo";
import dataColors from "../data/dataColors.json";

const Card = ({ url, style,onClick }) => {
  const [data, setData] = useState([]);
  const [color, setColor] = useState([]);
  useEffect(() => {
    axios.get(url).then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    newColor();
  }, [data]);

  const newColor = () => {
    const typeColor = data.types?.map((types) => {
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
  return (
    <div
      className="flex flex-col items-center rounded-lg drop-shadow-xl"
      style={{
        background: `linear-gradient(315deg, ${color?.[0]} 47%, ${color?.[1]} 100%)`,
        color: `${color?.[0]}`,
      }}
      onClick={onClick}
    >
      <div className="relative flex h-[150px] w-full justify-center ">
        <div className="h-[200px] w-[200px] absolute">
          <img
            className="h-full w-full absolute  brightness-0 left-1 top-1"
            src={data.sprites?.other["official-artwork"].front_default}
            alt={data.sprites?.other["official-artwork"].front_default}
          />
          <img
            className="h-full w-full absolute"
            src={data.sprites?.other["official-artwork"].front_default}
            alt={data.sprites?.other["official-artwork"].front_default}
          />
        </div>
      </div>
      <div className="flex flex-col w-[98%] mb-1 rounded-b-lg  bg-white items-center pt-14 ">
        <h2 className="uppercase text-[22px] font-bold">{data.name}</h2>
        <div className="uppercase text-center ">
          <h3 className="text-[14px] text-slate-700">type</h3>
          <div className="flex gap-2">
            {data.types?.map((type,index) => (
              <span className="text-[16px] font-semibold" key={type.type.name} style={{color:`${color?.[index]}`}}>
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 grow w-full p-5">
          {data.stats?.map((stat) => (
            <ChipInfo
              className="flex flex-col"
              key={stat.stat.name}
              title={stat.stat.name}
              content={stat.base_stat}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
