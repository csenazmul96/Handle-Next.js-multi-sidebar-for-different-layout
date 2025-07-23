"use client";

import {useParams, usePathname} from "next/navigation";
import LmsCommonPageSidebar from "@/components/common/page-sidebar/LmsCommonPageSidebar";
import {useContentContext} from "@/store/ContentContext";
import {useEffect} from "react";

const Sidebar = ({groups}) => {
    const params = useParams()
    const pathName = usePathname()
    const { setActiveContent} = useContentContext();
    const {setChapterGroup} = useContentContext();

    useEffect(() => {
        if (pathName) {
            if (pathName.includes('document-management')) {
                setActiveContent('document')
            } else if (pathName.includes('video-management')) {
                setActiveContent('video')
            }
        }
    }, [params, pathName]);

    useEffect(() => {
        setChapterGroup(groups)
    }, [groups]);


    let mainPathname = pathName.split('?')[0];
    const mainPath = mainPathname.replace(/(\/\d+)+$/, '');

    return (
        <>
            { (mainPath === '/content-management/video-management' || mainPath === '/content-management/document-management') &&
            <LmsCommonPageSidebar groups={groups} module={`content-group`}
                                  labels={{heading: "챕터분류"}}
                                  editBtnText={'수정'}
                                  deleteBtnText={'삭제'}
                                  apiPrefix={'/lms-content-curriculum/api/v1/private/content'}
                                  apiPostFix={'group'} />
            }
        </>

    );
};

export default Sidebar;
