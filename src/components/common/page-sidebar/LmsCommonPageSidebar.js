"use client";

import {useEffect, useRef} from "react";

import LmsCommonPageSidebarActions from "@/components/common/page-sidebar/LmsCommonPageSidebarActions";
import LmsCommonPageSidebarForm from "@/components/common/page-sidebar/LmsCommonPageSidebarForm";
import LmsCommonPageSidebarItem from "@/components/common/page-sidebar/LmsCommonPageSidebarItem";
import { useSidebar } from "@/custom-hooks/useSidebar";
import { usePageSidebarContext } from "@/store/PageSidebarContext";
import { useParams, usePathname } from "next/navigation";
import  {Folder} from "lucide-react";
import Link from 'next/link';
const LmsCommonPageSidebar = ({
                                  groups,
                                  showActions = true,
                                  apiPrefix = "",
                                  apiPostFix = "group",
                                  labels = { heading: "챕터분류" },
                                  editBtnText = "수정",
                                  deleteBtnText = "삭제",
                                  module = "",
                              }) => {
    const params = useParams();
    const pathName = usePathname();
    const { isMainSidebarOpen, isMobileSidebarOpen, isSidebarOpen, toggleSidebar } = useSidebar();
    const {
        openForm,
        setActiveDropdown,
        setCurrentGroup,
        setChapterGroup,
        setActiveContent,
    } = usePageSidebarContext();
    const menuRef = useRef(null);
    useEffect(() => {
        if (groups.length > 0) {
            let parentId = params.id?.length ? +params.id[0] : "";
            let secondId = params.id?.length > 1 ? +params?.id[1] : "";
            let thirdId = params.id?.length > 2 ? +params?.id[2] : "";

            let first = groups.find((item) => +item.id === parentId);
            let second = first?.subGroups.find((item) => +item.id === secondId);
            let third = second?.subGroups.find((item) => +item.id === thirdId);

            setActiveDropdown({
                first: first ?? null,
                second: second ?? null,
                third: third ?? null,
            });
            setCurrentGroup(
                third !== undefined
                    ? { ...third, level: 3 }
                    : second !== undefined
                        ? {
                            ...second,
                            level: 2,
                        }
                        : first !== undefined
                            ? { ...first, level: 1 }
                            : null
            );
        }
        setActiveContent(module);
    }, [params, pathName]);

    useEffect(() => {
        setChapterGroup(groups);
    }, [groups]);

    let mainPathname = pathName.split('?')[0];
    const mainPath = mainPathname.replace(/(\/\d+)+$/, '');
    const extractPath = pathName.split("/")
    const lastSegment = extractPath[extractPath.length - 1];
    return (
        <div
            className={`transition-all duration-300 chapterSidebar-container   bg-white  text-subColor ${
                isMainSidebarOpen  ? "left-[260px]" : "left-[0px]"
            }    ${
                isSidebarOpen ? "w-[315px] border-r  border-borderColor" : "w-[0px]"
            }  top-[70px] h-[calc(100%-70px)] fixed z-[70]`}
        >
            {
                <div
                    onClick={toggleSidebar}
                    className=" cursor-pointer flex  text-[13px] text-textSubColor leading-[18.2px] sidebar-collapse absolute top-5 right-[-32px] border-l-0 rounded-[8px]"
                >
                    {isSidebarOpen ? (
                        <img src="/images/content-management/collap close btn.png" alt="" />
                    ) : (
                        <img src="/images/content-management/collapsible.png" alt="" />
                    )}
                </div>
            }

            {isSidebarOpen && (
                <div className="p-6">
                    <h2
                        className={`text-baseNormal text-textColor pt-[56px] pb-[20px] font-bold border-b border-commonBorderColor mb-2`}
                    >
                        {labels.heading}
                    </h2>

                    <div className="custom-siderbar-scrollbar">

                        <ul className="custom-scrollbar h-[600px] flex flex-col gap-2" ref={menuRef}>
                            <li>
                                <div className={`${lastSegment === 'course' || lastSegment === 'evaluations' || lastSegment === 'video-management' || lastSegment === 'document-management'? 'bg-primaryLightColor text-themeColor font-bold' : ''} group flex items-center px-4 cursor-pointer hover:bg-primaryLightColor hover:text-themeColor`}>
                                    <Link href={mainPath}>
                                        <div className={`flex items-center   w-full gap-3`}>
                          <span className={`group-hover:fill-themeColor`}>
                            <Folder size={20}/>
                          </span>
                                            <span className={`py-3 w-full cursor-pointer`}>
                                <span>전체보기</span>
                              </span>
                                        </div>
                                    </Link>
                                </div>
                            </li>
                            {groups.map((item, index) => (
                                <LmsCommonPageSidebarItem
                                    key={index}
                                    menuRef={menuRef}
                                    menu={item}
                                    index={`parent-${index}`}
                                    level={1}
                                    slug={item.id}
                                />
                            ))}
                        </ul>
                    </div>
                    {showActions && (
                        <LmsCommonPageSidebarActions
                            apiPrefix={apiPrefix}
                            apiPostFix={apiPostFix}
                            tag={module}
                            editBtnText={editBtnText}
                            deleteBtnText={deleteBtnText}
                            headingMessage={"과정평가 삭제"}
                            deleteMessage={
                                "선택한 과정 평가를 삭제하시겠습니까? 등록된 과정에서도 평가가 삭제됩니다."
                            }
                        />
                    )}
                </div>
            )}
            {openForm && (
                <LmsCommonPageSidebarForm
                    apiPrefix={apiPrefix}
                    apiPostFix={apiPostFix}
                    tag={module}
                />
            )}
        </div>
    );
};

export default LmsCommonPageSidebar;
