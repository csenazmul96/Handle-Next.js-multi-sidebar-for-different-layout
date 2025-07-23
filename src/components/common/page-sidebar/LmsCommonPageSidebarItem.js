'use client';
import React, { useState, useRef, useEffect } from "react";
import { GoChevronDown } from "react-icons/go";
import {useParams, usePathname, useRouter} from "next/navigation";
import {usePageSidebarContext} from "@/store/PageSidebarContext";
import LmsCommonPageSidebarItem from "@/components/common/page-sidebar/LmsCommonPageSidebarItem";
import {ChevronDown, Folder} from "lucide-react";

const LmsPageSidebarItem = ({ menu, index, level,  slug, menuRef }) => {
    const {setCurrentGroup, currentGroup, activeDropdown} = usePageSidebarContext()
    const params = useParams()
    const urlPath = usePathname()
    const pathname = urlPath.split('/').slice(0, 3).join('/');
    const {replace} = useRouter();


    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (level === 1) {
            setIsActive(params.id?.length >= 1 && menu.id === +params?.id[0] ? true : false);
        } else if (level === 2) {
            setIsActive(params.id?.length > 1 && menu.id === +params?.id[1] ? true : false);
        } else if (level === 3) {
            setIsActive(params.id?.length > 2 && menu.id === +params?.id[2] ? true : false);
        }
    }, [activeDropdown]);



    const [isOpen, setIsOpen] = useState(isActive);
    const submenuRef = useRef(null);

    const toggleDropdown = (menu) => {
        setCurrentGroup(menu);
        // changeRoute(menu);
        setIsOpen((prev) => !prev);
        // setTimeout(()=>{
        //     if (menuRef.current) {
        //         menuRef.current.scrollTo({
        //             top: menuRef.current.scrollHeight,
        //             behavior: "smooth"
        //         });
        //     }
        // }, 200);

    };

    const getTotalHeight = (element) => {
        let totalHeight = 0;
        if (element) {
            totalHeight += element.scrollHeight; // Height of the current submenu
            const submenus = element.querySelectorAll("ul"); // Find nested ul elements
            submenus.forEach((submenu) => {
                totalHeight += submenu.scrollHeight; // Add height of nested submenus
            });
        }
        return totalHeight;
    };


    useEffect(() => {
        setIsOpen(isActive);
    }, [pathname, isActive]);

    useEffect(() => {
        if (submenuRef.current) {
            const totalHeight = getTotalHeight(submenuRef.current);
            submenuRef.current.style.maxHeight = isOpen ? `${totalHeight}px` : "0px";
        }
    }, [isOpen]);


    const changeRoute = (menu) => {
        let remakeSlug = slug
        if(level === 1 && params.id && menu.id ===  +params.id[0]){
            remakeSlug = ''
        } else if (level === 2 && params.id && params.id.length > 1 &&  menu.id ===  +params.id[1]) {
            remakeSlug = params?.id[0]
        }
        setCurrentGroup({...menu, level});
        replace(`${pathname}/${remakeSlug}`);
    }

    const hasSubGroups = menu.subGroups?.length;
    const isLevel1or2 = level === 1 || level === 2;
    const isLevel2or3 = level === 2 || level === 3;
    const isLevel1or3 = level === 1 || level === 3;
    const isOpenLevel1or2 = (level === 1 || level === 2) && isOpen;
    const isActiveLevel1or2 = (level === 1 || level === 2) && isActive;
    const isActiveLevel1or3 = (level === 1 || level === 3) && isActive;
    const isActiveLevel2 = level === 2 && isActive;
    const isOpenLevel2 = level === 2 && isOpen;

    const wrapperClasses = [
        "group", "flex", "items-center", "px-4", "h-[47px]", "cursor-pointer", "hover:text-themeColor",
        isLevel1or3 && "hover:bg-primaryLightColor",
        level === 2 && "ml-[36px] border-l border-borderColor border-l border-white",
        level === 3 && "ml-[56px] border-l border-borderColor pl-7 hover:border-themeColor",
        isActive && "text-themeColor font-bold",
        (menu.subGroups?.length || !menu.id) && "py-3",
        isActiveLevel1or3 && "bg-primaryLightColor font-bold",
        level === 3 && isActive && "border-l border-themeColor",
    ].filter(Boolean).join(" ");

    let spacingClass = "";

    if (isOpenLevel2 && hasSubGroups) {
        spacingClass = "mb-2";
    } else if (isActiveLevel2 && hasSubGroups) {
        spacingClass = "mb-2";
    } else {
        spacingClass = "mb-0";
    }

    let listGapClass = "";

    if (isActiveLevel1or2 && hasSubGroups) {
        listGapClass = "flex flex-col gap-2";
    } else if (isOpenLevel1or2 && hasSubGroups) {
        listGapClass = "flex flex-col gap-2";
    } else if (!isOpenLevel1or2) {
        listGapClass = "";
    }
    else {
        listGapClass = "";
    }


    return (
        <li key={menu.id} data-index={menu.id} className={listGapClass}>
            <div
                className={wrapperClasses}
            >
                <div className={`flex items-center w-full ${level > 1 ? "gap-0" : "gap-3"}`}>
                <span className={`group-hover:fill-themeColor ${isActive ? 'fill-themeColor' : ''}`}>
                    {level === 1 && <Folder size={20} />}
                </span>
                    <span onClick={() => changeRoute(menu)} className="w-full cursor-pointer py-3">
                    {menu.name}
                </span>
                </div>
                {menu.subGroups?.length > 0 && (
                    <span
                        onClick={() => toggleDropdown(menu)}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                    <ChevronDown size={16} />
                </span>
                )}
            </div>

            {/* Submenu */}
            {menu.subGroups && (
                <ul
                    ref={submenuRef}
                    className={`overflow-hidden transition-max-height duration-500 ease-in-out bg-white ${spacingClass}`}
                    style={{
                        maxHeight: isOpen ? `${getTotalHeight(submenuRef.current)}px` : "0px",
                    }}
                >
                    {menu.subGroups.map((subItem, subIndex) => (
                        <LmsCommonPageSidebarItem
                            key={subItem.id}
                            menu={subItem}
                            index={`${index}-${subIndex}`}
                            menuRef={menuRef}
                            level={level + 1}
                            slug={`${slug}/${subItem.id}`}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default LmsPageSidebarItem;
