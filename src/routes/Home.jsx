import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeName } from "../store/slice/userTrainer.slice";
import { motion } from "framer-motion";
import pokemon from "../assets/Pokemon 2.svg";
import bgFront from "../assets/background.jpg";
import characters from "../data/characters.json";
import ButtonPage from "../components/bttn/ButtonPage";
import { changeAvatar } from "../store/slice/avatar.slice";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newAvatar, setNewAvatar] = useState([]);
  const [userName, setUserName] = useState("");
  const [numPages, setNumPages] = useState(0);

  let quantityPerPage = 1;
  let totalPages = Math.ceil(characters.length / quantityPerPage);
  let firstItemPage = numPages * quantityPerPage;
  let lastItemPage = (numPages + 1) * quantityPerPage;
  useEffect(() => {
    setNewAvatares();
  }, [numPages]);
  const setNewAvatares = () => {
    setNewAvatar(characters.slice(firstItemPage, lastItemPage));
  };
  const dispatchUserName = () => {
    dispatch(changeName(userName));
    navigate("/pokedex");
  };

  console.log(newAvatar);
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-yellow-400 to-red-500">
      <div className=" w-full md:w-3/5  h-full flex flex-col items-center justify-center gap-5">
        <div className="w-[90%] md:w-2/3">
          <img src={pokemon} alt="" className="animation-frame" />
        </div>
        <h2 className=" capitalize text-white text-[30px] ">Choose your Avatar</h2>
        <span>Click Avatar</span>
        <div className="flex gap-5 items-center h-1/4">
          <ButtonPage
            text="<"
            className="text-white text-[70px] h-[30%]"
            onClick={() =>
              numPages == 0 ? setNumPages(0) : setNumPages(numPages - 1)
            }
          />
          <div className="h-full">
            {newAvatar.map((character) => (
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                key={character.id}
                className="w-[200px] h-[200px]"
                onClick={()=> dispatch(changeAvatar(character.image))}
              >
                <img
                  src={character.image}
                  className=" object-cover w-full h-full border-2 rounded-xl"
                  alt={character.image}
                />
              </motion.div>
            ))}
          </div>
          <ButtonPage
            text=">"
            className="text-white text-[70px] h-[30%]"
            onClick={() =>
              numPages < totalPages - 1
                ? setNumPages(numPages + 1)
                : setNumPages(totalPages - 1)
            }
          />
        </div>
        <h2 className="capitalize text-white text-[30px] ">Write your Name</h2>
        <div className="flex gap-2 w-[90%] md:w-2/3">
          <input
            type="text"
            className="bg-slate-200 grow border-2 border-slate-700 rounded-2xl"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Write your name, pokemon trainer"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className=" bg-red-500 text-white p-2 rounded-xl w-1/5"
            onClick={dispatchUserName}
          >
            Send
          </motion.button>
        </div>
      </div>
      <div className="hidden w-0 md:flex md:w-2/5 h-full">
        <img src={bgFront} alt="" className="h-full w-full" />
      </div>
    </div>
  );
};

export default Home;
