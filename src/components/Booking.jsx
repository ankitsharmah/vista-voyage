import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { GiAxeInStump } from 'react-icons/gi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { Redirect } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const {roomId}=useParams();
    const auth =useAuth();
    const[submitted,setSubmitted] = useState(true);
    const[Continued,setcontinued] = useState(true);
    const[NoOfDays,setNoOfDays] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        userName: '',
        gmailId: '',
        dateFrom: '',
        dateTo: '',
        persons: 1,
        totalCost:0
      });
      function getDaysDifference() {
        // Convert the input strings to Date objects
        const start = new Date(formData.dateFrom);
        const end = new Date(formData.dateTo);
        // Calculate the time difference in milliseconds
        const timeDifference = end - start;
      
        // Calculate the number of days by dividing the time difference by the number of milliseconds in a day
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      if(daysDifference>'0'){
        setNoOfDays(daysDifference);

      }
      }
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    // console.log("this is hotel name : ",auth.HotelForBooking.hotel.hotelName)
      const handleSubmit = (e) => {
        console.log(" function called bhaii");
        e.preventDefault();
        handelingButtons();
        setFormData((prevData) => ({
          ...prevData,   
          totalCost: prevData.persons>2?(NoOfDays * auth.HotelForBooking.price+formData.persons*600):NoOfDays * auth.HotelForBooking.price       
        }));
        console.log('Form Submitted:', formData);
        console.log( "bhai yahi h ",NoOfDays * auth.HotelForBooking.price+formData.persons*600);
      };

      function handelingButtons(){
        getDaysDifference();
        setSubmitted(!submitted);
        setcontinued(!Continued);
      }
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'yyyy-mm-dd' format
      async function book() {
        setIsLoading(true);
        try {
          console.log("Booking Data:", formData);
          const headers = auth.getHeaders();

          const response = await axios.post(`${auth.BASE_URL}/api/v1/reservation/create/${roomId}/${auth.userdata.userId}`, formData,
          headers);
          setIsLoading(false);
            console.log("Response:", response.data);
          navigate(`/reservations/${auth.userdata.userId}`);

         
        } catch (error) {
          if (error.response && error.response.data) {
            console.error("Error during booking:", error.response.data);
          } else {
            console.error("Unexpected error during booking:", error);
          }
        }
      }
      
    
    
  return (
    <div className=' bg-slate-100 h-screen  w-full'>
    <Nav/>

{auth.isAuthorized?
          ( <div className='h-full relat  w-full block md:flex '>
   <div className='  h-[100%]  flex justify-around items-center w-full'>
   {submitted? <form onSubmit={handleSubmit}  className="w-[95%] md:w-[40%] py-3 md:py-4 focus:outline rounded-lg outline outline1 outline-white/50 h-[max-content] md:h-[max-content] md:gap-1 md:min-w-[35%] flex flex-col justify-center items-center bg-[#365486] ">
      <div className=" mb-2 md:mb-4 w-[90%] md:w-[70%]">
        <label htmlFor="userName" className="block text-xs md:text-sm font-medium text-white">
          User Name
        </label>
        <input
          type="text" 
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="transition-all duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md p-1 md:p-4 border-transparent focus:border-blue-500 border-b-2"
          required
        />
      </div>

      <div className=" mb-3 md:mb-4  w-[90%] md:w-[70%]">
        <label htmlFor="email" className="block text-xs md:text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="gmailId"
          value={formData.gmailId}
          onChange={handleChange}
          className="transition-all duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md  p-1 md:p-4 border-transparent focus:border-blue-500 border-b-2"          required
        />
      </div>

     <div className='flex w-[98%] md:w-[78%]  mb-2 md:mb-4  justify-around'>
     <div className=" w-[40%]">
        <label htmlFor="checkInDate" className="block text-xs md:text-sm font-medium text-white">
          Check-In Date
        </label>
        <input
          type="date"
          id="checkInDate"
          name="dateFrom"
          value={formData.dateFrom}
          onChange={handleChange}
          min={currentDate} // Set minimum date to the current date

          className="transition-all duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md  p-1 md:p-4 border-transparent focus:border-blue-500 border-b-2"          required
        />
      </div>

      <div className=" w-[40%]">
        <label htmlFor="checkOutDate" className="block text-xs md:text-sm font-medium text-white">
          Check-Out Date
        </label>
        <input
          type="date"
          id="checkOutDate"
          name="dateTo"
          value={formData.dateTo}
          onChange={handleChange}
          min={formData.dateFrom || currentDate} // Set
          className="transition-all duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md  p-1  md:p-4 border-transparent focus:border-blue-500 border-b-2"          
          required
        />
      </div>
     </div>

      <div className="mb-4  w-[90%] md:w-[70%]">
        <label htmlFor="numberOfPersons" className="block text-sm font-medium text-white">
          Number of Persons
        </label>
        <input
          type="number"
          id="numberOfPersons"
          name="persons"
          value={formData.persons}
          onChange={handleChange}
          className="transition-all duration-300 outline-none w-full rounded-md focus:rounded-none focus:rounded-t-md  p-1 md:p-4 border-transparent focus:border-blue-500 border-b-2"
          min="1"
          required
        />
      </div> {
      <button type="submit" className="bg-yellow-400 text-white md:p-2 px-3 py-1 text-sm rounded-md md:text-base hover:bg-yellow-600/90">
        Continue
      </button>
               }

     
    </form>
    :(
            <div className="  w-[90%] md:w-[40%] h-[max-content] flex flex-col gap-2 md:gap-3 p-4 bg-[#0f1035ef] text-white rounded-md">
              <h2 className="text-lg md:text-3xl text-center font-bold ">Booking Summary</h2>
              <p className='md:text-xl text-sm flex items-center gap-2 text-yellow-400 capitalize'>Hotel Name : <p className='text-xs md:text-base text-white capitalize'>{auth.HotelForBooking.hotelDTO.hotelName}</p></p>
              <p className='md:text-xl flex items-center gap-2 text-yellow-400 capitalize'>room : <p  className='text-xs md:text-base text-white capitalize'>{auth.HotelForBooking.description}</p></p>
              <p className='md:text-xl text-sm  flex items-center gap-2 text-yellow-400 capitalize'>Hotel address : <p  className='text-xs md:text-base text-white capitalize'>{auth.HotelForBooking.hotelDTO.address},{auth.HotelForBooking.hotelDTO.locationDTO
              .locationName}</p></p>
              <p className='md:text-xl flex items-center gap-2 text-yellow-400 capitalize'>User Name: <p  className='text-xs md:text-base text-white capitalize'>{formData.userName}</p></p>
              <p className='md:text-xl text-sm  flex items-center gap-2 text-yellow-400 '>Email: <p  className='text-xs md:text-base text-white '>{formData.gmailId}</p></p>
              <p className='md:text-xl text-sm  flex items-center gap-2 text-yellow-400 capitalize'>Check-In Date: <p  className='text-xs md:text-base text-white capitalize'>{formData.dateFrom}</p></p>
              <p className='md:text-xl text-sm  flex items-center gap-2 text-yellow-400 capitalize'>Check-Out Date: <p  className='text-xs md:text-base text-white capitalize'>{formData.dateTo}</p></p>
              <p className='md:text-xl text-sm  flex items-center gap-2 text-yellow-400 capitalize'>Number of Persons: <p  className='text-xs md:text-base text-white capitalize'>{formData.persons}</p></p>
              <p className='md:text-xl text-sm  flex items-center gap-2 text-yellow-400 capitalize'>Total Cost: <p  className='text-xs md:text-base text-white capitalize'>{formData.totalCost} Rupees</p></p>
              <div className='flex justify-center gap-2'>
              <button className="bg-blue-500 text-white md:p-2 text-xs md:text-base rounded-md  w-16 h-8 md:h-full  hover:bg-blue-700 " onClick={handelingButtons}>edit</button>
              <button  className="bg-green-500 text-white md:p-2 text-xs md:text-base rounded-md  w-16 h-8 md:h-full hover:bg-green-700 "  onClick={book}>Book</button>
              
              </div>
            
            </div>
          )}
          
   </div>
  
  </div>
 )
  :
 (<div className='h-screen w-full flex justify-center items-center'><h1>please login first</h1>
 </div>)}
    </div>

 
  )
}

export default Booking;
