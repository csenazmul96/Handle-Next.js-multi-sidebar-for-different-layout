import React from 'react';
import * as Headless from "@headlessui/react";
import {Input} from "@/components/common/input";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {ErrorMessage} from "@/components/common/fieldset";

const FilterFormWrapper = ({label, singleElement = false, required,  className, children, isHalfWidth = false }) => {
    return (
        <div
            className={`flex items-center py-8 gap-6   ${isHalfWidth ? "w-1/2" : "w-full"} ${className ? className : ""}`}>
            {label &&
                <div className="flex items-center min-w-[100px] self-stretch">
                    <span className="common-label-style">
                         {label}
                        {required && <span className="text-dangerColor">*</span>}
                    </span>
                </div>
            }

            <div className={`flex items-center gap-4 ${singleElement ? "w-full" : "flex-[0_1_auto]"}`}>
                {children}
            </div>

        </div>
    );
};

export default FilterFormWrapper;