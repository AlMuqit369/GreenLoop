import React from "react";
import { Outlet } from "react-router";
import authImage from '../assets/1.png'

const AuthLayout=() =>{
    return (
        <div className='max-w-7x1 mx-auto'>
           <div className='flex items-center '>
              <div className='flex-1'>
                <Outlet> </Outlet>
              </div>
              <div className='flex-1'>
                <img src={authImage} alt="" />
              </div>
           </div>
        </div>
    );
};

export default AuthLayout; 