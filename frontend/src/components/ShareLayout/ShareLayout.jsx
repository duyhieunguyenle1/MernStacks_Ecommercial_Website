import React from 'react'
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../index";

const ShareLayOut = () => {
    return (
        <>
            <Header />
            <div className="container container-fluid">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default ShareLayOut