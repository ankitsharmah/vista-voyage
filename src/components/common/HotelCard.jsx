// HotelCard.js
import React from 'react';
import { FaStar } from "react-icons/fa";
import { NavLink, useParams } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const { id, locationName} = useParams();
console.log("use params rendering",id,locationName)
    console.log(hotel);
  return (
    <div className="w-[90%] p-1 md:w-[23%] group cursor-pointer  md:m-3 flex flex-col md:gap-2 h-[max-content] overflow-hidden bg-white shadow-lg rounded-md transition-transform duration-300 transform ">
    <div className='bg-red-200 w-full h-40 md:h-48  object-cover rounded-t-md transition-transform duration-250 transform group-hover:scale-[1.09]'>
      <img
        src={hotel.imageUrl}
        alt={hotel.hotelName}
        className="w-full h-40 md:h-48  object-cover rounded-t-md transition-transform duration-250 transform group-hover:scale-[1.09]"
      />
    </div>
      <div className=" py-2 md:px-6 md:py-4">
        <div className="md:mb-2">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 capitalize">
            {hotel.hotelName}
          </h2>
          <p className="text-sm flex text-gray-600">Rating: {hotel.rating} <span className='flex justify-center pl-1 items-center text-yellow-500/80'><FaStar />
</span></p>
        </div>
        <p className="text-gray-700">{hotel.address}</p>
      </div>
    
  <NavLink className="w-full p-2  text-base text-white h-full rounded-lg bg-yellow-400 md:text-xl hover:bg-yellow-600 transition-colors duration-300 capitalize text-center " to={`/location/${id}/${locationName}/${hotel.hotelName}/${hotel.hotelId}`}>
    Check Now
  </NavLink>


    </div>
  );
};

export default HotelCard;
