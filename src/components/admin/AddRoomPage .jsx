import React, { useState } from 'react';
import AdminNavBar from './AdminNavBar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddRoomPage = () => {
  const auth = useAuth();
  const { id, hotelName } = useParams();
  const [roomType, setRoomType] = useState('');
  const navigate = useNavigate();
  const roomTypes = ['Standard', 'Deluxe', 'Suite', 'VIP'];
  const [RoomdData, setRoomData] = useState({
    roomNo: 0,
    price: 0,
    description: '',
    hotelDTO: {
      hotelId: id,
    },
    roomType: roomType, // Corrected to an array of objects
    fileName: '',
  });

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handeInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handelRoomType = (e) => {
    setRoomType(e.target.value);
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const headers = auth.getHeaders();
    const formData = new FormData();
    console.log("this is room data to be sent : ",RoomdData);

    // Append the file to the formData
    formData.append('file', file);

    // Append other data as string
    formData.append(
      'roomDto',
      JSON.stringify(RoomdData)
    );

    try {
      const response = await axios.post(`http://localhost:9191/api/v1/admin/add-room`, formData,headers);
      navigate("/admin/home")
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div className="min-h-screen  flex items-center justify-center bg-gradient-to-r from-teal-500 to-indigo-500">
        <div className="max-w-md w-full bg-white p-2 md:p-8 rounded-md shadow-md">
          <div>
            <h2 className="mt-2 md:mt-6 text-center text-xl md:text-3xl font-extrabold text-gray-900">Add Room</h2>
          </div>
          <form className="mt-2 md:mt-8 space-y-6" action="#" method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="hotelId" className="sr-only">
                  Hotel ID
                </label>
                <input
                  id="hotelId"
                  name="hotelId"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Hotel ID"
                  value={hotelName}
                />
              </div>
              <div>
                <label htmlFor="roomNumber" className="sr-only">
                  Room Number
                </label>
                <input
                  id="roomNumber"
                  name="roomNo"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Room Number"
                  value={RoomdData.roomNo}
                  onChange={handeInputChange}
                />
              </div>
              <div>
                <label htmlFor="price" className="sr-only">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Price"
                  value={RoomdData.price}
                  onChange={handeInputChange}
                />
              </div>
              <div>
                <label htmlFor="image" className="sr-only">
                  Room Photo URL
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Room Photo URL"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label htmlFor="description" className="sr-only">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Description"
                  value={RoomdData.description}
                  onChange={handeInputChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="roomType" className="sr-only">
                Room Type
              </label>
              <select
                id="roomType"
                name="roomType" // Changed to match the state property
                value={roomType}
                onChange={(e) => {
                  handelRoomType(e);
                  handeInputChange(e);
                }}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
              >
                <option value="" disabled>
                  Select Room Type
                </option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          

          <div>
            <button
              type="submit"
              onClick={handleAddRoom}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default AddRoomPage;
