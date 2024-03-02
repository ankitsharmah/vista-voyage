import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import napStay from "./assests/vista-high-resolution-logo-white-transparent.png";
import axios from "axios";
import { FaRegCircleUser } from "react-icons/fa6";
import booking from "./assests/booking.png";
import userr from "./assests/user.png";
import setting from "./assests/gear.png";
import { useAuth } from "./context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import Location from "./common/Location";

// import './Nav.css'; // Import a CSS file for additional styles

const Nav = () => {
  // const whichIS=useState(true);
  const auth = useAuth();
  const locationData = auth.locationData;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [notLoggedIn, setnotLoggedIn] = useState(false);
  return (
    <div className="w-full fixed z-20 top-0 left-0  bg-[#1e2a588e] h-[2.7rem]  flex justify-center  backdrop-opacity-50 backdrop-filter backdrop-blur-md md:h-[4rem] ">
      <div className="w-[90%] h-full  flex justify-between items-center object-cover ">
       <NavLink to={"/"}> <img
          src={napStay}
          alt=""
          className=" h-[2rem] sm:h-[3rem] sm: object-cover"
        />
</NavLink>
        <div className="hidden md:flex  gap-4 mid-menu ">
          <NavLink className={"text-white h-full hover:underline"} to={"/"}>
            Home
          </NavLink>

          <div className="relative h-full">
            <NavLink
              onClick={() => setIsOpen((prev) => !prev)}
              className={"text-white h-full hover:underline"}
            >
              Location
            </NavLink>
            {isOpen && (
              <div className="absolute l  top-full left-[3px] w-32 p-4 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded shadow-md overflow-y-auto max-h-[10rem]">
                {locationData
                  .slice() // Shallow copy of the array
                  .sort((a, b) =>
                    a.locationName.localeCompare(b.locationName, undefined, {
                      sensitivity: "base",
                    })
                  ) // Sort alphabetically
                  .map((location) => (
                    <NavLink
                      className="block py-1 text-gray-700 no-underline capitalize hover:bg-gray-200"
                      key={location.locationId}
                      to={`/location/${location.locationId}/${location.locationName}`}
                    >
                      {location.locationName}
                    </NavLink>
                  ))}
              </div>
            )}
          </div>
          <a href="#service" className="text-white hover:underline">
            Service
          </a>
          <NavLink className={"text-white hover:underline"}>Contact</NavLink>
          
        </div>

        {auth.isAuthorized ? (
          <div>
            <button
              onClick={() => setIsOpen2((prev) => !prev)}
              className="text-white flex items-center"
            >
              <GiHamburgerMenu className="md:hidden block " />
              <FaRegCircleUser className="text-2xl mr-2 md:block hidden" />
              <span className="capitalize hidden lg:inline-block">
                {auth.userdata.firstName}
              </span>
            </button>

            {isOpen2 && (
              <>
                <div className=" bg-white  block md:hidden  absolute top-10 max-h-max right-0 p-4 rounded shadow-md">
                  <ul className="flex flex-col items-center gap-3 ">
                    <NavLink to={"/profile"} className={"text-black flex "}>
                      <img src={userr} alt="" className="mr-1" />
                      <p className="capitalize">{auth.userdata.firstName}</p>
                    </NavLink>

                    <NavLink
                      className={"text-wh h-full hover:underline text-black"}
                      to={"/"}
                    >
                      Home
                    </NavLink>

                    <div className="relative  h-full">
                      <NavLink
                        onClick={() => setIsOpen((prev) => !prev)}
                        className={"text-wh h-full hover:underline text-black"}
                      >
                        Location
                      </NavLink>

                      {isOpen && (
                        <div className="absolute  right-[100%] w-32 p-4 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded shadow-md overflow-y-auto max-h-[10rem]">
                          {locationData
                            .slice() // Shallow copy of the array
                            .sort((a, b) =>
                              a.locationName.localeCompare(
                                b.locationName,
                                undefined,
                                { sensitivity: "base" }
                              )
                            ) // Sort alphabetically
                            .map((location) => (
                              <NavLink
                                className="block py-1 text-gray-700 no-underline capitalize hover:bg-gray-200"
                                key={location.locationId}
                                to={`/location/${location.locationId}/${location.locationName}`}
                              >
                                {location.locationName}
                              </NavLink>
                            ))}
                        </div>
                      )}
                    </div>

                    <a href="#service" className="hover:underline text-black">
                      Service
                    </a>
                    <NavLink className={" hover:underline text-black"}>
                      Contact
                    </NavLink>

                    <NavLink
                      to={`/reservations/${auth.userdata.userId}`}
                      className={"text-black flex "}
                    >
                      <img src={booking} alt="" className="mr-1" />
                      <p>Bookings</p>
                    </NavLink>

                    <li className=" text-center bg-red-600 w-[100%] rounded-md text-white">
                      <NavLink to={"/"} onClick={auth.SignOut}>
                        Log out
                      </NavLink>
                    </li>
                  </ul>
                </div>

                <div className=" bg-white hidden md:block absolute top-14 right-[40px] p-4 rounded shadow-md">
                  <ul className="flex flex-col items-center gap-3 ">
                    <NavLink to={"/profile"} className={"text-black flex "}>
                      <img src={userr} alt="" className="mr-1" />
                      <p>{auth.userdata.firstName}</p>
                    </NavLink>

                    <NavLink
                      to={`/reservations/${auth.userdata.userId}`}
                      className={"text-black flex "}
                    >
                      <img src={booking} alt="" className="mr-1" />
                      <p>Bookings</p>
                    </NavLink>
                    {/* {
                      auth.AdminIsAuthorized ? <NavLink to={"/admin/home"}>
                            AdminDashboard
                      </NavLink>:""
                    } */}
                    <li className=" text-center bg-red-600 w-[100%] rounded-md text-white">
                      <NavLink to={"/"} onClick={auth.SignOut}>
                        Log out
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="md:hidden block">
              <button onClick={() => setnotLoggedIn((prev) => !prev)}>
                <GiHamburgerMenu className="md:hidden block text-white" />
              </button>
              {notLoggedIn && (
                <div className="bg-white/50 md:hidden  absolute top-10 max-h-max right-0 p-3 gap-2  rounded shadow-md flex flex-col">
                  <NavLink
                    to={"/login"}
                    className={"text-black font-semibold  hover:underline"}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={"/signup"}
                    className={"text-black font-semibold hover:underline"}
                  >
                    Sign Up
                  </NavLink>
                </div>
              )}
            </div>

            <div className="md:block hidden md:space-x-4">
              <NavLink to={"/login"} className={"text-white hover:underline"}>
                Login
              </NavLink>
              <NavLink to={"/signup"} className={"text-white hover:underline"}>
                Sign Up
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
