'use client'
import {
    Pagination,
    PaginationList,
    PaginationNext,
    PaginationPage,
    PaginationPrevious
} from "@/components/common/pagination";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import React, {Fragment, useEffect, useState} from "react";
import {usePathname,useRouter, useSearchParams} from "next/navigation";


const LmsPaginations = ({pagination, pageSize}) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const {replace} = useRouter();
    const pathname = usePathname();

    let current_page = pagination?.page
    let last_page = 1

    if(pagination){
        last_page = Math.ceil(pagination.total/pagination.size)
    }

    const [visiblePages, setVisiblePages] = useState([]);

    const generatePages = () => {
        const visibleCount = pageSize ? pageSize : 5;
        const half = Math.floor(visibleCount / 2);

        let pages = [];

        pages.push(1);

        if (current_page > half + 2) {
            pages.push("...");
        }

        for (let i = Math.max(current_page - half, 2); i <= Math.min(current_page + half, last_page - 1); i++) {
            pages.push(i);
        }

        if (current_page < last_page - half - 1) {
            pages.push("...");
        }

        pages.push(last_page);

        setVisiblePages(pages);
    };

    useEffect(()=>{
        generatePages()
    }, [pagination])


    const paginationBtnHandler = (page) => {
        if (page === pagination.current_page)
            return;
        params.set('page', page)
        params.set('size', searchParams.get('size') ? searchParams.get('size') : pageSize);
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            {pagination && pagination.total > pagination.size && visiblePages.length ?
                <div className="pagination flex items-center justify-center pt-10">
                    <Pagination>
                        <PaginationPrevious disable={current_page === 1 ? true : false}
                                            clickEvent={() => paginationBtnHandler(current_page - 1)}>
                            <span><MdChevronLeft/></span> <span>이전</span>
                        </PaginationPrevious>

                        <PaginationList>
                            {visiblePages.map((page, i) => (
                                <Fragment  key={`page${i}`}>
                                    {(page) === current_page ? (
                                        <PaginationPage className="!text-white" current> {page}</PaginationPage>
                                    ) : (
                                        <>
                                            {page === '...' ?
                                                <div>
                                                    <PaginationPage className={'cursor-pointer'}> {page} </PaginationPage>
                                                </div>
                                                :
                                                <div onClick={() => paginationBtnHandler(page)}>
                                                    <PaginationPage className={'cursor-pointer'}> {page} </PaginationPage>
                                                </div>
                                            }
                                        </>
                                    )}
                                </Fragment>
                            ))}
                        </PaginationList>

                        <PaginationNext disable={current_page === last_page ? true : false}
                                        className={'cursor-pointer'}
                                        clickEvent={() =>  paginationBtnHandler( current_page + 1)}>
                            <span>다음</span> <span><MdChevronRight/></span>
                        </PaginationNext>
                    </Pagination>
                </div>
                : ''
            }
        </>
    );
}

export default LmsPaginations