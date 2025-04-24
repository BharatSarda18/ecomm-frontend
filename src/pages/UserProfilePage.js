import React from 'react';
import NavBar from '../components/navbar/NavBar';
import UserProfile from "../components/user/UserProfile";
export default function UserProfilePage() {
  return (
    <>
        <h1 className='mx-auto text-2xl mb-6 flex justify-center border py-2 bg-white'>My Profile</h1>
        <UserProfile/>
    </>
  )
};

