import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Toaster } from 'react-hot-toast'

const TeamLayout = () => {
    return (
        <div className=''>
            <Toaster />
            <Sidebar />
            <div
                className="bg-[linear-gradient(to_bottom_left,_#4a1755_30%,_#352862_50%,_#8a58a2_100%)]
  min-h-[calc(100vh)]"
            >
                <Outlet />
            </div>
        </div>
    )
}

export default TeamLayout
