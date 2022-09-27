import React from "react";
import { motion } from "framer-motion";
const ButtonPage = ({text, className,onClick,disabled,style}) => {
  return (
    <motion.button
      className={`${className}`}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      disabled={disabled}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={style}
    >
      {text}
    </motion.button>
  );
};

export default ButtonPage;
