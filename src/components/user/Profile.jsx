import React, { useState } from 'react';
import Nav from '../Nav';
import Main from '../Main';
import UserMain from './UserMain';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({ loggedInUser }) => {
  const navigate = useNavigate(); // Declare useNavigate hook here
  const auth = useAuth();  
  //  const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   password: '',
  // });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {

  //   e.preventDefault();
  //   const headers=auth.getHeaders();
  //   try {
  //     const response = await axios.put(`http://localhost:9191/api/v3/user/update-user/${auth.userdata.userId}`,formData,headers)
  //     // localStorage.setItem('token',response.data)
  //     console.log(response.data);
  //     navigate('/');

      
  //   } catch (error) {
      
  //   }
  //   console.log(formData);
  // };

  // return (

      
   
  //   <div className="w-[28%] mx-auto  bg-white p-6 rounded-md shadow-md">
  //     <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Update Profile</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div className="mb-4">
  //         <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
  //           First Name
  //         </label>
  //         <input
  //           type="text"
  //           id="firstName"
  //           name="firstName"
  //           value={formData.firstName}
  //           onChange={handleChange}
  //           className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
  //           required
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
  //           Last Name
  //         </label>
  //         <input
  //           type="text"
  //           id="lastName"
  //           name="lastName"
  //           value={formData.lastName}
  //           onChange={handleChange}
  //           className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
  //           required
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <label htmlFor="password" className="block text-sm font-medium text-gray-600">
  //           Password
  //         </label>
  //         <input
  //           type="password"
  //           id="password"
  //           name="password"
  //           value={formData.password}
  //           onChange={handleChange}
  //           className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
  //           required
  //         />
  //       </div>
  //       <div className="mt-6">
  //         <button
  //           type="submit"
  //           className="w-full bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-700 focus:outline-none"
  //         >
  //           Update Profile
  //         </button>
  //       </div>
  //     </form>
  //   </div>

    
  //   </div>
  // ); const [updateType, setUpdateType] = useState('personal');
  const [updateType, setUpdateType] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
  
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {


    e.preventDefault();
    const headers=auth.getHeaders();
    try {
      const response = await axios.put(`http://localhost:9191/api/v3/user/update-user/${auth.userdata.userId}`,formData,headers)
      // localStorage.setItem('token',response.data)
      console.log(response.data);
      navigate('/');

      
    } catch (error) {
      
    }
    console.log(formData);
  };

  return (
    <div className='bg-gray-400/10 flex justify-center items-center w-full h-screen'>
    <Nav/>
    <div className='w-[97%] md:w-[25%] p-2 md:p-4 outline outline-1 outline-gray-500/50 bg-gray-400/30 rounded-md'>
    <h2 className="text-2xl  md:text-3xl text-center font-semibold mb-3 md:mb-4 text-gray-800">Update Profile</h2>
      <div className="flex justify-between mb-4">
        <button
          className={`md:p-2 p-1 text-sm mr-4  rounded-lg ${
            updateType === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => setUpdateType('personal')}
        >
          Update Personal Info
        </button>
        <button
          className={`md:p-2 p-1 rounded-lg text-sm ${
            updateType === 'password' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => setUpdateType('password')}
        >
          Update Password
        </button>
      </div>
      <form onSubmit={handleSubmit} className=' w-full'>
        {updateType === 'personal' && (
          <>
            <div className="md:mb-4 mb-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 md:p-2 p-1 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 md:p-2 p-1 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                required
              />
            </div>
          </>
        )}
        {updateType === 'password' && (
          <>
            {/* <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Current Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                required
              />
            </div> */}
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                type=""
                id="newPassword"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 md:p-2 p-1 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                required
              />
            </div>
          </>
        )}
        <div className=" md:mt-6">
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white md:p-3 p-2 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
    
    </div>
  );
};


export default Profile;
