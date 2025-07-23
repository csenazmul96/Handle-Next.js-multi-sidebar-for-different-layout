import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import './custom-datepicker.css';
import {ChevronDown} from "lucide-react";
import {format} from "date-fns";


export default function DateRangePicker({
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
                                        }) {
    const [currentDate, setDate] = useState(value ? value : "");

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
        <div className={"form-input-common-style"}>
            <DatePicker
                calendarClassName={"custom-datepicker "}
                dateFormat="yyyy-MM-dd"
                selectsStart={name !== 'endDate'}
                selectsEnd={name === 'endDate'}
                startDate={selectedStartDate}
                endDate={selectedEndDate}
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

                    return ( <div className={'w-full contents '}>
                            <div className={'flex w-full min-w-full react-calendar__navigation'}>
                                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className={"react-calendar__navigation__arrow react-calendar__navigation__prev-button"}></button>
                                <button onClick={()=>setShowYearPicker(!showYearPicker)} className={`inline-flex react-calendar__navigation__label`}>
                                        <span className={`react-calendar__navigation__label__labelText react-calendar__navigation__label__labelText--from`}>
                                           {`${year}년 ${month}월`}
                                        </span>
                                    <ChevronDown size={24} className="text-textSubColor" />
                                </button>
                                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className={"react-calendar__navigation__arrow react-calendar__navigation__next-button"}></button>
                            </div>


                            <div className={'flex w-full min-w-full absolute'}>
                                {showYearPicker &&
                                    <div className="relative inline-block w-full min-w-full text-left">
                                        <div className="mt-[-2px] w-full z-10 bg-white border border-borderColor react-calendar__decade-view__years">
                                            {years.map((option) => (
                                                <div
                                                    key={option}
                                                    onClick={() => {
                                                        changeYear(option)
                                                        setShowYearPicker(false);
                                                        setShowMonthPicker(true);
                                                    }}
                                                    className={`cursor-pointer px-4 py-3 text-base text-textColor hover:bg-primaryLightColor hover:text-themeColor  react-calendar__tile react-calendar__decade-view__years__year`}>
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                                {showMonthPicker &&
                                    <div className="relative inline-block w-full min-w-full text-left bg-white  ">
                                        <div className="grid grid-cols-3 gap-4 cursor-pointer react-calendar__year-view__months pb-10">
                                            {months.map((option) => (
                                                <div
                                                    key={option}
                                                    onClick={() => {
                                                        changeMonth(months.indexOf(option))
                                                        setShowYearPicker(false);
                                                        setShowMonthPicker(false);
                                                    }}
                                                    className={`react-calendar__tile react-calendar__year-view__months__month`}>
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
        </div>
    );
}

