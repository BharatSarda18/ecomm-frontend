import React from 'react';
import NavBar from "../components/navbar/NavBar";
import UserOrders from '../components/user/UserOrders';

export default function UserOrdersPage() {
  return (
    <div>
        <h1 className='mx-auto text-2xl'>My Orders</h1>
        <UserOrders/>
    </div>
  )
};
