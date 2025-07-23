import {ErrorMessage, Field} from "@/components/common/fieldset";
import {Select} from "@/components/common/select";
import React from "react";

const LmsStandardSelectInput = ({label = "",
                                    singleElement = false,
                                    fieldClass ="",
                                    optionValue = 'id',
                                    optionLabel = 'name',
                                    options = [],
                                    inline = false,
                                    required = false,
                                    error = null,
                                    initialText = null,
                                    name,
                                    value = '',
                                    classes='',
                                    size="",
                                    changeDataHandler = (name, value) => {}}) => {
    return (
        <div className= {`flex items-center ${singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]"}`}>
            {label &&
                <div className="pl-6 flex items-center min-w-[153px] bg-secondaryBgColor self-stretch">
                    <span className="common-label-style">
                        {label}
                        {required && <span className="text-dangerColor">*</span> }
                    </span>
                </div>
            }
            <div className= {` ${singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]"}`}>
                <Field className= {`!pb-0 ${fieldClass ? fieldClass : "w-[270px]"} `}>
                    <Select value={value || ""}
                            name={name}
                            size={size}
                            onChange={(e) => changeDataHandler(name, e.target.value)}>
                        {initialText && <option value="">{initialText}</option> }
                        {options && options.map(option =>
                            <option key={`option_item_${label}_${option[optionValue]}`}
                                    value={option[optionValue]}>
                                {option[optionLabel]}
                            </option>)
                        }
                    </Select>
                    {error && <ErrorMessage className="!mt-0">{error}</ErrorMessage>}
                </Field>
            </div>
        </div>
    );
}

export default LmsStandardSelectInput