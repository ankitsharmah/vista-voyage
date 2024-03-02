import React from "react";
import demo1 from "../assests/demo1.jpg";
import  cofee from "../assests/Waiters-bro.png";
// import Nav from "./Nav";


const UserMain = () => {
  const what = true;
  return (
    <>
      <div>
      {/* <Nav /> */}
   
        <div className=" ">
          <img src={demo1} alt="" className="h-screen w-full  object-cover " />
          <div className="absolute rounded-lg top-[40%] left-[3%] sm:top-[40%] sm:left-[15%]  text-white backdrop-blur-[7px] space-y-2 text-4xl">
              <p> <span className="font-semibold text-4xl sm:text-6xl">Elevate</span> <span  className=" text-xl sm:text-3xl">Your Experience</span></p>
              <p className="font-semibold sm:text-4xl">Find,</p>
              <p className="font-semibold sm:text-5xl">Book,</p>
              <p className="font-semibold sm:text-6xl"> and  Enjoy</p>
          </div>
          
        </div>
   
        <div className=" ">
          <img src={cofee} alt="" className="h-[] w-full object-cover " />
         
          
        </div>



      </div>
    </>
  );
};

export default UserMain;
