import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Logout() {
  return (
    <div>
     <Navigate to="/login" replace={true}></Navigate> 
    </div>
  )
};