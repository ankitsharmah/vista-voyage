import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import HotelCard from '../common/HotelCard';
import AdminNavBar from './AdminNavBar';
import AdminHotelCard from './AdminHotelCard';
import { TfiPlus } from 'react-icons/tfi';
import { useAuth } from '../context/AuthContext';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from 'bootstrap';

const AdminLocation = () => {
    const auth = useAuth();
    const { id, locationName } = useParams();
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [LId,setLId]=useState(id);
    const [moreDropDown,SetMoreDropDown] = useState(false);
    useEffect(() => {
      fetchData();
    }, [id]);
    console.log(id);
  
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${auth.BASE_URL}/api/v1/locations/location/${id}`,{
          headers: {
              'zrok-skip-browser-warning': 'true'
          }
      });
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

    function dropDown(){
      console.log("called for drop down")
      SetMoreDropDown(!moreDropDown);
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
        <div className='flex gap-5 relative items-center bg-red-50 justify-center'>
        <h1 className='text-4xl mt-[] text-center  p-2 text-indigo-600 capitalize font-bold border-b  '>Hotels in {locationName}</h1>
                <BsThreeDotsVertical  className={"h-10 w-7 text-indigo-600 cursor-pointer"} onClick={()=>{
                  dropDown()
                }}>

                </BsThreeDotsVertical>
                {
                    <div className={moreDropDown ? 'absolute flex gap-2 outline-1 outline rounded-sm  z-20  outline-indigo-200 bg-white p-3  right-[22%] duration-300 ease-in-out ':'absolute flex gap-2 outline-1 outline rounded-sm  z-20  outline-indigo-300 bg-white p-3  right-[22%]  duration-200 ease-in-out -translate-y-16 '}>
                    <button className='hover:underline'>Update</button>
                    <button className='hover:underline'  onClick={()=>deleteLocation(id)}>Delete</button>
                    <NavLink
                    className={"hover:underline"} to={`/admin/${id}/${locationName}/add-hotel`} >
                      <div className="">
                       
                         <p>add hotel</p>
                      </div>
                    </NavLink>
                   </div> 
                  }
                  
        </div>
        <div className='  min-h-[100vh]  flex  justify-center w-full  '>
       
        <div className="flex flex-wrap items-baseline  justify-center gap-2 w-[98%] md:w-full">
            {hotels.map((hotel) => (
              <AdminHotelCard key={hotel.hotelId} hotel={hotel} Id={id} lName={locationName} />
            ))}
           
          </div>
        </div>
        </div>
        }
      
      </div>
    );
}

export default AdminLocation
