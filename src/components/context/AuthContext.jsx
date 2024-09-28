import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
// import jwtDecode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) { 
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [AdminIsAuthorized, setAdminIsAuthorized] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [userdata, setUserdata] = useState({});
  const [HotelForBooking, setHotelForBooking] = useState({});
  const [RoomId, setRoomId] = useState(0);
  const [AdminLocations, setAdminLocations] = useState([]);
  const [email,setEmail]=useState('');
  // const BASE_URL = 'https://hotelbackend.up.railway.app';
  const BASE_URL = 'https://9152-45-115-255-58.ngrok-free.app';

  const value = {
    isAuthorized,
    AdminIsAuthorized,
    SignIn,
    SignOut,
    userdata,
    Signup,
    getRoom,
    HotelForBooking,
    getHeaders,
    locationData,
    AdminLocations,
    getAdminLocations,
    adminSignIn,
    BASE_URL,
    email,
    SetEmailId
  };

  function SetEmailId(id){
    setEmail(id)
  }

  function getHeaders() {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true'
      },
    };
  }
  useEffect(() => {
    fetchDataFromApi();
  }, []);
  function fetchDataFromApi() {
    // console.log(`${BASE_URL}/api/v1/locations`)
    axios
      .get(`${BASE_URL}/api/v1/locations`, {
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })
      .then((response) => {
        setLocationData(response.data);
        // console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == "") {
      return;
    }
    if (token && isTokenExpired(token)) {
      // Token is expired, perform necessary actions (e.g., logout)
      console.log("Token is expired. Perform logout or refresh token.");
      // SignOut(); // Logout the user if token is expired
    } else {
      // Token is valid or not present, continue with your component logic
      console.log("Token is valid");
      console.log(localStorage.getItem("token"));
      if(!localStorage.getItem("token")){
        return;
      }
      const decodedToken = jwtDecode(localStorage.getItem("token"));

      if (decodedToken.role === "ADMIN") {
        adminSignIn(token);
      } else {
        SignIn(token);
      }
      console.log("Token is valid or not present.");
    }
  }, []);

  async function getRoom(RoomId) {
    console.log("this is called from booking");
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/rooms/room-by-id/${RoomId}`,
        getHeaders()
      );
      setHotelForBooking(response.data);
      console.log("This is a particular room:", response.data);
    } catch (e) {
      console.error(e);
    }
  }

  function Signup(t) {
    console.log("Signed Up");
    const decodedToken = jwtDecode(t);

    // Extract user ID and firstName from decoded token
    const userObject = {
      userId: decodedToken.userId,
      firstName: decodedToken.firstName,
    };
    setUserdata(userObject);
    setIsAuthorized(true);
  }

  function adminSignIn(t) {
    console.log("admin is signed in");
    const decodedToken = jwtDecode(t);
    const adminObject = {
      userId: decodedToken.userId,
      firstName: decodedToken.firstName,
      role: decodedToken.role,
    };
    if (adminObject.role === "ADMIN") {
      console.log("its and aminnn ji");
      console.log("this is his token : ", localStorage.getItem("token"));
      setAdminIsAuthorized(true);
      setUserdata(adminObject);
      navigate("/admin/home");
    } else {
      alert("You are not authorized");
    }
  }

  function SignIn(t) {
    console.log("user Signed In");
    const decodedToken = jwtDecode(t);

    // Extract user ID and firstName from decoded token
    const userObject = {
      userId: decodedToken.userId,
      firstName: decodedToken.firstName,
      role: decodedToken.role,
    };

    console.log("its and user ji");
    console.log("this is his token : ", localStorage.getItem("token"));
    setUserdata(userObject);
    setIsAuthorized(true);
  }

  function SignOut() {
    console.log("Signed Out");
    localStorage.setItem("token", "");
    setIsAuthorized(false);
    // You may want to clear user data and redirect to the login page after signing out
  }

  function isTokenExpired(token) {
    const decodedToken = jwtDecode(token);
    console.log("this is ", decodedToken.exp * 1000 < Date.now());
    return decodedToken.exp * 1000 < Date.now(); // Check if the token has expired
  }

  async function getAdminLocations() {
    const headers = getHeaders();
    try {
      console.log("in getLocation");
      const response = await axios.get(
        `${BASE_URL}/api/v1/admin/All-location`,
        headers
      );
      setAdminLocations(response.data);
      console.log("this is the all locations here ", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
