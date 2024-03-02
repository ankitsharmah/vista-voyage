import React from "react";
import demo1 from "./assests/demo1.jpg";
// import cofee from "./assests/hotel_staff_05.jpg";
import shuttle from "./assests/shuttle.png";
import hotel from "./assests/hotel.png";
import guide from "./assests/tour-guide.png";
import trip from "./assests/hot-air-balloon.png";
import Sec from "./assests/sec-icon.png";
import service from "./assests/hotel_staff_05.jpg";
import { GiFairyWings } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { GrStorage } from "react-icons/gr";
import ServiceHeader from "./common/ServiceHeader";
import ServiceCard from "./common/ServiceCard";
const Home = () => {
  return (
    <>
      <div className="">
        <img src={demo1} alt="" className="h-screen w-full  object-cover " />
        <div className="absolute rounded-lg top-[40%] left-[14.5%] p-2 md:p-7 sm:top-[40%] sm:left-[15%]  text-white backdrop-blur-[7px]  md:space-y-2  text-4xl">
          <p>
            {" "}
            <span className="font-semibold text-4xl sm:text-6xl">
              Elevate
            </span>{" "}
            <span className=" text-xl sm:text-3xl">Your Experience</span>
          </p>
          <p className="font-semibold sm:text-4xl">Find,</p>
          <p className="font-semibold sm:text-5xl">Book,</p>
          <p className="font-semibold sm:text-6xl"> <span className="text-2xl md:text-4xl  font-medium">and</span> Enjoy</p>
        </div>
      </div>

      <div className="flex flex-col items-center md:h-[60vh] w-full justify-around h ">
        <h1></h1>
        <div
          className=" w-full mdfl md:w-[70%]   h-[max-content] flex flex-col md:flex-row items-center justify-around object-cover "
          id="service"
        >
          <ServiceHeader imgSrc={shuttle} title={"Flight Tickets"} number="01"/>
          <ServiceHeader imgSrc={hotel} title={"Hotel Bookings"} number="02" />
          <ServiceHeader imgSrc={guide} title={"Travel guide"} number="03" />
          <ServiceHeader imgSrc={trip} title={"Trip Activities"} number="04" />
        </div>
      </div>

      <div className=" max-h-max md:h-screen  w-full gap-4 md:gap-7 bg-fuchsia-200/30 flex  flex-col items-center justify-center ">

        <div className="w-[80%] md:w-[30%] mt-4 md:mt-0 flex flex-col gap-1 md:gap-5 items-center outline outline-1 u outline-black/20 rounded-lg">
          <p className="text-[#FE5F5B] text-sm md:rext-base mt-1">why choose me</p>
          <h1 className="text-xl md:text-4xl font-semibold text-black/90">
            we provide service
          </h1>
          <img src={Sec} alt="" className="w-[4rem] md:w-[6rem]" />
          <p className="text-center text-xs md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            amet consectetur adipisicing elit. Aliquid, ea maxime? Architecto
            aperiam.
          </p>
        </div>

        <div className=" max-h-max flex flex-col md:flex-row gap-2 items-center md:justify-around   ">
          <img
            src={service}
            alt=""
            className="w-[97%] md:w-[40%] object-contain outline outline-1 outline-black/20 rounded-lg"
          />

          <div className=" md:w-[40%] w-[90%] flex gap-4 md:gap-4 flex-col justify-center items-center md:justify-around ">
            <div className="w-[100%]  flex flex-col md:flex-row gap-4 ">
              <div className="flex outline d outline-1 outline-black/20 rounded-lg  md:w-[40%] p-3 gap-4">
                <GiFairyWings className="text-red-600 text-6xl " />
                <ServiceCard value="Quality Service" />
              </div>

              <div className="flex outline d outline-1 outline-black/20 rounded-lg  md:w-[40%] p-3 gap-4">
                <FaCheck className="text-red-600  text-6xl" />
                <ServiceCard value="Stay Safe" />
              </div>
            </div>

            <div className="w-[100%] flex flex-col md:flex-row gap-4 ">
              <div className="flex outline d outline-1 outline-black/20 rounded-lg  md:w-[40%] p-3 gap-4">
                <FaWifi className="text-red-600  text-6xl" />
                <ServiceCard value="Free Wifi" />
              </div>

              <div className="flex outline d outline-1 outline-black/20 rounded-lg  md:w-[40%] p-3 gap-4">
                <GrStorage className="text-red-600  text-6xl" />
                <ServiceCard value="Save Money" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
