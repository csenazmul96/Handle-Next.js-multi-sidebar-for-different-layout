import React from "react";

import ChapterSidebar from "@/app/(root-layout)/(content-layout)/components/ChapterSidebar";
import {getSidebarData} from "@/utils/helpers/CommonHelper";
 

export default async function layout({children}) {
    const groups = getSidebarData()
    return(
        <>
            <ChapterSidebar groups={groups} />

                {children}


        </>
    );
}