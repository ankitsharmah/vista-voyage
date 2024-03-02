import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const SignupPage = ({ setLoggedInUser }) => {
  const auth = useAuth();
  
  const navigate = useNavigate();
  const [gotData, setGotData] = useState({});

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  });

  const [confPass, setConfPass] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function confirm(e) {
    setConfPass(e.target.value);
  }

  const saving = async () => {
    if (formData.password === confPass) {
      try {
        // setLoading(true);
    
        // Wait for the response from the server
        const response = await axios.post("http://localhost:9191/api/v1/auth/register", formData);
    
        localStorage.setItem('token', response.data.token);
        console.log("this is signup")
        console.log("this is token : ",response.data.token)

        auth.SignIn(response.data.token);
        navigate('/')
  
        // fetchData();
   
      } catch (error) {
        console.error("Error:", error);
        alert("choose another email id its already in use!!");
      } finally {
        // setLoading(false);
      }
    } else {
      alert("Password did not match");
      return;
    }
   
  };
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:9191/api/v3/user/get-by-id/21", getHeaders());
  //     console.log("Authenticated API response:", response.data);
  //     setGotData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    saving();
    console.log('Form cons:', confPass);
  };


  return (
    <>
      <div className="bg h-screen   w-full  flex justify-center items-center">
        <div className=" flex  trans h-max w-[90%] md:w-[30%] items-center flex-col justify-center  ">
          <h1 className="text-3xl font-semibold text-white pt-3 md:pb-4">
            Create Account
          </h1>
          <form
            action="submit"
            onSubmit={handleSubmit}
            className=" h-full w-full flex flex-col items-center py-[10px] md:py-[20px] gap-[.4rem] md:gap-3"
          >
          <div className="flex gap-1 w-[95%] md:w-[70%]">
          <div className="w-[70%] ">
              <p className="text-white text-sm md:text-base pb-1">enter First name </p>
              <input
                type="text"
                name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
                className="transition-all text-white text-sm duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md bg-white/20 p-1  md:p-2 border-transparent focus:border-blue-500 border-b-2"                placeholder="enter your name"
              />
            </div>
            <div className="w-[70%] ">
              <p className="text-white text-sm md:text-base pb-1">enter Last name </p>
              <input
                type="text"
                name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
                className="transition-all text-white text-sm duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md bg-white/20 p-1 md:p-2 border-transparent focus:border-blue-500 border-b-2"                placeholder="enter your name"
              />
            </div>
          </div>

            <div className="md:w-[70%] w-[95%] ">

              <p className="text-white text-sm md:text-base pb-1">enter gmail :</p>

              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                className="transition-all text-sm text-white duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md bg-white/20 p-1 md:p-2 border-transparent focus:border-blue-500 border-b-2"
                placeholder="enter gmail Id"
              />
            </div>
            <div className="md:w-[70%] w-[95%]  ">
              <p className="text-white text-sm md:text-base pb-1">enter password :</p>
              <input
                type="password"
              
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                className="transition-all text-sm text-white duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md bg-white/20 p-1 md:p-2 border-transparent focus:border-blue-500 border-b-2"
                placeholder="enter passsword"
              />
            </div>
            <div className="md:w-[70%] w-[95%] ">
              <p className="text-white text-sm md:text-base pb-1">confirm password :</p>
              <input
                type="password"
                onChange={(e)=>confirm(e)}

                className="transition-all text-sm text-white duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md bg-white/20 p-1 md:p-2 border-transparent focus:border-blue-500 border-b-2"
                placeholder="confirm password"
              />
            </div>
            <div className="flex justify-center items-center md:text-base text-xs gap-4">
              <NavLink to={"/login"} className={"text-white"}>
                have an <span className="text-yellow-400"> Account?</span>
              </NavLink>

              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-semibold md:font-bold p-1 md:py-2 md:px-4 rounded text-sm md:text-base focus:outline-none focus:shadow-outline-blue"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
