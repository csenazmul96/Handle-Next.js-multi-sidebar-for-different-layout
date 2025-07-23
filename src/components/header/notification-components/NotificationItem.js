"use client";
import React, { useState } from "react";
import { CalendarDays, Clock, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/common/button";
import { Checkbox } from "@/components/common/checkbox";

const NotificationItem = ({
                              id,
                              title,
                              author,
                              date,
                              time,
                              type,
                              isChecked,
                              onCheckboxChange,
                          }) => {
    const [showCheckbox, setShowCheckbox] = useState(false);

    const handleClickCheckbox = (checked) => {
        onCheckboxChange(checked);
    };

    const onClickHandler = (e) => {
        e.stopPropagation();
    };

    return (
        <li className="py-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <Button color="primaryLightBorderRoundedSmall">{type}</Button>

                <div className="flex items-center">
                    {!showCheckbox ? (
                        <button
                            onClick={() => setShowCheckbox(true)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <EllipsisVertical />
                        </button>
                    ) : (
                        <Checkbox
                            color="lmscheckbox"
                            name={`notification-${id}`}
                            checked={isChecked}
                            onClickHandler={onClickHandler}
                            clickHandler={handleClickCheckbox}
                            value="default"
                        />
                    )}
                </div>
            </div>

            <p className="text-textColor text-base font-bold line-clamp-2">{title}</p>

            <div className="flex items-center gap-2 justify-between text-textSubColor text-13">
                <div>{author}</div>
                <div className="flex gap-2">
                    <div className="gap-1 flex items-center">
                        <CalendarDays size={16} />
                        <span>{date}</span>
                    </div>
                    <div className="gap-1 flex items-center">
                        <Clock size={16} />
                        <span>{time}</span>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default NotificationItem;
