"use client";
import LmsStandardSelectInputV2 from "@/components/common/form/LmsStandardSelectInputV2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const LmsTableHeaderActions = ({
                                 pagination,
                                 TableActions = null,
                                 pageSize = 5,
                                 classes = "",
                               }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const oldParams = new URLSearchParams(searchParams);
  const [size, setSize] = useState(
      oldParams && oldParams.get("size") ? oldParams.get("size") : pageSize
  );

  const handleOnChnage = (column, value) => {
    setSize(value);
    oldParams.set("size", value);
    oldParams.set("page", 1);
    sendSearchRequest();
  };

  const sendSearchRequest = () => {
    replace(`${pathname}?${new URLSearchParams(oldParams)}`);
  };

  return (
      <>
        <div className={`table-filter flex items-center pb-6 ${classes}`}>
          <div className="flex items-center gap-2">
            <div className="">Total</div>
            <div className="text-themeColor font-bold">
              {pagination && pagination.total ? pagination.total : 0}건
            </div>
            <div className="">
              <LmsStandardSelectInputV2
                  name={`size`}
                  size={"!h-[32px]"}
                  classes={"w-[87px]"}
                  fieldClass={'min-w-[87px]'}
                  value={size}
                  options={[
                    { id: pageSize, name: pageSize },
                    { id: 25, name: "25" },
                    { id: 50, name: "50" },
                    {
                      id: 100,
                      name: "100",
                    },
                  ]}
                  changeDataHandler={handleOnChnage}
              />
            </div>
            <div>건 씩보기</div>
          </div>
          {TableActions && (
              <div className="flex flex-1 items-center justify-end gap-3">
                {TableActions}
              </div>
          )}
        </div>
      </>
  );
};

export default LmsTableHeaderActions;
