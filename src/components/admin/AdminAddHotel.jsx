import React, { useState } from 'react';
import AdminNavBar from './AdminNavBar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminAddHotel = () => {
  const auth = useAuth();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const{locationName,id}=useParams();
  const[isloading,setIsLoading] = useState(false);
  const [hotelData, setHotelData] = useState({
    hotelName: '',
    locationDTO:{
          locationId:id,
    },
    address: '',
    rating:0
    // Add more fields as needed
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    // console.log(hotelData)
    formData.append('hotel', JSON.stringify(hotelData));
    setIsLoading(true);
    const headers= auth.getHeaders();
    console.log("this is a haeader at add hotel ",headers)
    console.log('this is to be sent to hotel ',hotelData)
    try {
      const response = await axios.post(`${auth.BASE_URL}/api/v1/admin/add-hotel`, formData,headers);

      console.log('Hotel added successfully:', response.data);
      navigate('/admin/home')
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error adding hotel:', error);
      // Handle error, e.g., show an error message
    }
    finally{
      setIsLoading(false)
    }
  };
  // const handleImageChange = (e) => {
  //   const selectedImage = e.target.files[0];
  //   setImage(selectedImage);
  // };

  return (
 <div className='flex items-center justify-center  bg-gradient-to-r from-teal-500 to-indigo-500 h-screen w-full'>
<div className='w-full fixed top-0'>
<AdminNavBar/>

</div>
  <div className=" flex items-center justify-center">
  {
    isloading ?    <div className="w-full h-screen flex justify-center items-center">
          <div className="box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div> :<div className=" h-full max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <div className=''>
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">Add Hotel</h2>
       
        </div>
        <form className="mt-8 space-y-6" action="#" onSubmit={handleFormSubmit} method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="hotelName" className="sr-only">
                Hotel Name
              </label>
              <input
                id="hotelName"
                name="hotelName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Hotel Name"
                value={hotelData.hotelName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="address" className="sr-only">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Address"
                value={hotelData.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="rating" className="sr-only">
                Rating
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Rating (1-5)"
                value={hotelData.rating}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="location" className="sr-only">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Location"
                value={locationName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="image" className="sr-only">
                Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
                onChange={handleFileChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              // onClick={handleInputChange}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Add Hotel
            </button>
          </div>
        </form>
      </div>
  }
      
    </div>
 </div>
  );
};

export default AdminAddHotel;
