import React from 'react'
import { useAuth } from '../context/AuthContext';

const Location = () => {
    const auth = useAuth();
    const locationData=auth.locationData;
  return (
    <div>
           {
            <h1>hwelocosdcuhasduc</h1>
           }
    </div>
  )
}

export default Location;
