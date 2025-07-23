import { ErrorMessage } from "@/components/common/fieldset";
import * as Headless from "@headlessui/react";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
// import Calendar from "react-calendar";
import { Calendar } from "lucide-react";
const LmsStandardDatePickerBackup = ({
                                   required = false,
                                   fieldClass = "",
                                   singleElement = false,
                                   label = "",
                                   name = "",
                                   value = "",
                                   error = null,
                                   disabled = false,
                                   placeholder = "",
                                   vertical = false,
                                   changeDataHandler = (name, value) => {},
                               }) => {
    const [startDate, setStartDate] = useState(value ? value : "");
    const datePickerRef = useRef(null); // Create a ref for the DatePicker

    const handleIconClick = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setOpen(true); // Programmatically open the DatePicker
        }
    };
    useEffect(() => {
        if (value) {
            setStartDate(value);
        } else {
            setStartDate("");
        }
    }, [value]);

    const selectDate = (date) => {
        if (date) {
            setStartDate(format(date, "yyyy-MM-dd"));
            changeDataHandler(name, format(date, "yyyy-MM-dd"));
        } else {
            setStartDate("");
            changeDataHandler(name, "");
        }
    };

    return (
        <div
            className={`flex items-center ${
                singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]"
            }`}
        >
            {label && (
                <div className="pl-6 flex items-center min-w-[153px] bg-secondaryBgColor self-stretch">
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
                    className={`!pb-0 relative  ${fieldClass ? fieldClass : " "}`}
                >
                    <DatePicker
                        ref={datePickerRef}
                        className="form-input-common-style placeholder-textSubColor  w-full"
                        selected={startDate}
                        disabled={disabled}
                        placeholderText={placeholder}
                        dateFormat="yyyy-MM-dd"
                        onChange={(date) => selectDate(date)}
                    />
                    <span
                        onClick={handleIconClick}
                        className="absolute right-3 transform top-1/2 -translate-y-1/2"
                    >
            {/*<img src="/images/membership/date-picker.png" alt=""/>*/}
                        {/*<Calendar size={20} color="#717171" strokeWidth={1.25} />*/}
                        <Calendar size={20} color="#8e8e8e" />
          </span>

                    {error && (
                        <ErrorMessage className="!mt-0 absolute leading-15">
                            {error}
                        </ErrorMessage>
                    )}
                </Headless.Field>
            </div>
        </div>
    );
};
export default LmsStandardDatePickerBackup;
