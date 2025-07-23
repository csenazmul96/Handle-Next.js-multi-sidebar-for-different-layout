import React from "react";
import PropTypes from "prop-types";

const RadioButtonGroup = ({ options, name, value, onChange, layout }) => {
    const isInline = layout === "inline";

    return (
        <div className={isInline ? "flex items-center gap-4" : "flex flex-row gap-2"}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className="flex items-center gap-2 text-[15px] text-textColor font-medium cursor-pointer"
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                        className="form-radio"
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default RadioButtonGroup;
