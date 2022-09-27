import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeName } from "../store/slice/userTrainer.slice";
import { motion } from "framer-motion";
import pokemon from "../assets/Pokemon 2.svg"
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const dispatchUserName = () => {
    dispatch(changeName(userName));
    navigate("/pokedex");
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-10">
      <div className="w-1/2 animation-frame">
        <img src={pokemon} alt="" />
      </div>
      <div className="flex gap-2 w-1/2">
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
  );
};

export default Home;
