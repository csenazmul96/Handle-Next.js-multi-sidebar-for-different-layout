import { ErrorMessage } from "@/components/common/fieldset";
import * as Headless from "@headlessui/react";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
// import Calendar from "react-calendar";
import './custom-datepicker.css';
import {Calendar, ChevronDown, ChevronLeft, ChevronRight} from "lucide-react";
import DatePickerMonthSelect from "@/components/common/form/date-picker/DatePickerMonthSelect";
import DatePickerYearSelect from "@/components/common/form/date-picker/DatePickerYearSelect";
const LmsStandardDatePicker = ({
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
                                   selectedStartDate = null,
                                   selectedEndDate = null,
                                   changeDataHandler = (name, value) => {},
                               }) => {
    const [currentDate, setDate] = useState(value ? value : "");
    const datePickerRef = useRef(null); // Create a ref for the DatePicker

    const handleIconClick = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setOpen(true); // Programmatically open the DatePicker
        }
    };
    useEffect(() => {
        if (value) {
            setDate(value);
        } else {
            setDate("");
        }
    }, [value]);

    const selectDate = (date) => {
        if (date) {
            setDate(format(date, "yyyy-MM-dd"));
            changeDataHandler(name, format(date, "yyyy-MM-dd"));
        } else {
            setDate("");
            changeDataHandler(name, "");
        }
    };


    const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    const months = [
        '1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월', '12월'
    ]

    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);

    return (
        <div className={`flex items-center ${
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
            <div className={` ${
                    singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]"
                }`}
            >
                <Headless.Field
                    className={`!pb-0 relative  ${fieldClass ? fieldClass : " "}`}
                >
                    <DatePicker
                        calendarClassName={"custom-datepicker "}
                        dateFormat="yyyy-MM-dd"
                        selectsStart={name !== 'endDate'}
                        selectsEnd={name === 'endDate'}
                        startDate={selectedStartDate}
                        endDate={selectedEndDate}
                        onCalendarClose={() =>{
                            setShowYearPicker(false)
                            setShowMonthPicker(false)
                        }}
                        minDate={name === 'endDate' ? selectedStartDate : null}
                        renderCustomHeader={({
                                                 date,
                                                 changeYear,
                                                 changeMonth,
                                                 decreaseMonth,
                                                 increaseMonth,
                                                 prevMonthButtonDisabled,
                                                 nextMonthButtonDisabled,
                                             }) => {
                            let year = ""
                            let month = ""
                            if (date) {
                                let newDate = new Date(date);
                                year = newDate.getFullYear();
                                month = newDate.getMonth() + 1;
                            }

                            return ( <div className={'w-full contents relative'}>
                                    <div className={'flex w-full min-w-full justify-between items-center relative py-2 px-3 pb-3'}>
                                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className={"size-[28px] rounded-full border border-commonBorderColor flex items-center justify-center"}><ChevronLeft size={16} className={`text-textSubColor`} /></button>
                                        <div className="flex">
                                            <button onClick={()=>setShowYearPicker(!showYearPicker)} className={`inline-flex gap-1`}>
                                                <span className={`text-14 font-medium`}>
                                                   {`${year}년 ${month}월`}
                                                </span>
                                                <ChevronDown size={16} className="text-textSubColor" />
                                            </button>
                                        </div>

                                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className={"size-[28px] rounded-full border border-commonBorderColor flex items-center justify-center"}><ChevronRight size={16} className={`text-textSubColor`} /></button>
                                    </div>


                                    <div className={'flex w-full min-w-full absolute'}>
                                        {showYearPicker &&
                                            <div className="p-1 relative  max-h-[210px] w-[267px] ">
                                                <div className=" w-full z-10 bg-white custom-scrollbar-w-6">
                                                    <div className="flex flex-col items-center justify-center">
                                                        {years.map((option) => (
                                                            <div
                                                                key={option}
                                                                onClick={() => {
                                                                    changeYear(option)
                                                                    setShowYearPicker(false);
                                                                    setShowMonthPicker(true);
                                                                }}
                                                                className={`${year === option ? "bg-themeColor text-white" : ""} cursor-pointer px-4 py-3 text-base rounded flex items-center justify-center text-center w-[132px] h-[36px]  text-textColor hover:bg-primaryLightColor hover:text-themeColor `}>
                                                                {option}
                                                            </div>
                                                        ))}
                                                    </div>

                                                </div>
                                            </div>
                                        }


                                        {showMonthPicker &&
                                            <div className="relative w-full min-w-full ">
                                                <div className="grid grid-cols-3 gap-[6px] cursor-pointe w-[250px] h-[218px] bg-white">
                                                    {months.map((option) => (
                                                        <div
                                                            key={option}
                                                            onClick={() => {
                                                                changeMonth(months.indexOf(option))
                                                                setShowYearPicker(false);
                                                                setShowMonthPicker(false);
                                                            }}
                                                            className={`${month === option ? "bg-themeColor text-white" : ""}  cursor-pointer px-4 py-3 text-base rounded flex items-center justify-center text-center h-[36px]  text-textColor hover:bg-primaryLightColor hover:text-themeColor `}>
                                                            {option}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )}}
                        selected={currentDate}
                        onChange={(date) => {
                            selectDate(date)
                        }}
                    />
                    <span onClick={handleIconClick} className="absolute right-3 transform top-1/2 -translate-y-1/2" >
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
export default LmsStandardDatePicker;