"use client";

import { useState, useEffect } from "react";
import { SidebarContext } from "@/context";

const SidebarProvider = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    const [isMobileView, setIsMobileView] = useState(false);
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentModule, setCurrentModule] = useState("");

    function debounce(func, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    }

    useEffect(() => {
        const updateLayout = () => {

            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;

            let isCurrentlyMobile = false;

            if (currentWidth < 1025) {
                isCurrentlyMobile = true;
            } else if (currentWidth >= 1025 && currentWidth < currentHeight) {

                isCurrentlyMobile = true;
            }

            setIsMobileView(isCurrentlyMobile);
            if (isCurrentlyMobile) {
                setIsMainSidebarOpen(false);
                setIsSidebarOpen(false);
            } else {
                setIsMainSidebarOpen(true);
            }
        };

        const debouncedResize = debounce(updateLayout, 150);

        const handleOrientationChange = () => {

            setTimeout(() => {
                updateLayout();
            }, 50);
        };

        updateLayout(); // run once on mount

        window.addEventListener("resize", debouncedResize);
        window.addEventListener("orientationchange", handleOrientationChange);
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) updateLayout();
        });

        setHasMounted(true);

        return () => {
            window.removeEventListener("resize", debouncedResize);
            window.removeEventListener("orientationchange", handleOrientationChange);
            document.removeEventListener("visibilitychange", updateLayout);
        };
    }, []);



    const toggleMainSidebar = () => {
        if (typeof window !== "undefined" && window.innerWidth < 1025) {
            setIsMainSidebarOpen((prev) => !prev);
        } else {
            setIsMainSidebarOpen((prev) => !prev);
        }
    };

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    if (!hasMounted) return null;

    return (
        <SidebarContext.Provider
            value={{
                isMainSidebarOpen,
                setIsMainSidebarOpen,
                isSidebarOpen,
                setIsSidebarOpen,
                toggleMainSidebar,
                toggleSidebar,
                currentModule,
                setCurrentModule,
                isMobileView,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
