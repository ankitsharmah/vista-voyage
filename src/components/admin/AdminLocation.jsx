import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import HotelCard from '../common/HotelCard';
import AdminNavBar from './AdminNavBar';
import AdminHotelCard from './AdminHotelCard';
import { TfiPlus } from 'react-icons/tfi';
import { useAuth } from '../context/AuthContext';

const AdminLocation = () => {
    const auth = useAuth();
    const { id, locationName } = useParams();
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [LId,setLId]=useState(id);
    useEffect(() => {
      fetchData();
    }, [id]);
    console.log(id);
  
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${auth.BASE_URL}/api/v1/locations/location/${id}`);
        setHotels(response.data.hotels);
      //   console.log("called");
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const deleteLocation =async (id)=>{
      const headers = auth.getHeaders(); 
     
      if( !window.confirm('Are you sure you want to delete')){
        return;
      }
      try {
        const response = await axios.delete(`${auth.BASE_URL}/api/v1/admin/delete-by-id/${id}`,headers)
        console.log("this is response ",response);
        // alert("location has been deleted");
        window.location.reload();
      } catch (error) {
        console.log("this is an error ",error)
      }
    }
  
    return (
      <div className='bg-[#F7EFE5] max-h-max w-full'>
      <AdminNavBar />
        {isLoading?    <div className='w-full h-screen flex justify-center items-center'>
            
            <div class="box">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
                      
            </div> :
        <div className='flex flex-col  '> 
        <div className='flex gap-10 items-center justify-center'>
        <h1 className='text-4xl mt-[] text-center  p-2 text-indigo-600 capitalize font-bold border-b mb-3 '>Hotels in {locationName}</h1>
                <button className="outline text-xs md:text-sm  h-10 outline-1 p-1 rounded-md text-rose-600" onClick={()=>deleteLocation(id)}><span>Delete </span>&#10060;</button>

        </div>
        <div className='  min-h-[100vh]  flex  justify-center w-full  '>
       
        <div className="flex flex-wrap items-baseline  justify-center gap-2 w-[98%] md:w-full">
            {hotels.map((hotel) => (
              <AdminHotelCard key={hotel.hotelId} hotel={hotel} Id={id} lName={locationName} />
            ))}
            <NavLink
                    className={"outline-black/30 ml-2 bg-gray-100 rounded-md  outline flex items-center justify-center hover:bg-gray-300 backdrop-blur-lg  text-white font-bold w-[23%] h-[2.3rem] md:w-[5%] md:h-[10%]"} to={`/admin/${id}/${locationName}/add-hotel`} >
                      <div className="border-2 border-dashed h-[2rem] w-[2rem] md:h-[3rem] md:w-[3rem] border-gray-50  flex items-center justify-center">
                        <TfiPlus className="md:h-[2.4rem] text-black md:w-[2.4rem]" />
                      </div>
                    </NavLink>
          </div>
        </div>
        </div>
        }
      
      </div>
    );
}

export default AdminLocation
