import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import { useAuth } from "../context/AuthContext";
import { TfiPlus } from "react-icons/tfi";
import AdminHotelCard from "./AdminHotelCard";
import axios from "axios";

const AdminHomePage = () => {
  const auth = useAuth();
  const gotLocations = auth.AdminLocations;
  const authorized = auth.AdminIsAuthorized;
  const [isLoading, setIsLoading] = useState(false);
  // const [locationName, setlocationName] = useState('');
  const [LocationName,setLocationName] = useState({
    locationName: ''
  });
  console.log("Type of gotLocations:", typeof gotLocations);
  useEffect(() => {
    const fetchAdminLocations = async () => {
      setIsLoading(true);
      try {
        await auth.getAdminLocations();
      } catch (error) {
        console.error("Error fetching admin locations:", error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchAdminLocations();
  }, []);


 const handleInputChange = (e)=>{
  const { name, value } = e.target;
  setLocationName((prevData) => ({
    ...prevData,
    [name]: value,
  }));
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

 const addLocation =async (e)=>{
  e.preventDefault();
  const headers = auth.getHeaders();
  console.log("this is headers: " , headers)
  console.log("this is location",LocationName)
  try {
    const response = await axios.post("http://localhost:9191/api/v1/admin/add-location", LocationName, headers);
    console.log(response);
    window.location.reload();

  } catch (error) {
    console.error("Error adding location:", error);
  }
 }

  return (
    <div className="bg-[#F7EFE5] w-full">
    <div className="bg-yellow-00 fixed top-0 w-full z-10">

      <AdminNavBar />
    </div>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : authorized ? (
        <>
          <div className="max-h-max flex flex-col p-3">
          <div className="text-center mt-16 mb-3 ">
            <p className="text-xl font-semibold mb-2">Add location</p>
            <input
                type="text"
                className="p-1 w-36 rounded-md outline outline-1
                 bg-white"
                placeholder="enter location name"
                name="locationName"
                value={LocationName.locationName}
                onChange={handleInputChange}
              />

             <button className="bg-blue-500 p-[.3rem] w-[4rem] rounded-md ml-2 text-white" onClick={addLocation}>add </button>
          </div>
            {gotLocations.
              slice()  // Shallow copy of the array
              .sort((a, b) => a.locationName.localeCompare(b.locationName, undefined, { sensitivity: 'base' })) .map((location, index) => (
              <div
                key={location.locationId}
                className="bg-white max-h-max p-2 rounded shadow-md mb-4  "
              >
             
                <div className="flex justify-center">
                <div className="flex items-center gap-7  md:mb-2" >
              <h2 className="md:text-3xl  text-xl text-wrap capitalize text-indigo-600 font-semibold ">
                  {location.locationName}
                </h2>
                <button className="outline text-xs outline-1 p-1 rounded-md text-rose-600" onClick={()=>deleteLocation(location.locationId)}><span>Delete </span>&#10060;</button>
         
              </div>
                </div>
              
                <div className="flex w-full gap-4 flex-wrap">
                  <div className="flex w-full items-center flex-col md:flex-row gap-4  ">
                  {
                    location.hotelsDTO.length > 4 ?
                    <div className="flex w-full items-center flex-col  md:flex-row">
                    {location.hotelsDTO.slice(0, 4).map((hotel, hotelIndex) => (
            <AdminHotelCard key={hotel.hotelId} hotel={hotel}  lName={location.locationName} />
                    ))}
                    <NavLink to={`/admin/${location.locationId}/${location.locationName}`} className={"text-[#4D96FF]"}>
                      ...more
                    </NavLink>
                    </div> 
                 
                     : (
                      <div  className="flex w-full items-center flex-col md:flex-row gap-3">
                 {     location.hotelsDTO.slice(0, 4).map((hotel, hotelIndex) => (
                  <AdminHotelCard key={hotel.hotelId} hotel={hotel}  lName={location.locationName} />
                     
                    ))}
                     <NavLink
                    className={"outline-black/30 ml-2 bg-gray-100 rounded-md  outline flex items-center justify-center hover:bg-gray-300 backdrop-blur-lg  text-white font-bold w-[23%] h-[2.3rem] md:w-[5%] md:h-[40%]"} to={`/admin/${location.locationId}/${location.locationName}/add-hotel`} >
                      <div className="border-2 border-dashed h-[2rem] w-[2rem] md:h-[3rem] md:w-[3rem] border-gray-50  flex items-center justify-center">
                        <TfiPlus className="md:h-[2.4rem] text-black md:w-[2.4rem]" />
                      </div>
                    </NavLink>
                      </div>
                     )
                  }
                    
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1>login first</h1>
      )}
    </div>
  );
};

export default AdminHomePage;
