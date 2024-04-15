import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedAdmin({children}) {

  const user = localStorage.getItem("token");
  const userInfo = useSelector((state) => state.user.userInfo);

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (userInfo && userInfo.role!=='admin') {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
};
