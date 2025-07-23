import React from 'react';
import {Button} from "@/components/common/button";
import {getSpecificPreviousDate} from "@/utils/helpers/CommonHelper";

const LmsStandardDatePeriodPicker = ({
                                         params,
                                         specificDateClick = ()=>{}
                                     }) => {
    return (
        <div
            className="time-filter flex items-center justify-center min-w-[170px] h-[48px] border border-borderColor p-2 placeholder-textColor text-[15px] bg-white">
            <Button
                onClick={() => specificDateClick(1)}
                className={`cursor-pointer min-w-[46px] h-[32px] ${params && getSpecificPreviousDate(1) === params.startDate ? 'text-themeColor bg-[#F4F9FF]' : ''}`}
            >1일</Button>
            <Button
                onClick={() => specificDateClick(7)}
                className={`cursor-pointer min-w-[46px] h-[32px] ${params && getSpecificPreviousDate(7) === params.startDate ? 'text-themeColor bg-[#F4F9FF]' : ''}`}
            >7일</Button>
            <Button
                onClick={() => specificDateClick(30)}
                className={`cursor-pointer min-w-[46px] h-[32px] ${params && getSpecificPreviousDate(30) === params.startDate ? 'text-themeColor bg-[#F4F9FF]' : ''}`}
            >30일</Button>
        </div>
    );
};

export default LmsStandardDatePeriodPicker;