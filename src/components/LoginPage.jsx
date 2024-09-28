import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
const LoginPage = () => {
  const navigate = useNavigate(); // Declare useNavigate hook here
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const auth = useAuth();
  const [isLoading,setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:9191/api/v1/auth/authentication`,
  //     );
  //     console.log(response.data);
  //     setIsLoading(false)
  //     auth.SignIn(response.data);
  //     navigate('/')
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  
const axiosInstance = axios.create({
  baseURL: auth.BASE_URL,
});

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted:", formData);
  setIsLoading(true);

  try {
    console.log("this is : ",localStorage.getItem('token'))
    const response = await axiosInstance.post("/api/v1/auth/authentication", formData);
    localStorage.setItem('token', response.data.token);

    if (response.data!=null) {
      // Handle successful login
      setIsLoading(false)
      auth.SignIn(response.data.token);
      // auth.SignIn(response.data.user);
      navigate('/');
    } else {
      // Handle authentication failure
      alert("Authentication failed. Please check your credentials.");
    }
  } catch (error) {
    // Handle other errors, e.g., network issues
    console.error("Error:", error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <div className="bg h-screen  w-full  flex justify-center items-center ">
        {isLoading ? (
          <div class="">
          <h1 className="text-3xl text-white">Loading...</h1>
          </div>
        ) : (
          <div className=" flex  trans h-max p-2 md:py-5 w-[90%] md:w-[30%] items-center justify-center  ">
          <NavLink className={"text-white text-ForgetPassword h-13 w-8  text-2xl  absolute top-0 left-[90%]"} to={"/"}>&times;</NavLink>
            
            <form
              action=""
              onSubmit={handleSubmit}
              className=" h-full w-full flex flex-col items-center p-2 md:py-[20px] px-1 gap-3"
            >
              <div className=" md:w-[70%] ">
                <p className="opacity-70 text-md text-white">enter your id :</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="transition-all duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md bg-white/20 p-2 md:p-4 border-transparent focus:border-blue-500 border-b-2"
                  placeholder="enter your gmail"
                />
              </div>
              <div className="md:w-[70%] ">
                <p className="opacity-70 text-md text-white">
                   password :  <NavLink to={formData.email.includes("@yahoo.com") || formData.email.includes("@gmail.com") ? "/user/forgetpassword":''} onClick={()=>{auth.SetEmailId(formData.email)}} className={"text-[white]  md:text-sm md:ml-[5.3rem] ml-[7rem] font-bold text-xs"}>
                  forget password ?
                </NavLink>
                </p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="transition-all duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md bg-white/20 p-2 md:p-4 border-transparent focus:border-blue-500 border-b-2"
                  placeholder="enter password"
                />
              
               

              </div>

              <div className="flex justify-center items-center gap-4">
                <NavLink to={"/signup"} className={"text-yellow-400"}>
                  signup
                </NavLink>

                <button
                  type="submit"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-semibold md:font-bold p-1 md:py-2 md:px-4 rounded text-sm md:text-base focus:outline-none focus:shadow-outline-blue"
                >
                  Submit
                </button>
              </div>
              <NavLink to={"/admin/admin/06"} className={"text-yellow-200 cursor-pointer hover:text-yellow-400"}>Login as Admin</NavLink>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
export default LoginPage;
