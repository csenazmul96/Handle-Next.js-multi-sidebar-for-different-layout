'use client';

import React, {useState, useRef, useEffect} from "react";

import {GoChevronDown, GoChevronUp} from "react-icons/go";
import {Radio, RadioField} from "@/components/common/radio";
import * as Headless from "@headlessui/react";
import {Checkbox} from "@/components/common/checkbox";

const LmsOrganizationGroupList = ({ menu, index, setActiveMenu, activeMenu, level, parentSlug = "" , stage,  selectedId, setSelectedGroup}) => {
    const [isOpen, setIsOpen] = useState(false);

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
        if (submenuRef.current) {
            const totalHeight = getTotalHeight(submenuRef.current);
            submenuRef.current.style.maxHeight = isOpen ? `${totalHeight}px` : "0px";
        }
    }, [isOpen]);

    const clickHandler = () => {
        setSelectedGroup(menu)
    }

    const getCheckedStatus = () => {
        let status = false

        return status
    }


    return (
        <li key={menu.id} data-index={menu.id}>
            <div
                className={`group flex items-center px-5 py-3 cursor-pointer hover:bg-leftMenuHoverColor hover:text-themeColor pl-[calc(var(--multiplier)*24px)]
                 ${ level === "next-level" ? "pl-[36px]" : ""} ${selectedId === menu.id ? 'text-themeColor' : '' }`}

                style={{ "--multiplier": stage }}>
                <div className="flex items-center gap-3 w-full">
                    {/*<Headless.RadioGroup className="flex pl-[5px] space-y-0 mt-0"*/}
                    {/*                     onChange={() => setSelectedGroup(menu)}*/}
                    {/*                     value={selectedId}>*/}
                    {/*    <RadioField>*/}
                    {/*        <Radio color="lmsradio" value={menu.id} />*/}
                    {/*    </RadioField>*/}
                    {/*</Headless.RadioGroup>*/}
                    <Checkbox color="lmscheckbox"
                              className={'pl-2'}
                              name="discoverability"
                              checked={getCheckedStatus()}
                              clickHandler={clickHandler}
                              value="default"/>

                    <div className={'flex justify-between gap-3 w-full'}>
                    <span className={`hover:text-themeColor, cursor-pointer ${selectedId === menu.id ? 'text-themeColor' : '' }`}
                          onClick={() => toggleDropdown(menu.id)}>{menu.name}</span>
                        {menu.subOrganizationGroupList && (
                            <span className={`transition-transform duration-200`} onClick={() => toggleDropdown(menu.id)}>
                            {isOpen ? <GoChevronUp /> : <GoChevronDown/>}
                        </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Submenu with dynamic height transition */}
            {menu.subOrganizationGroupList && (
                <ul
                    ref={submenuRef}
                    className={`overflow-hidden transition-max-height duration-500 ease-in-out bg-white`}
                    style={{
                        maxHeight: isOpen ? `${getTotalHeight(submenuRef.current)}px` : "0px", // Dynamically set the max-height
                    }}
                >
                    {menu.subOrganizationGroupList.map((subItem, subIndex) => (
                        <LmsOrganizationGroupList
                            key={subItem.id}
                            menu={subItem}
                            index={`${index}-${subIndex}`}
                            setActiveMenu={setActiveMenu}
                            activeMenu={activeMenu}
                            selectedId={selectedId}
                            setSelectedGroup={setSelectedGroup}
                            level="next-level"
                            stage={stage + 1}
                            parentSlug={'#'} // Ensure consistent slug accumulation
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default LmsOrganizationGroupList;
