import {ErrorMessage, Field} from "@/components/common/fieldset";
import {Input} from "@/components/common/input";
import React, {useState} from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import * as Headless from '@headlessui/react'
import {IoSearchOutline} from "react-icons/io5";
import {Search} from "lucide-react";

const LmsSearchInput = ({   required = false,
                                   fieldClass ="",
                                   singleElement = false,
                                   label = '',
                                   name = '',
                                   type = 'text',
                                   value = '',
                                   error = null,
                                   placeholder = '',
                                   vertical = false,
                                    onClick = () => {},
                                   changeDataHandler = (name, value) => {},
                                    onKeyUp = (name, e) => {}}) => {
    const handleInputChange = (name, changeDataHandler) => (event) => {
        const value = event.target.value;
        changeDataHandler(name, value);
    };


    return (
        <div className= {`flex items-center w-full ${singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]"}`}>
            {label &&
                <div className="pl-6 flex items-center min-w-[153px] bg-secondaryBgColor self-stretch">
                    <span className="common-label-style">
                         { label }
                        {required && <span className="text-dangerColor">*</span> }
                    </span>
                </div>
            }
            <div className= {`w-full ${singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]"}`}>
                <Headless.Field className={`!pb-0 flex relative ${fieldClass ? fieldClass : "w-full"}`}>

                    <Input name={name}
                           type={type}
                           onClick={onClick}
                            value={value}
                           onKeyUp={(e) => onKeyUp(name, e)}
                           onChange={handleInputChange(name, changeDataHandler)}
                           invalid={error? true : false}
                           placeholder={placeholder} className={`w-full`}/>
                    <span className={`bg-white pl-5 cursor-pointer z-10 absolute right-4 top-1/2 transform -translate-y-1/2`}>
                        {/*<img src="/images/search.png" alt="search"/>*/}
                        <Search size={24} className={`text-placeholderColor`} />
                    </span>

                    {error && <ErrorMessage className="!mt-0 absolute leading-15">{error}</ErrorMessage>}
                </Headless.Field>
            </div>
        </div>
    );
}

export default LmsSearchInput