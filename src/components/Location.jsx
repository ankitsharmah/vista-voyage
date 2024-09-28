
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HotelCard from './common/HotelCard'; // Import the HotelCard component
import { useAuth } from './context/AuthContext';

const Location = () => {
  const { id, locationName } = useParams();
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [LId,setLId]=useState(id);
  const auth = useAuth();
  useEffect(() => {
    fetchData();
  }, [id]);
  console.log(id);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${auth.BASE_URL}/api/v1/locations/location/${id}`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    });
      setHotels(response.data.hotels);
    //   console.log("called");
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='bb w-full'>
      <Nav />
      {isLoading?    <div className='w-full h-screen flex justify-center items-center'>
          
          <div class="box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
                    
          </div> :
      <div className='flex flex-col  '> <h1 className='text-4xl mt-[4rem] text-center md:mt-[4rem] p-2 text-yellow-500/90 capitalize font-bold border-b mb-3 '>Hotels in {locationName}</h1>
      <div className='  min-h-[100vh]  flex  justify-center w-full  '>
     
      <div className="flex flex-wrap justify-center gap-2 w-[98%] md:w-full">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.hotelId} hotel={hotel} Id={id} lName={locationName} />
          ))}
        </div>
      </div>
      </div>
      }
    
    </div>
  );
};

export default Location;