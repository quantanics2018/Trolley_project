import React from "react";
import {Outlet} from 'react-router-dom'
import '../main_layout/main_layout.css'

const MainLayout = () => {
    return (
        <div className="MainLayout">
            <Outlet/>
        </div>
    )
}

export default MainLayout;