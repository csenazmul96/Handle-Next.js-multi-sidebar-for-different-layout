import React from 'react';

function DatePickerYearSelect({changeYear, setShowYearPicker, setShowMonthPicker}) {
    const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

    return (
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
    );
}

export default DatePickerYearSelect;