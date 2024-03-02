import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate(); // Declare useNavigate hook here

    const [formData,setFormData] = useState({
      email:"",password:""
    });

      const handelCahnge = (e)=>{
        const{name,value} = e.target;
        setFormData({
          ...formData,
          [name]:value,
        })

      }

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("this is formData ",formData)
    try {
      const res=await axios.post("http://localhost:9191/api/v1/auth/authentication",formData)
      localStorage.setItem('token',res.data.token)
    auth.adminSignIn(res.data.token);

      
    } catch (error) {
      console.log("this is an error sir ",error)
    }
    // Basic validation
    // if (email === 'admin@gmil.com' && password === 'admin') {
    //   // Successful login, you can redirect to the admin dashboard or perform other actions
    //   console.log('Login successful');
    // } else {
    //   // Display error message for unsuccessful login
    //   setError('Invalid username or password');
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
          {error && <p className="mt-2 text-center text-red-600">{error}</p>}
        </div>
        <form className="mt-8  space-y-6" action="" onSubmit={handleSubmit} method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className='mb-2'>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="admin Id"
                value={formData.email}
                onChange={handelCahnge}
              />
            </div>
            <div className=''>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handelCahnge}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
