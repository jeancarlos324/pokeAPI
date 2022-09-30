import React from "react";
import "../styles/loading-screen.css";
const LoadingScreen = () => {
  return (
    <div className="overlay absolute w-screen h-screen">
      <div className="center-on-page">
        <div className="pokeball">
          <div className="pokeball__button"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
