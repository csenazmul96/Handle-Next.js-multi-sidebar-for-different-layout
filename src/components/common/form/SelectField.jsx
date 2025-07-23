import React from "react";
import PropTypes from "prop-types";

const InputField = ({
                        id,
                        label,
                        name,
                        type,
                        value,
                        placeholder,
                        onChange,
                        layout,
                        error,
                    }) => {
    const isInline = layout === "inline";
    const hideLabel = layout === "noLabel";


    return (
        <div className={isInline ? "flex items-center gap-4 mb-4" : "mb-4"}>
            {!hideLabel && (
            <label
                htmlFor={id}
                className={`text-[15px] text-textColor font-bold flex pb-2 ${isInline ? "w-32 " : "block mb-2"}`}
            >
                {label}
            </label>
            )}
            <div className="w-full">

                <select name={name} className={`form-input-common-style ${
                    error ? "border-dangerColor " : "border-borderColor"
                }`} >
                    {children}

                </select>

                {error && <p className="mt-2 text-sm text-dangerColor">{error}</p>}
            </div>
        </div>
    );
};

export default InputField;
