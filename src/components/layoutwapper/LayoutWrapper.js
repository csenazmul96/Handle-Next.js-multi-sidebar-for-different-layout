"use client"
import Header from "@/components/Header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarProvider from "@/providers/SidebarProvider";
import MainContentWrapper from "@/components/layoutwapper/MainContentWrapper";


export default function LayoutProvider({ children }) {

    return (
        <>
            <SidebarProvider>
                <Header  />
                <Sidebar  />
                <MainContentWrapper>
                    {children}
                </MainContentWrapper>
            </SidebarProvider>
        </>
    );

}




