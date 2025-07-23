
"use client";

import { useSidebar } from "@/custom-hooks/useSidebar";

const MobileSidebarOverlay = () => {
    const { isMobileView , isMainSidebarOpen, toggleMainSidebar  } = useSidebar();

    if (!isMobileView || !isMainSidebarOpen) return null;

    return (

        <div
            className="fixed inset-0 bg-[#2D2D2D] bg-opacity-20  z-[60]"
            onClick={toggleMainSidebar}
        />
    );
};

export default MobileSidebarOverlay;
