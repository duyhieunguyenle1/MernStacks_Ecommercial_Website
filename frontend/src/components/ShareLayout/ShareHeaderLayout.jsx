import React from 'react'
import { Outlet } from "react-router-dom";
import { Header } from "../index";

const ShareHeaderLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default ShareHeaderLayout