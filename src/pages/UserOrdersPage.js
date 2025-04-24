import React from 'react';
import NavBar from "../components/navbar/NavBar";
import UserOrders from '../components/user/UserOrders';

export default function UserOrdersPage() {
  return (
    <div>
        <h1 className='mx-auto text-2xl mb-6 flex justify-center border py-2 bg-white'>My Orders</h1>
        <UserOrders/>
    </div>
  )
};
