import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Nav from "./components/Nav";
import SignupPage from "./components/SignupPage";
import Profile from "./components/user/Profile";
import Main from "./components/Main";
import Location from "./components/Location";
import Hotel from "./components/Hotel";
import Booking from "./components/Booking";
import Reservations from "./components/Reservations";
import Login from "./components/admin/Login";
import AdminAddHotel from "./components/admin/AdminAddHotel";
import AdminHomePage from "./components/admin/AdminHomePage";
import AddRoomPage from "./components/admin/AddRoomPage ";
import AdminLocation from "./components/admin/AdminLocation";
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [location,setLocation] =  useState(null);
  
  return (
    
    <div className="">
      <Routes>
        <Route path="/" element={<Main setLocation={setLocation} loggedInUser={loggedInUser} />} />
        <Route path="/login" element={<LoginPage setLoggedInUser={setLoggedInUser} />} />
        <Route path="/signup" element={<SignupPage setLoggedInUser={setLoggedInUser} />} />
        <Route path="/location/:id/:locationName" element={<Location></Location>} />
        <Route path="/location/:id/:locationName/:hotelName/:hotelId" element={<Hotel/>} />
        {/* <Route path="/booking/:roomId" element={<Booking/>} /> */}
        <Route path="/booking/:roomId" element={<Booking/>} />
        <Route path="/reservations/:userId" element={<Reservations/>} />
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/admin/admin/06" element={<Login/>}/>
        <Route path="/admin/:id/:locationName/add-hotel" element={<AdminAddHotel/>} />
        <Route path="/admin/home" element={<AdminHomePage/>} />
        <Route path="/admin/:id/:hotelName/add-room" element={<AddRoomPage/>} />
        <Route path="/admin/:id/:locationName" element={<AdminLocation/>} />

      </Routes>
    </div>
  );
};


export default App;
