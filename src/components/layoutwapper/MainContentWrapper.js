"use client"

import React from 'react';
import {useSidebar} from "@/custom-hooks/useSidebar";
import {usePathname} from "next/navigation";

const MainContentWrapper = ({children, classes = ''}) => {
    const {isMainSidebarOpen, isMobileView, isSidebarOpen} = useSidebar();
    let pathname = usePathname();
    pathname = pathname.split('?')[0];
    const mainPath = pathname.replace(/(\/\d+)+$/, '');


    const showSidebarPaths = [
        '/curriculum/evaluations',
        '/content-management/video-management',
        '/content-management/document-management',
        '/curriculum/course',
    ]

    let paddingLeft;

    if (isMobileView) {
        paddingLeft = ' pl-[24px] lg:pl-[48px]';
    } else if (showSidebarPaths.includes(mainPath)) {
        if (isSidebarOpen) {
            paddingLeft = isMainSidebarOpen ? 'pl-[650px]' : 'pl-[400px]';
        } else {
            paddingLeft = isMainSidebarOpen ? 'pl-[308px]' : 'pl-[24px] lg:pl-[48px]';
        }
    } else {
        paddingLeft = isMainSidebarOpen ? 'pl-[308px]' : 'pl-[24px] lg:pl-[48px]';
    }

    return (
        <div id="main-content" className= {` ${paddingLeft} transition-all duration-300 pt-[92px] lg:pt-[118px]
            pb-[32px] lg:pb-[48px]   
            ${classes} pr-[24px] lg:pr-[48px] min-h-[calc(100dvh-54px)]`}>
            {children}
        </div>
    );
};

export default MainContentWrapper;