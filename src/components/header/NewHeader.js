import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/common/dropdown'
import { Navbar,  NavbarItem, NavbarSection } from '@/components/common/navbar'
 
import React from "react";
import Link from "next/link";
import {User} from "lucide-react";

const NewHeader = () => {
  return (
      <Navbar className={"header fixed top-0 left-0 w-full flex items-center justify-between px-[23px] py-[13.5px] border-b border-[#E4E4E4] z-50 bg-white"}>
        <div className="left-header w-[260px]">
          <div className="logo text-base flex items-center justify-between font-bold pr-[37px]">
            <Link href="/" className="text-[18px] flex items-center">LMS LOGO <span
                className="text-subColor pl-2 text-sm">관리자</span> </Link>
            <span><img src="/images/header/menu-collapse.png" width={24} height={24} alt="author img"/></span>
          </div>
        </div>


        <NavbarSection className={'px-0 gap-0'}>
          <NavbarItem href="/search" aria-label="Search">
            <img src="/images/header/bell-ring.png" width={20} height={20} alt="author img"/>
          </NavbarItem>
          <NavbarItem href="/inbox" aria-label="Inbox">
            <img src="/images/header/info.png" width={20} height={20} alt="author img"/>
          </NavbarItem>
          <Dropdown>
            <DropdownButton as={NavbarItem}>
              <span className="size-[26px] cursor-pointer rounded-full overflow-hidden flex items-center justify-center text-[11px] text-white bg-[#4569FF]">지은</span>
            </DropdownButton>
            <DropdownMenu className="min-w-64" anchor="bottom end">
              <DropdownItem href="/my-profile">
                <User />
                <DropdownLabel>My profile</DropdownLabel>
              </DropdownItem>
              <DropdownItem href="/profile/password-update" className={'cursor-pointer'}>

                <DropdownLabel>Password Update</DropdownLabel>
              </DropdownItem>


              <DropdownDivider />
              <DropdownItem href="/logout">
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <ChevronRight />
                <DropdownLabel>Sign out</DropdownLabel>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarSection>
      </Navbar>
  );
}

export default NewHeader