'use client';
import React, { useState, useRef, useEffect } from "react";
import "./Sidebar.css";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ChevronDown} from "lucide-react";
import {useSession} from "next-auth/react";

const SidebarItem = ({ menu, index, setActiveMenu, activeMenu, level, parentSlug = "" }) => {
    const { data: session } = useSession();
    const permissions = session?.permissions || [];
    const pathname = usePathname();

    const generateLink = (menu, parentSlug = "") => {

        if (!menu.slug) return "/";

        const normalizedParentSlug = parentSlug.replace(/\/$/, ""); // Remove trailing slash
        const normalizedSlug = menu.slug.replace(/^\//, "");

        if (normalizedParentSlug.endsWith(`/${normalizedSlug}`)) {
            return normalizedParentSlug;
        }

        const finalLink = normalizedParentSlug ? `/${normalizedParentSlug}/${normalizedSlug}`.replace("//", "/") : `/${normalizedSlug}`;

        // console.log(`Generated link for ${menu.label}:`, finalLink);
        return finalLink;
    };

    const menuLink = generateLink(menu, parentSlug);

    const isActive = menuLink === "/" ? pathname === "/" : pathname.startsWith(menuLink) && pathname !== "/";

    // console.log(`Menu: ${menu.label}, MenuLink: ${menuLink}, Pathname: ${pathname}, Active: ${isActive}`);


    const [isOpen, setIsOpen] = useState(isActive);
    const submenuRef = useRef(null);


    const toggleDropdown = (slug) => {
        setActiveMenu(slug);
        setIsOpen((prev) => !prev); // Toggle the open state
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
        if (pathname === "/") {
            setIsOpen(false);
        }
    }, [pathname]);


    useEffect(() => {
        setIsOpen(isActive);
    }, [pathname, isActive]);

    useEffect(() => {
        if (submenuRef.current) {
            const totalHeight = getTotalHeight(submenuRef.current);
            submenuRef.current.style.maxHeight = isOpen ? `${totalHeight}px` : "0px";
        }
    }, [isOpen]);



    let check = true

    if (menuLink !== '/') {
        // check = localPermissions.some(perm => permissions.includes(perm));
    }

    let testActive = pathname.includes(menuLink) ? true : false;

    return (
        <>
            {check &&
                <li key={menu.id} data-index={menu.id}>
                    <div
                        className={`group flex items-center px-5 cursor-pointer hover:bg-leftMenuHoverColor hover:text-themeColor ${
                            level === "next-level" ? "pl-[36px]" : ""} ${(pathname === menuLink) || testActive? "bg-[#F4F9FF] text-themeColor font-bold" : ""}
                    ${isActive && level !== "next-level" ? "bg-leftMenuHoverColor font-bold" : ""}
                    ${isActive && pathname !== menuLink ? "text-themeColor" : ""} ${isActive ? 'text-themeColor' : ''} ${menu.dropdown ? "py-[13.5px]" : !menu.slug ? "py-[13.5px]" : ""}`}
                        onClick={() => toggleDropdown(menu.slug)}
                    >
                        <div className="flex items-center gap-3 w-full">
                            <span className={`group-hover:fill-themeColor ${isActive ? 'fill-themeColor' : ''}`}>{menu.icon}</span>
                            {menu.dropdown ? (
                                <span className={`hover:text-themeColor ${isActive ? 'text-themeColor' : ''}`}>{menu.label}</span>
                            ) : (
                                <Link href={menuLink} className={`py-[13.5px] w-full`}>
                                    <span className={`hover:bg-leftMenuHoverColor hover:text-themeColor ${isActive ? 'text-themeColor' : ''}`}>{menu.label}</span>
                                </Link>
                            )}
                        </div>
                        {menu.dropdown && (
                            <span
                                className={`transition-transform duration-200 ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                            >
                        <ChevronDown size={16} />
                    </span>
                        )}
                    </div>

                    {/* Submenu with dynamic height transition */}
                    {menu.dropdown && (
                        <ul
                            ref={submenuRef}
                            className={`overflow-hidden transition-max-height duration-500 ease-in-out bg-white`}
                            style={{
                                maxHeight: isOpen ? `${getTotalHeight(submenuRef.current)}px` : "0px", // Dynamically set the max-height
                            }}
                        >
                            {menu.dropdown.map((subItem, subIndex) => (
                                <SidebarItem
                                    key={subItem.id}
                                    menu={subItem}
                                    index={`${index}-${subIndex}`}
                                    setActiveMenu={setActiveMenu}
                                    activeMenu={activeMenu}
                                    level="next-level"
                                    parentSlug={menuLink} // Ensure consistent slug accumulation
                                />
                            ))}
                        </ul>
                    )}
                </li>
            }
        </>

    );
};

export default SidebarItem;
