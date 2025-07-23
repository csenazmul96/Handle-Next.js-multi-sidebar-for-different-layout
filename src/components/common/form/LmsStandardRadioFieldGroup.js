import {Radio, RadioField} from "@/components/common/radio";
import {Label} from "@/components/common/fieldset";
import React from "react";
import {RadioGroup} from "@headlessui/react";

const LmsStandardRadioFieldGroup = ({   value,
                                        label,
                                        fieldClass ="",
                                        singleElement = false,
                                        inline = false,
                                        classes= '',
                                        optionValue = 'id',
                                        optionLabel = 'name',
                                        name,
                                        options= [],
                                        required= false,
                                        error = null,
                                        changeDataHandler}) => {

    return (
        <div className= {`flex items-center ${singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]"}`}>
            {label &&
                <div className="pl-6 flex items-center min-w-[153px] bg-secondaryBgColor self-stretch">
                    <span className="common-label-style">
                        {label}
                        {required && <span className="text-dangerColor">*</span>}
                    </span>
                </div>
            }
            <div className= {`${singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]"}`}>
                <RadioGroup className="flex  space-x-4"
                            name={name}
                            value={value === undefined ? '' : value}
                            onChange={(event) => changeDataHandler(name, event)}
                            defaultValue={value}>
                    {options.map((item)=>(
                        <RadioField key={item[optionValue]} className={'cursor-pointer'}>
                            <Radio color="lmsradio"
                                   value={item[optionValue]}
                                   id={`${name}_${item[optionLabel]}`}
                                   disabled={item.disabled || false}
                            />
                            <Label className="font-normal cursor-pointer" htmlFor={`${name}_${item[optionLabel]}`}>{item[optionLabel]}</Label>
                        </RadioField>
                    ))}

                </RadioGroup>
            </div>
        </div>
    );
}

export default LmsStandardRadioFieldGroup