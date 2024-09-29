import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';


const ForgetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword:''
      });
    const auth = useAuth();
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
  

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = async(e) => {
      e.preventDefault();
  
      if (formData.password === formData.confirmPassword) {
        try {
            console.log('this is emailid and  foremdata ',formData," ",auth.email)
            const res = await axios.put(`${auth.BASE_URL}/api/v1/locations/forget/${auth.email}`,formData,{
              headers: {
                  'zrok-skip-browser-warning': 'true'
              }
          })
            alert('password has upated successfully');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
        setMessage('Password successfully reset.');
      } else {
        setMessage('Passwords do not match. Please try again.');
      }
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Forgot Password</h2>
        {message && (
          <div className="mb-4 text-red-600">
            <p>{message}</p>
          </div>
        )}
        {!message && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name='password'
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter new password"
                onChange={handleInputChange}
                value={formData.password}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name='confirmPassword'
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Confirm new password"
                onChange={handleInputChange}
                value={formData.confirmPassword}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;


