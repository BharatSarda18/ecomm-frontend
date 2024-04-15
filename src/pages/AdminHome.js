import React from 'react';
import AdminProductList from "../components/admin/AdminProductList";
import NavBar from '../components/navbar/NavBar';

export default function AdminHome() {
  return (
    <NavBar>
      <AdminProductList></AdminProductList>
    </NavBar>
  )
};
