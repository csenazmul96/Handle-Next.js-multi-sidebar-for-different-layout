import React from 'react';
import * as Headless from "@headlessui/react";
import {Input} from "@/components/common/input";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {ErrorMessage} from "@/components/common/fieldset";
import ToolTip from "@/components/common/ToolTip";

const FieldWrapper = ({label,
                          labelClass="",
                          tooltipTitle="",
                          tooltipContent="",
                          singleElement = false,
                          required,
                          vertical= false,
                          className,
                          childrenClasses='py-4',
                          children}) => {
    return (
        <div
            className={`flex ${vertical && "flex-col !border-none !py-4 !pr-0 !gap-2"} items-center pr-4  border-t border-commonBorderColor gap-4 ${className ? className : ""}`}>
            {label &&
                <div className={`pl-6 flex items-center min-w-[153px]  bg-secondaryBgColor self-stretch ${vertical && "bg-white !pl-0"} `}>
                    <span className= {`flex common-label-style ${labelClass ? labelClass : ""}`}>
                        {required && vertical &&  <span className="text-dangerColor mr-1">*</span> }
                        {label}
                        {required && !vertical &&  <span className="text-dangerColor">*</span> }
                    </span>
                    { tooltipContent && <ToolTip title={tooltipTitle} content={tooltipContent} /> }
                </div>
            }

            <div className={`${childrenClasses} ${vertical && "!py-0"} items-center gap-5 ${singleElement ? "w-full" : "flex flex-[0_1_auto]"}`}>
                {children}
            </div>


        </div>
    );
};

export default FieldWrapper;