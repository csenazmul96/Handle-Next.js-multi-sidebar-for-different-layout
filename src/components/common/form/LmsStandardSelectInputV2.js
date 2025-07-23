"use client"

import React, {useEffect, useRef, useState} from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';

const LmsStandardSelectInputV2 = ({label = "",
                                      singleElement = false,
                                      fieldClass ="",
                                      optionValue = 'id',
                                      optionLabel = 'name',
                                      options = [],
                                      inline = false,
                                      required = false,
                                      error = null,
                                      initialText = null,
                                      initialValue = "",
                                      name,
                                      value = '',
                                      classes='',
                                      size="",
                                      changeDataHandler = (name, value) => {}}) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (option) => {
        changeDataHandler(name, option[optionValue])
        setOpen(false);
    };

    const getValue = () => {
        let name = ""

        if (options.length > 0 && value !== undefined) {
            const selectedOption = options.find(option => ""+option[optionValue] === ""+value);
            if (selectedOption) {
                name = selectedOption[optionLabel];
            } else {
                name = initialText || '선택';
            }
        }

        return name
    }

    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);


    return (
        <>
        <div ref={dropdownRef} className={`relative inline-block  text-left ${classes ? classes : "w-[270px]"} `}>
            <button
                onClick={() => setOpen(!open)}
                className={`w-full border relative ${size ? size : ""}  overflow-hidden border-borderColor h-[48px] px-4 py-2 bg-white flex justify-between items-center focus:outline-none ${open === true ? 'border-inputColor' : 'border-borderColor'}`}
            >
                <span className={`text-base`}>
                  {getValue()}
                </span>
                <span className={`absolute top-1/2 -translate-y-1/2 bg-white pr-3 right-0`}>
                {!open ?
                    <ChevronDown size={24} className="text-textSubColor" />
                    :
                    <ChevronUp size={24} className="text-textSubColor" />
                }
                </span>
            </button>

            {open && (
                <div className={`absolute mt-[-2px]  z-30 bg-white border ${fieldClass ? fieldClass : "w-[270px]"} border-borderColor`}>
                    <div className="custom-scrollbar">
                        {initialText &&
                            <div
                                key={`option_item_${initialText}`}
                                onClick={(e) => handleSelect({[optionValue]: initialValue, [optionLabel]: initialText})}
                                className={`cursor-pointer px-4 min-h-[48px] py-3 text-base text-textColor hover:bg-primaryLightColor hover:font-bold hover:text-themeColor ${
                                    value === initialValue ? 'bg-primaryLightColor text-themeColor' : 'text-textColor'
                                }`}
                            >
                                {initialText}
                            </div>
                        }
                        {options.map((option) => (
                            <div
                                key={`option_item_${label}_${option[optionValue]}`}
                                onClick={(e) => handleSelect(option)}
                                className={`cursor-pointer px-4 min-h-[48px] py-3 text-base text-textColor hover:bg-primaryLightColor hover:font-bold hover:text-themeColor ${
                                    value === option[optionValue] ? 'bg-primaryLightColor text-themeColor' : 'text-textColor'
                                }`}
                            >
                                {option[optionLabel]}
                            </div>
                        ))}
                    </div>

                </div>
            )}
            {error && <span className="mt-1 pt-1 text-red-700">{error}</span>}
        </div>
        </>
    );
};

export default LmsStandardSelectInputV2;
