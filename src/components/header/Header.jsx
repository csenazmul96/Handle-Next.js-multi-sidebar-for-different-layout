"use client";

import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownLabel,
  DropdownMenu,
  DropdownItem
} from "@/components/common/dropdown";
import { Navbar, NavbarItem, NavbarSection } from "@/components/common/navbar";
import SignOutButton from "@/components/header/SignOutButton";
import { useSidebar } from "@/custom-hooks/useSidebar";
import { BellRing, Info, Menu, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LmsNotificationWrapper from "@/components/header/LmsNotificationWrapper";

const Header = () => {
  const { toggleMainSidebar } = useSidebar();
  const { data: session } = useSession();


  return (
    <Navbar
      className={
        "header fixed top-0 left-0 w-full flex items-center justify-between px-[16px] lg:px-[23px] py-[8.5px] lg:py-[13.5px] border-b border-[#E4E4E4] z-50 bg-white"
      }
    >
      <div className="left-header w-[260px]">
        <div className="logo text-base flex items-center justify-between font-bold pr-[37px]">
          <Link href="/" className="text-[18px] flex items-center">
            LMS LOGO <span className="text-subColor pl-2 text-sm font-normal">관리자</span>{" "}
          </Link>
          <span className={`cursor-pointer`} onClick={toggleMainSidebar}>
            <Menu size={24} className={`text-[#999]`} />
          </span>
        </div>
      </div>

      <NavbarSection className={"px-0 gap-0"}>
        <NavbarItem className={"cursor-pointer"} aria-label="Search">
          <BellRing size={26} className={`text-[#777] cursor-pointer`} strokeWidth={1.25} />
          {/*<img src="/images/header/bell-ring.png" width={20} height={20} alt="author img"/>*/}
          {/*<LmsNotificationWrapper />*/}
        </NavbarItem>
        <NavbarItem href="/" aria-label="Inbox">
          {/*<img src="/images/header/info.png" width={20} height={20} alt="author img"/>*/}
          <Info strokeWidth={1.25} size={26} className={`text-[#777]`} />
        </NavbarItem>
        <Dropdown>
          <DropdownButton as={NavbarItem}>
            <span className="size-[26px] cursor-pointer rounded-full overflow-hidden flex items-center justify-center text-[11px] text-white bg-[#4569FF]">
              {session?.user?.name}
            </span>
          </DropdownButton>
          <DropdownMenu className="min-w-64 pt-2" anchor="bottom end">
            <DropdownItem href="/profile/info-update" className={'cursor-pointer'}>
            <User size={16} />
            <DropdownLabel>프로필 설정</DropdownLabel>
            </DropdownItem>
            {/*<DropdownItem href="/profile/password-update" className={'cursor-pointer'}>*/}
            {/*    <Cog8ToothIcon />*/}
            {/*    <DropdownLabel>Password Update</DropdownLabel>*/}
            {/*</DropdownItem>*/}

            <DropdownDivider />
            <SignOutButton />
          </DropdownMenu>
        </Dropdown>
      </NavbarSection>

    </Navbar>
  );
};

export default Header;
