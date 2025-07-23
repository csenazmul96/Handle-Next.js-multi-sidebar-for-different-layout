import { ErrorMessage } from "@/components/common/fieldset";
import * as Headless from "@headlessui/react";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker/custom-datepicker.css'; // We'll add custom styles here

import {Calendar as ClendarIcon} from "lucide-react";
import DateRangePicker from "@/components/common/form/date-picker/DateRangePicker";
const NewDatePicker2 = ({
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
    const [startDate, setStartDate] = useState(value ? value : "");
    const datePickerRef = useRef(null); // Create a ref for the DatePicker


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

    const koreanMonths = [
        '1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월', '12월'
    ];

    const [range, setRange] = useState(["2025-07-01", "2025-07-10"]);


    const patchKoreanMonths = () => {
        const labels = document.querySelectorAll('.react-calendar__year-view__months__month');
        labels.forEach((el, i) => {
            if (el.innerText !== koreanMonths[i]) {
                el.innerText = koreanMonths[i];
            }
        });
    };

    const containerRef = useRef(null);
    const checkClick = () => {

        const observer = new MutationObserver(() => {
            patchKoreanMonths();
        });
        if (containerRef.current) {
            observer.observe(containerRef.current, { childList: true, subtree: true });
        }

        return () => observer.disconnect();
    }
    const [pickerKey, setPickerKey] = useState(0);
    const resetCalander = () => {
        setPickerKey(prev => prev + 1);
    }

    return (
        <div className={`flex items-center ${ singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]" }`}>
            {label && (
                <div className="pl-6 flex items-center min-w-[153px] bg-secondaryBgColor self-stretch">
                  <span className="common-label-style">
                        {label}
                      {required && <span className="text-dangerColor">*</span>}
                  </span>
                </div>
            )}
            <div className={` ${ singleElement ? "flex-[0_1_auto] w-full" : "flex-[0_1_auto]" }`} >
                <Headless.Field className={`!pb-0 relative  ${fieldClass ? fieldClass : " "}`} >

                    <DatePicker
                        selected={startDate}
                        onChange={selectDate}
                        selectsStart={name !== 'endDate'}
                        selectsEnd={name === 'endDate'}
                        className={"custom-datepicker"}
                        startDate={selectedStartDate}
                        endDate={selectedEndDate}
                        minDate={name === 'endDate' ? selectedStartDate : null}
                        placeholderText="YYYY-MM-DD"
                    />
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
export default NewDatePicker2;

// <DateRangePicker
//     name={'startDate'}
//     value={params?.startDate}
//     placeholder={'YYYY-MM-DD'}
//     selectedStartDate={params?.startDate}
//     selectedEndDate={params?.endDate}
//     changeDataHandler={handleOnChnage}
// />
//
// <DateRangePicker
//     name={'endDate'}
//     value={params?.endDate}
//     placeholder={'YYYY-MM-DD'}
//     selectedStartDate={params?.startDate}
//     selectedEndDate={params?.endDate}
//     changeDataHandler={handleOnChnage}
// />