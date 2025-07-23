"use client"

import { useState } from "react"

function LmsStandardToggleSwitch({
                                     options,
                                     defaultValue,
                                     name,
                                     error = null,
                                     changeDataHandler,
                                     className }) {


    const [selectedValue, setSelectedValue] = useState(defaultValue || (options.length > 0 ? options[0].value : ""))

    const handleSelect = (value) => {
        setSelectedValue(value)
        if (changeDataHandler) {
            changeDataHandler(name, value)
        }
    }

    return (
        <div className={`flex rounded-[24px] bg-[#F0F0F0] w-fit ${className}`}>
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`px-4 py-2 h-[42px] text-[17px] font-medium rounded-[24px] transition-all ${selectedValue === option.value
                        ? "bg-themeColor text-white"
                        : "text-gray-500 hover:text-gray-700"}`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}

export default LmsStandardToggleSwitch

