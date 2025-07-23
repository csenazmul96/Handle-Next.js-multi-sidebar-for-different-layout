"use client"; // Required for interactivity

import React, {useEffect, useState} from "react";
import SidebarItem from "./SidebarItem";
import {menuItems} from "./SidebarData";
import {useSidebar} from "@/custom-hooks/useSidebar";
import Link from "next/link";
import {Menu} from "lucide-react";

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState([]);

    const {
        isMainSidebarOpen,
        isMobileSidebarOpen,
        isMobileView,
        setIsMobileSidebarOpen, IsMobileSidebarOpen,  toggleMainSidebar
    } = useSidebar();
    const handleClick = (item)=>{
        setActiveMenu((prevList) => {
            if (prevList.includes(item)) {
                return prevList.filter((i) => i !== item);
            } else {
                return [...prevList, item];
            }
        });
    }

    // Sidebar width classes
    const widthClass = isMainSidebarOpen ? "w-[260px]" : "w-0";

    const translateClass = isMobileView
        ? (isMainSidebarOpen ? "translate-x-0" : "-translate-x-full")
        : "translate-x-0";

    const sidebarClasses = `
    fixed top-0 left-0 z-[70] bg-white text-subColor border-r border-[#E4E4E4]
    transition-all duration-300 overflow-hidden
    ${isMobileView ? "h-full pt-[60px]" : "top-[70px] h-[calc(100%-70px)]"}
    ${widthClass} ${translateClass}
  `;

    return (
        <>
            <aside
                className={`${sidebarClasses} transform will-change-transform`} style={{transitionProperty: "width, transform"}}
            >
                { isMobileView && (
                    <div className="absolute top-0 px-[16px] pr-0 w-[260px] h-[60px] py-[8.5px] flex items-center lg:hidden border-b border-[#E4E4E4]">
                        <div className="left-header w-full ">
                            <div className="logo text-base flex items-center justify-between font-bold pr-4">
                                <Link href="/" className="text-[18px] flex items-center text-black">
                                    LMS LOGO <span className="text-subColor pl-2 text-sm font-normal">관리자</span>{" "}
                                </Link>
                                <span className={`cursor-pointer`} onClick={toggleMainSidebar}>
                                <Menu size={24} className={`text-[#999]`}/>
                            </span>
                            </div>
                        </div>
                    </div>
                )}

                {/*<aside className={`bg-white text-subColor ${isMainSidebarOpen ? 'w-[260px]' : 'w-[0px] '} fixed left-0 top-[70px] h-[calc(100%-70px)] border-r  border-[#E4E4E4] transition-all duration-300`}>*/}
                <ul className="custom-siderbar-scrollbar ">
                    {menuItems && menuItems.map((item, index) => (
                        <SidebarItem key={index}
                                     menu={item}
                                     index={`parent-${index}`}
                                     level={'first-level'}
                                     setActiveMenu={handleClick}
                                     parentSlug={item.slug}
                                     activeMenu={activeMenu}
                        />
                    ))}
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;
