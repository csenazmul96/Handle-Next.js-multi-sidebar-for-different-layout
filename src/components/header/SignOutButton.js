"use client";

import {DropdownItem, DropdownLabel} from "@/components/common/dropdown";
import React from "react";
import {signOut} from "next-auth/react";

export default function SignOutButton() {
  return (
    <DropdownItem onClick={() => signOut({callbackUrl: '/'})}>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <ChevronRight />
      <DropdownLabel>Sign out</DropdownLabel>
    </DropdownItem>
  );
}