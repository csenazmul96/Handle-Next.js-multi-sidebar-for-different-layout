"use client";
import { ErrorMessage } from "@/components/common/fieldset";
import { Input } from "@/components/common/input";
import * as Headless from "@headlessui/react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LmsStandardInputField = ({
                                 required = false,
                                 fieldClass = "",
                                 singleElement = false,
                                 label = "",
                                 name = "",
                                 type = "text",
                                 value = "",
                                 error = null,
                                 maxLength = null,
                                 disabled = false,
                                 placeholder = "",
                                 errorClass = "!mt-0",
                                 vertical = false,
                                 size = "",
                                 changeDataHandler = (name, value) => {},
                                 enterKeyHandler = (name, e) => {},
                               }) => {
  const handleInputChange = (name, changeDataHandler) => (event) => {
    const value = type === "file" ? event.target.files[0] : event.target.value;
    changeDataHandler(name, value);
  };
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    if (type === "password") {
      setShowPassword(!showPassword);
    }
  };

  return (
      <div
          className={` ${vertical ? "" : "flex items-center"} ${
              singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]"
          }`}
      >
        {label && (
            <div
                className={`self-stretch flex items-center ${
                    vertical ? "pb-2" : "pl-6  min-w-[153px] bg-secondaryBgColor"
                }`}
            >
          <span className="common-label-style">
            {label}
            {required && <span className="text-dangerColor">*</span>}
          </span>
            </div>
        )}
        <div
            className={` ${
                singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]"
            }`}
        >
          <Headless.Field
              className={`!pb-0  ${fieldClass ? fieldClass : "w-[270px]"}  ${
                  type === "password" ? "relative" : ""
              }`}
          >
            <Input
                name={name}
                onKeyDown={(e) => enterKeyHandler(name, e)}
                disabled={disabled}
                maxLength={maxLength}
                type={showPassword ? showPassword : type}
                onChange={handleInputChange(name, changeDataHandler)}
                {...(type !== "file" && { value: value || "" })}
                size={size}
                invalid={error ? true : false}
                placeholder={placeholder}
            />
            {type === "password" && (
                <span
                    className={`absolute ${
                        error ? "top-1/3" : ""
                    } right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-medium`}
                    onClick={showPasswordHandler}
                >
              {!showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
            )}

            {error && (
                <ErrorMessage className={`${errorClass} absolute leading-15 truncate w-80`}>
                  {error}
                </ErrorMessage>
            )}
          </Headless.Field>
        </div>
      </div>
  );
};

export default LmsStandardInputField;
