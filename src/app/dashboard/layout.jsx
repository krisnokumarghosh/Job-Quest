import DashboardSideBar from '@/components/dashboard/DashboardSideBar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className='flex lg:gap-12 min-h-screen bg-[#131314]'>
            <DashboardSideBar/>
            <div className='flex-1'>{children}</div>
        </div>
    );
};

export default DashboardLayout;