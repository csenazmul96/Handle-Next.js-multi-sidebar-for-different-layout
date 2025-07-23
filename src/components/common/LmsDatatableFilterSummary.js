"use client";

import {Button} from "@/components/common/button";
import {RotateCw, X, ChevronRight} from "lucide-react";
import React from "react";
import { usePathname, useRouter, useSearchParams} from "next/navigation";

function LmsDatatableFilterSummary({filterCriteria}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleReset = () => {
        replace(`${pathname}`);
    }

    const removeFilter = (key) => {
        const params = Object.fromEntries(searchParams.entries());
        if (key === 'startDate') {
            delete params['endDate'];
        }

        delete params[key];
        replace(`${pathname}?${new URLSearchParams({...params, page: 1})}`);
    }

    return (
        <div className="flex border border-borderColor flex-col bg-white rounded-[4px] mb-8">
            <div className="flex p-2">
                <div className="flex items-center justify-between w-full">
                    <div className="space-x-2">
                        <span> <span className={"common-label-style"}>적용 필터</span> <span className={"text-themeColor"}>{filterCriteria.length}</span> <span className={"text-placeholderColor"}>|</span> </span>
                        {filterCriteria && filterCriteria.length > 0 ?
                            <>
                                {filterCriteria && filterCriteria.map((criteria, index) => (
                                    <Button
                                        onClick={() => removeFilter(criteria.paramsName)}
                                        color="transparentRoundedSmall" key={'tag' + index} className={'cursor-pointer'}>
                                        {criteria.label} <ChevronRight size={13} /> {criteria.value}
                                        <span><X size={13}/></span>
                                    </Button>
                                ))}
                            </>
                            :
                            <span>적용된 필터가 없습니다.</span>
                        }
                    </div>

                    <div className="flex">
                        {filterCriteria && filterCriteria.length > 0 &&
                            <Button color="transparentSmall" onClick={handleReset} className="min-w-[auto] w-[80px] h-[28px] !pl-3 !pr-3 cursor-pointer !text-[13px]">
                                <span> <RotateCw size={16} /> </span>  초기화
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LmsDatatableFilterSummary;