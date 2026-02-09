import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Toaster } from 'react-hot-toast'
import LicenseeManagement from '../Pages/LicenseeManagement/LicenseeManagement'
import PricingManagement from '../Pages/PricingManagement/PricingManagement'
import CampaignManagement from '../Pages/CampaignManagement/CampaignManagement'
import RevenueManagement from '../Pages/RevenueManagement/RevenueManagement'

const AdminLayout = () => {
    return (
        <div className=''>
            <Toaster />
            <Sidebar />
            <div
                className="bg-[linear-gradient(to_bottom_left,_#3f283d_30%,_#2d3569_50%,_#3f283d_100%)] 
  min-h-[calc(100vh)]"
            >
                <Outlet />

            </div>
        </div>
    )
}

export default AdminLayout
