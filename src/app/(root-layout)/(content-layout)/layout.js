import React from "react";

import ChapterSidebar from "@/app/(root-layout)/(content-layout)/components/ChapterSidebar";
import {getSidebarData} from "@/utils/helpers/CommonHelper";
import MainContentWrapper from "@/components/layoutwapper/MainContentWrapper";
 

export default async function layout({children}) {
    const groups = getSidebarData()
    console.log(groups)
    return(
        <>
            <ChapterSidebar groups={groups} />
            <MainContentWrapper >
                {children}
            </MainContentWrapper>

        </>
    );
}