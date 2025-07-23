import React from "react";
import PropTypes from "prop-types";

const InputField = ({
                        id,
                        label,
                        type,
                        name,
                        value= "",
                        onChange,
                        placeholder,
                        layout,
                        error,
                    }) => {
    const isInline = layout === "inline";
    const hideLabel = layout === "noLabel";



    return (
        <div className={isInline ? "flex items-center gap-4 mb-4 w-full" : " w-full mb-4"}>
            {!hideLabel && (
            <label
                htmlFor={id}
                className={`text-[15px] text-textColor font-bold flex pb-2 ${isInline ? "w-32 " : "block mb-2"}`}
            >
                {label}
            </label>
            )}
            <div className="w-full">
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className={`form-input-common-style ${
                        error ? "border-dangerColor " : "border-borderColor"
                    }`}
                />
                {error && <p className="mt-2 text-sm text-dangerColor">{error}</p>}
            </div>
        </div>
    );
};

export default InputField;
