"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import React, {useEffect, useState} from "react";
import {useSidebar} from "@/custom-hooks/useSidebar";

function ErrorPageSidebarWrapper({defaultStatus = false}) {
    const [show, setShow] = useState(false);
    const {setIsMainSidebarOpen} = useSidebar();

    useEffect(() => {
        setIsMainSidebarOpen(defaultStatus);
        setShow(true);
    }, [])

    return (
        <>
            {show && <Sidebar />}
        </>
    );
}

export default ErrorPageSidebarWrapper;