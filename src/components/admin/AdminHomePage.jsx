import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import { useAuth } from "../context/AuthContext";
import { TfiPlus } from "react-icons/tfi";
import AdminHotelCard from "./AdminHotelCard";
import axios from "axios";
import _debounce from 'lodash/debounce';

const AdminHomePage = () => {
  const auth = useAuth();
  const filterdLocation = auth.AdminLocations;
  const authorized = auth.AdminIsAuthorized;
  const [isLoading, setIsLoading] = useState(false);
  const [clickedToAdd, setClickedToAdd] = useState(true);
  const [gotLocations, setGotLocation] = useState(filterdLocation);
  const[selectdLocation,setSelectedLocation] = useState('');
  const debouncedFiltering = _debounce(filtering, 20);

  const [LocationName,setLocationName] = useState({
    locationName: ''
  });

  useEffect(() => {
    const fetchAdminLocations = async () => {
      setIsLoading(true);
      try {
        await auth.getAdminLocations();
    filtering();

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


// console.log("this is 0th index location name ",gotLocations[0].hotelsDTO.hotelName)
 const addLocation =async (e)=>{
  e.preventDefault();
  const headers = auth.getHeaders();
  console.log("this is headers: " , headers)
  console.log("this is location",LocationName)
  try {
    const response = await axios.post(`${auth.BASE_URL}/api/v1/admin/add-location`, LocationName, headers);
    console.log(response);
    window.location.reload();
    filtering()

  } catch (error) {
    console.error("Error adding location:", error);
  }
 }

 function handleOnChange(e) {
  const selectedValue = e.target.value;
  setSelectedLocation(selectedValue);
  console.log('this is selected location name:', selectedValue);
  if (e.target.value === "") {
    // If the search input is empty, reset to the original data
    setGotLocation(auth.AdminLocations);
}

}

 function filtering() {
  if (selectdLocation.trim() === "") {
      // If the search input is empty, reset to the original data
      setGotLocation(auth.AdminLocations);
  } else {
      // Filter based on the selected location
      const newData = auth.AdminLocations.filter((location) => location.locationName.includes(selectdLocation) || location.locationId === selectdLocation);
      console.log('and this is our new data: ', newData);
      setGotLocation(newData);
  }
}


 function droping(){
  console.log(clickedToAdd," is dropping")
  setClickedToAdd(!clickedToAdd)
 }

  return (
    <div className="bg-[#F7EFE5] w-full">
    <div className=" sticky top-0 w-full z-20">

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
          <div  className="min-h-screen   p-3">
          
          <div className="w-full  flex mb-4  ">
          <input
                type="text"
                onChange={handleOnChange}
                className="w-[85%] mr-3 p-[.36rem]"
                value={selectdLocation}
                placeholder="Search by location name"
            />
            <button onClick={()=>filtering()} className="bg-[#ffc336f7] hover:bg-yellow-500 text-white w-[13rem] ">search</button>
          </div>
          <div className={clickedToAdd ? "text-center z-10 w-[80%] left-[10%] md:w-[24rem] md:h-[8rem] outline outline-1 outline-gray-300 backdrop-blur-md bg-white/30 transition-all duration-300   md:left-[40%] self-center ease-in-out rounded-md absolute mb-3 flex items-center justify-center -translate-y-48 " : "text-center z-10 md:w-[24rem] md:h-[8rem] backdrop-blur-md bg-white/30 transition-all duration-300 translate-y-[70%]  md:left-[40%] outline outline-1 outline-gray-300 self-center w-[80%] h-[12rem] left-[10%] ease-in-out top-16 fixed rounded-md flex items-center justify-center"}>
            
            <input
                type="text"
                className="p-1 w-[70%]  bg-red-50 rounded-md outline outline-1
                 bg-whi"
                placeholder="enter location name"
                name="locationName"
                value={LocationName.locationName}
                onChange={handleInputChange}
              />

             <button className="bg-blue-500 p-[.3rem]  w-[4rem] rounded-md ml-2 text-white" onClick={addLocation}>add </button>
          </div>
          <div className="flex mb-4">
            <h1 className="text-2xl w-[85%] mr-3 font-semibold text-indigo-500">locations/</h1>
            <button onClick={()=>droping()} className="  w-[13rem] hover:bg-yellow-500 bg-[#ffc336f7] text-white">add location</button>
          </div>
          <div className="flex flex-wrap gap-2 h-[max-content] ">
          {gotLocations.
              slice()  
              .sort((a, b) => a.locationName.localeCompare(b.locationName, undefined, { sensitivity: 'base' })) 
              .map((location, index) => (
              <div
                key={location.locationId}
                className="bg-white/40 max-h-max  p-2 rounded shadow-md group "
              >
             
                <div className="flex justify-center items-center flex-col gap-3 w-[17rem] ">
                {location.hotelsDTO[0]?.imageUrl ? (
          <img
            src={location.hotelsDTO[0].imageUrl}
            alt={location.hotelsDTO[0].hotelName}
            className="w-full h-40 md:h-48 object-cover rounded-t-md transition-transform duration-250 transform group-hover:scale-[1.06]"
          />
        ) : (
          <div className="w-full h-40 md:h-48 bg-gray-300 rounded-t-md"></div>
        )}
              {/* <h2 className="md:text-3xl  text-xl text-wrap capitalize text-indigo-600 font-semibold ">

                 
                </h2> */}
                <NavLink to={`/admin/${location.locationId}/${location.locationName}`} className={"md:text-3xl  text-xl text-wrap capitalize text-indigo-600 font-semibold"}>
                 {location.locationName}
                    </NavLink>
         
            
                </div>
              
                {/* <div className="flex w-full gap-4 flex-wrap">
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
                </div> */}
              </div>
            ))}
          </div>
          </div>
        </>
      ) : (
        <h1>login first</h1>
      )}
    </div>
  );
};

export default AdminHomePage;
