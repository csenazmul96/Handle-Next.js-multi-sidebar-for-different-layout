"use client"
import {SessionProvider} from "next-auth/react";
import {RoleContextProvider} from "@/store/RoleContext";
import {OrganizationContextProvider} from "@/store/OrganizationContext"
import {MemberProvider} from "@/store/MembersContext"
import {ContentProvider} from "@/store/ContentContext"
import {PageSidebarProvider} from "@/store/PageSidebarContext"
import {DataTableProvider} from "@/store/DataTableContext"
import SidebarProvider from "@/providers/SidebarProvider";
import {CurriculumProvider} from "@/store/CurriculumContext";
import {AuthContextProvider} from "@/store/AuthContext";

export default function Provider({children, session}) {
    return (
        <SessionProvider session={session}>
            <AuthContextProvider>
                <DataTableProvider>
                    <PageSidebarProvider>
                        <CurriculumProvider>
                            <SidebarProvider>
                                <ContentProvider>
                                    <RoleContextProvider>
                                        <MemberProvider>
                                            <OrganizationContextProvider>
                                                {children}
                                            </OrganizationContextProvider>
                                        </MemberProvider>
                                    </RoleContextProvider>
                                </ContentProvider>
                            </SidebarProvider>
                        </CurriculumProvider>
                    </PageSidebarProvider>
                </DataTableProvider>
            </AuthContextProvider>
        </SessionProvider>
    )
}