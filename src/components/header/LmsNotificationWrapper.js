"use client"


import React from "react";
import Notification from "@/components/header/notification-components/Notification";

function LmsNotificationWrapper(props) {
    return (
        <div className={"absolute top-[70px] -right-2"}>
            <Notification />
        </div>
    );
}

export default LmsNotificationWrapper;