import React from 'react';
import NavBar from '../components/navbar/NavBar';
import UserProfile from "../components/user/UserProfile";
export default function UserProfilePage() {
  return (
    <div>
        <h1 className='mx-auto text-2xl'>My Profile</h1>
        <UserProfile/>
    </div>
  )
};

