import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import axios from 'axios';
import Nav from './Nav';
import { FaCheck } from 'react-icons/fa6';

const Reservations = () => {
  const auth = useAuth();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const[Complted,setComplted]=useState(false);
  const [UserReservations, setUserReservations] = useState({});

  async function getUserReservations() {
    setIsLoading(true);
  
    try {
      const headers = auth.getHeaders();
      console.log("Headers:", headers);
  
      const response = await axios.get(
        `http://localhost:9191/api/v3/user/get-by-id/${userId}`,
        headers
      );
  
      setIsLoading(false);
      setUserReservations(response.data);
      console.log("this is userReservation : ",UserReservations);
      console.log("this is server : ",response.data);
      console.log("Current Date:", new Date());
// console.log("Reservation Date To:", new Date(reservation.dateTo));
// console.log("Comparison Result:", new Date(reservation.dateTo) < new Date());

    } catch (error) {
      console.error("Error fetching user reservations:", error);
    }
  }
  
async function cancelReservation(res){
    const headers = auth.getHeaders();
    console.log("Headers in cancel :", headers);
    console.log("this is res id ",res)
    
try {
  setIsLoading(true);
  const response = await axios.put(`http://localhost:9191/api/v3/user/delete-reservation-by-id/${userId}/${res}`,{},headers)
  console.log(response," this is response")
  window.location.reload();
  setIsLoading(false);

} catch (error) {
  console.log(error);
}
  }

  useEffect(() => {
    getUserReservations();
  }, []);

  // function choice(){
  //   setComplted(false);
  // }
  // function choice1(){
  //   setComplted(true);
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <div >
        {isLoading ? (
         
          <div className='w-full h-screen flex justify-center items-center'>
          
          <div class="box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
                    
          </div>
        ) :UserReservations && UserReservations.reservations && UserReservations.reservations.length > 0 ? 
        (
          <div className="container mx-auto mt-16 p-2 md:p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center shadow-lg">Your Reservations</h2>
           {/* <div className=' flex justify-center items-center mb-2 gap-3'> 
           <button onClick={choice} className='bg-green-500 text-white p-2 rounded-md hover:bg-green-700 '>Completed</button>
            <button onClick={choice1} className='bg-yellow-400 text-white p-2 rounded-md hover:bg-yellow-500'>UpComing</button></div> */}


           {UserReservations.reservations     
    .slice()
    .sort((a, b) => new Date(a.dateTo) - new Date(b.dateTo))
    .map((reservation) =>(
              <div key={reservation.reservationId} className="border p-2 md:p-6 mb-3 md:mb-6  bg-white rounded-lg shadow-md">
                <div className="mb-2 md:mb-4">
                  <h3 className="text-2xl font-semibold text-purple-700 capitalize  mb-2">Guest: {reservation.userName}</h3>
                  <p className="text-gray-600 font-semibold">Email: <span  className="text-gray-800 font-medium">{reservation.gmailId}</span></p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   md:gap-4">
                  <div className='flex gap-2'>
                  <p className="text-gray-600 font-semibold">Check-In:</p>
                    <p className="text-gray-800"> {reservation.dateFrom}</p>
                  </div>
                  <div className='flex gap-2 mb-2 md:mb-0'>
                  <p className="text-gray-600 font-semibold">Check-Out:</p>
                    <p className="text-gray-800"> {reservation.dateTo}</p>
                  </div>
                  <div className='flex gap-2'>
                  <p className="text-gray-600 font-semibold">Persons:</p>
                    <p className="text-gray-800"> {reservation.persons}</p>
                  </div>
                  <div  className='flex gap-2'>
                  <p className="text-gray-600 font-semibold">Confirmation Code:</p>
                  <p className="text-gray-800">{reservation.confirmetionCode}</p>
                </div>
                  <div className='flex gap-2'>
                    <p className="text-gray-600 font-semibold">Total Cost: </p>
                    <p className="text-gray-800">{reservation.totalCost}</p>
                  </div>
                </div>

                <div className='flex gap-6'>
              {reservation.room && (
                  <div className="mt-2 md:mt-6">
                    <h4 className="text-lg font-semibold mb-2 text-indigo-700">Room Details</h4>
                    <p className="text-gray-600">Room Number: {reservation.room.roomNo}</p>
                    <p className="text-gray-600">Description: {reservation.room.description}</p>
                  </div>
                )}

                {
                  reservation.room && reservation.room.hotel && (
                  <div className="mt-2 mb-2 md:mb-0 md:mt-6">
                    <h4 className="text-lg font-semibold mb-2 text-indigo-700">Hotel Details</h4>
                    <p className="text-gray-600">Hotel Name: {reservation.room.hotel.hotelName}</p>
                    {/* <p className="text-gray-600">Rating: {reservation.room.hotel.rating}</p> */}
                    <p className="text-gray-600">Address: {reservation.room.hotel.address} , {reservation.room.hotel.location.locationName}</p>
                    </div>)
                }
              </div>
                     {new Date(reservation.dateTo) < new Date() ? (
          <div className="mt-4 flex items-center gap-2 outline max-w-max p-1 outline-green-500/50 rounded-sm text-green-500">
          <div className='flex '>
          <FaCheck className='text-xl' />

          </div>

            <p>Completed</p>
          </div>
        ) : (
          <div className='flex gap-3 items-center md:mt-4  h-9 '>
         <div className=" flex items-center  outline md:max-w-max p-1 outline-yellow-500/50 rounded-sm text-yellow-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="md:h-6 md:w-6 h-3 w-3 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p>Upcomings</p>
          </div>
          <button  onClick={() => cancelReservation(reservation.reservationId)} className= 'outline outline-1 rounded-md  outline-rose-700 hover:bg-rose-700 text-white  bg-rose-600/90 h-[2.04rem] md:h-full px-1 '>
            cancel
          </button>
         </div>
        )}
              </div>
            ))}


            
          </div>
        ) : (
          
          <div className='flex justify-center flex-col items-center h-screen w-full' >
          <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center shadow-lg capitalize">You have no Reservations</h2>
</div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
