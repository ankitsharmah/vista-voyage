import React, { useState } from "react";
import Home from "./Home";
import Nav from "./Nav";
// import SecondHeaderCards from "./common/secondHeaderCards";


const Main = ({ loggedInUser, setLocation }) => {
  return (
    <>
      <div id="home" className="h-screen w-full">
        <Nav
          SignedIn={loggedInUser ? loggedInUser : null}
          setLocation={setLocation}
        />
        <Home/>
      </div>
    </>
  );
};

export default Main;
