import {Heading} from "@/components/common/heading";
import React from "react";
import ToolTip from "@/components/common/ToolTip";

const LmsPageHeading = ({title, actions = null, headingClasses='', tooltip='', tooltipTitle=''}) => {
    return (
        <Heading level={2} className={headingClasses}>
            <div className="flex items-center">
                <span>{title}</span>
                {tooltip &&
                    <ToolTip title={tooltipTitle} content={tooltip} />
                }
            </div>
        </Heading>
    );
}

export default LmsPageHeading