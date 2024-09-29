// Hotel.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import Nav from './Nav';
import { FaStar } from 'react-icons/fa6';
import { useAuth } from './context/AuthContext';



const Hotel = () => {
  const { hotelId } = useParams();
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${auth.BASE_URL}/api/v1/hotels/hotel-by-id/${hotelId}`,{
        headers: {
          'zrok-skip-browser-warning': 'true'
      }
      });
      console.log("this is response data of hotel by id : ",response.data,{
       
    });
      setHotelData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after hotel data is loaded (success or error)
    }
  };

  function passingRoomId(roomId) {
    auth.getRoom(roomId);
  }

  return (
    <div className="container  p-2">
      <Nav></Nav>
      {hotelData ? (
        <>
          <div className="flex mt-16  mb-8">
            {loading &&     <div className='w-full h-screen flex justify-center items-center'>
          
          <div class="box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
                    
          </div>}
          <div className='block md:flex '>
          <div className='bg-red-200 w-80 h-56 object-cover  rounded-md mr-8 '>
          <img
              src={hotelData.imageUrl}
              alt={hotelData.hotelName}
              className={`w-80 h-56 object-cover  rounded-md mr-8  ${loading ? 'hidden' : ''}`}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </div>
            <div>
              <h1 className="text-2xl md:text-4xl mt-1 md:mt-0  font-bold mb-2">{hotelData.hotelName}</h1>
              <p className="text-gray-600">{hotelData.address}</p>
              <p className="text-sm flex text-gray-600 items-center">
                Rating: {hotelData.rating} <span className='flex justify-center pl-1 items-center text-yellow-500/80'><FaStar /></span>
              </p>
            </div>
          </div>
          
          </div>

          <h2 className="text-3xl font-bold mb-4">Rooms</h2>

          {hotelData.rooms.map((room) => (
            <div key={room.roomId} className="mb-4 md:mb-8 p-1 md:p-6 bg-white rounded-md max-h-max shadow-md flex">
              <div className="bg-red-200 min-w-[50%] md:min-w-48 h-28 md:h-32 rounded-md md:mr-4  mr-2 overflow-hidden">
                {loading && <div className="custom-loader"></div>}
                <img
                  src={room.imageUrl}
                  alt={room.description}
                  className={` h-full w-full object-cover ${loading ? 'hidden' : ''}`}
                  onLoad={() => setLoading(false)}
                  onError={() => setLoading(false)}
                />
              </div>
              <div>
                <h3 className="text-md md:text-2xl font-semibold mb-1 md:mb-2">{room.description}</h3>
                <p className="text-gray-600 mb-1 text-xs md:text-sm">Room Type: {room.roomType}</p>
                <p className="text-gray-600 text-sm md:text-base ">Price: ${room.price}</p>
                <NavLink to={`/booking/${room.roomId}`} onClick={() => { passingRoomId(room.roomId) }} className="text-blue-500 hover:underline">
                  Book Now
                </NavLink>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className='w-full h-screen flex justify-center items-center'>
          
          <div class="box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
                    
          </div> 
      )}
    </div>
  );
};

export default Hotel;



