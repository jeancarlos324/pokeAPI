import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import ButtonPage from "../components/bttn/ButtonPage";
import PokemonInputType from "../components/input/PokemonInputType";
import PokemonCharacter from "../components/input/PokemonCharacter";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsSilce, setPokemonsSlice] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [typeIsActive, setTypeIsActive] = useState(false);

  const navigate = useNavigate();
  const trainer = useSelector((state) => state.userTrainer);

  let quantityPerPage = 10;
  let totalPages = Math.ceil(pokemons.length / quantityPerPage);
  let firstItemPage = numPages * quantityPerPage;
  let lastItemPage = (numPages + 1) * quantityPerPage;
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=33&offset=0`)
      .then((res) => setPokemons(res.data.results));
  }, []);

  useEffect(() => {
    setPokemonsSlice(pokemons.slice(firstItemPage, lastItemPage));
  }, [pokemons, numPages]);

  const pages = new Array(totalPages).fill(0).map((item, index) => {
    let sum = 0;
    sum = index + 1;
    return item + sum;
  });

  const dispatchTypePokemon = (e) => {
    const URL = e.target.value;
    axios.get(URL).then((res) => setPokemons(res.data.pokemon));
  };
  const searchPokemon = (name) => {
    console.log(name);
    let newURL = `https://pokeapi.co/api/v2/pokemon/${name}/`;
    let newName = name;
    const newArray = [
      {
        name: newName,
        url: newURL,
      },
    ];
    setPokemons(newArray);
  };
  return (
    <div className=" h-screen flex flex-col items-center gap-5 py-5">
      <p className="w-full bg-red-500 p-2 capitalize text-[20px] text-white">
        Wellcome
        <span className="text-slate-800 uppercase font-semibold px-2">
          {trainer}
        </span>
        here you can see all the pokemons in the world!!
      </p>
      <ButtonPage
        className="bg-red-500 px-2 rounded-xl text-white"
        onClick={() => setTypeIsActive(!typeIsActive)}
        text={typeIsActive ? "Search by Character" : "Search by Type"}
      />
      {typeIsActive ? (
        <PokemonInputType
          className=" w-[90%] md:w-1/3"
          onChange={dispatchTypePokemon}
        />
      ) : (
        <PokemonCharacter
          addPokemon={searchPokemon}
          className=" w-[90%] md:w-1/3"
        />
      )}
      <div className=" w-[90%] md:w-2/3 flex flex-col">
        <h2 className="flex justify-center uppercase font-medium text-center gap-2">
          <span>Page:</span>
          <b>{numPages + 1}</b>
        </h2>
        <div className="w-full flex justify-around">
          <ButtonPage
            text="<"
            className="button-pages"
            onClick={() =>
              numPages == 0 ? setNumPages(0) : setNumPages(numPages - 1)
            }
          />
          <button style={{ textUnderlineOffset: "2px" }}></button>
          {pages.map((button) => (
            <ButtonPage
              key={button}
              className="button-pokemon"
              text={button}
              onClick={() => setNumPages(button - 1)}
            />
          ))}
          <ButtonPage
            text=">"
            className="button-pages"
            onClick={() =>
              numPages < totalPages - 1
                ? setNumPages(numPages + 1)
                : setNumPages(totalPages - 1)
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-[80%]">
        {pokemonsSilce.map((pokemon) => (
          <Card
            key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            onClick={() =>
              navigate(
                `/pokedex/${pokemon.name ? pokemon.name : pokemon.pokemon.name}`
              )
            }
          />
        ))}
      </div>
      <div className=" w-5/6 md:w-1/2 flex flex-col">
        <div className="w-full flex justify-around">
          <ButtonPage
            text="<"
            className="button-pages"
            onClick={() =>
              numPages == 0 ? setNumPages(0) : setNumPages(numPages - 1)
            }
          />
          <button style={{ textUnderlineOffset: "2px" }}></button>
          {pages.map((button) => (
            <ButtonPage
              key={button}
              className="button-pokemon"
              text={button}
              onClick={() => setNumPages(button - 1)}
            />
          ))}
          <ButtonPage
            text=">"
            className="button-pages"
            onClick={() =>
              numPages < totalPages - 1
                ? setNumPages(numPages + 1)
                : setNumPages(totalPages - 1)
            }
          />
        </div>
        <h2 className="flex justify-center uppercase font-medium text-center gap-2">
          <span>Page:</span>
          <b>{numPages + 1}</b>
        </h2>
      </div>
    </div>
  );
};

export default Pokedex;
