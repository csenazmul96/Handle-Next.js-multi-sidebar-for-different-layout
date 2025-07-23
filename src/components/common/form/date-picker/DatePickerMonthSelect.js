"use client"

import React from "react";

function DatePickerMonthSelect({changeMonth, setShowYearPicker, setShowMonthPicker}) {
    const months = [
        '1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월', '12월'
    ]

    return (
        <div className="relative inline-block w-full min-w-full text-left bg-white  ">
            <div className="grid grid-cols-3 gap-4 cursor-pointer  pb-10">
                {months.map((option) => (
                    <div
                        key={option}
                        onClick={() => {
                            changeMonth(months.indexOf(option))
                            setShowYearPicker(false);
                            setShowMonthPicker(false);
                        }}
                        className={``}>
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DatePickerMonthSelect;