"use client";

import {useSidebar} from "@/custom-hooks/useSidebar";
import {usePathname} from "next/navigation";
import FooterContent from "@/components/footer/FooterContent";

const Footer = () => {

    const {isMainSidebarOpen, isSidebarOpen} = useSidebar();
    let pathname = usePathname();
    pathname = pathname.split('?')[0];
    const mainPath = pathname.replace(/(\/\d+)+$/, '');


    const showSidebarPaths = [
        '/curriculum/evaluations',
        '/content-management/video-management',
        '/content-management/document-management',
        '/curriculum/course',
    ]

    let paddingLeft = isMainSidebarOpen ? 'pl-[308px]' : 'pl-[48px]';

    if (showSidebarPaths.includes(mainPath)) {
        if (isMainSidebarOpen && isSidebarOpen) {
            paddingLeft = 'pl-[650px]';
        } else if (!isMainSidebarOpen && isSidebarOpen) {
            paddingLeft = 'pl-[400px]';
        } else if (isMainSidebarOpen && !isSidebarOpen) {
            paddingLeft = 'pl-[308px]';
        } else {
            paddingLeft = 'pl-[48px]';
        }
    }
    return (
        <footer className={` ${paddingLeft} py-[16px] pr-[48px] footer border-t border-commonBorderColor`}>
            <FooterContent />
        </footer>

    );
};

export default Footer;