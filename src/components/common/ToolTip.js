import React from "react";
import { Popover } from "flowbite-react";
import Image from "next/image";
import infoImg from "@/public/images/login-img.png";
import {Info} from "lucide-react";

function ToolTip({title, content}) {
    return (
        <div className="flex justify-center items-center">
            <Popover className={`rounded-0 shadow-none focus:outline-0 max-w-[360px] z-20`}
                content={
                    <div className="p-6 bg-white border border-commonBorderColor">
                        <div data-popper-arrow={false} className="hidden" />
                        <div
                            className="absolute w-4 h-4 bg-white border-l border-t border-commonBorderColor top-1/2 transform -translate-y-1/2 left-[-8px] rotate-[-45deg]"></div>
                        {title && <h2 className={`font-bold text-textColor text-base pb-3`}>{title}</h2>}
                        <p className={`text-textSubColor text-base whitespace-normal`}>{content}</p>
                    </div>
                }
                     placement="right"
                     trigger="hover"
                     arrow={false}
            >
                <button className="pl-2 leading-[20px] h-[auto]">
                    <span className=""><Info className={`size-[20px] text-textSubColor rotate-180 `} /></span>
                </button>
            </Popover>
        </div>
    );
}

export default ToolTip;
