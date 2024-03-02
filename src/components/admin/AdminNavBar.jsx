import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userr from "../assests/user.png";
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegCircleUser } from 'react-icons/fa6';

const AdminNavBar = () => {
  const auth = useAuth();
  const isAuthorized = auth.AdminIsAuthorized;
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <nav className="bg-[#ffc336f7] z-30 p-4 sticky top-0  w-full backdrop-filter backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <div>
          <NavLink to="/admin/home" className="text-black/80 text-lg font-bold" activeClassName="underline">Admin Dashboard</NavLink>
        </div>
       {
        isAuthorized ?     
         <div className="   block   rounded ">
        <button
              onClick={() => setIsOpen2((prev) => !prev)}
              className="t flex items-center"
            >
              <GiHamburgerMenu className="md:hidden block " />
              <FaRegCircleUser className="text-2xl mr-2 md:block hidden" />
              <span className="capitalize  hidden lg:inline-block">
                {auth.userdata.firstName}
              </span>
            </button>
            
                  {isOpen2 && <ul className="flex absolute top-12 p-4 right-2 rounded-md
                  outline-gray-300 outline bg-white flex-col items-center gap-3 ">
                    <NavLink to={"/profile"} className={"text-black flex "}>
                      <img src={userr} alt="" className="mr-1" />
                      <p>{auth.userdata.firstName}</p>
                    </NavLink>

                

                    <li className=" text-center bg-red-600 w-[100%] rounded-md text-white">
                      <NavLink to={"/"} onClick={auth.SignOut}>
                        Log out
                      </NavLink>
                    </li>
                  </ul>}
                </div>:
        <NavLink to={"/login"} className={"text-white hover:underline"}>
                Login
              </NavLink>
       }
      </div>
    </nav>
  );
};

export default AdminNavBar;

         