import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Procted({ children }) {
  const user = localStorage.getItem("token");
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
};
