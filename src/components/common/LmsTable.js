"use client";
import LmsPaginations from "@/components/common/LmsPaginations";
import LmsTableCommonCheckbox from "@/components/common/LmsTableCommonCheckbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/common/table";
import { useDataTable } from "@/store/DataTableContext";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {MessageCircleWarning} from "lucide-react";

export default function LmsTable({
                                     columns,
                                     data,
                                     checkMark = false,
                                     serialNo = false,
                                     pagination = null,
                                     pageSize = 5,
                                     emptyMessage = "표에 사용 가능한 데이터가 없습니다",
                                     showEmptyMessage = false,
                                     rowLink = () =>{}
                                 }) {
    const { selectedRow, setSelectedRows } = useDataTable();
    const startSerialNo = pagination ? (pagination.page - 1) * pagination.size + 1 : 1;
    const router = useRouter();
    const handleTrClick = (row) => {
        if (rowLink) {
            const target = rowLink(row);
            if (target) {
                router.push(target);
            }
        }
    }

    return (
        <>
            <Table>
                <TableHead className="text-[15px] bg-[#F8F8F8] border-t border-[#E4E4E4] py-![15px] font-bold">
                    <TableRow>
                        {checkMark && (
                            <TableHeader className={"w-10"}>
                                <LmsTableCommonCheckbox
                                    rows={data}
                                    id={"all"}
                                    setSelectedRows={setSelectedRows}
                                    selectedRow={selectedRow}
                                />
                            </TableHeader>
                        )}
                        {serialNo && (
                            <TableHeader className={"w-10"}>
                                NO
                            </TableHeader>
                        )}
                        {columns.map((col, index) => (
                            <TableHeader
                                key={`table_heading${index}`}
                                className={`${col.thClass ?? ""}`}
                            >
                                {col.header}
                            </TableHeader>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={`table_row${rowIndex}`}  onClick={() => handleTrClick(row)}>
                            {checkMark && (
                                <TableCell>
                                    <LmsTableCommonCheckbox
                                        id={row.id}
                                        setSelectedRows={setSelectedRows}
                                        selectedRow={selectedRow}
                                    />
                                </TableCell>
                            )}
                            {serialNo && (
                                <TableCell>
                                    {startSerialNo + rowIndex}
                                </TableCell>
                            )}
                            {columns.map((col, colIndex) => {
                                if (col.cell) {
                                    return (
                                        <TableCell
                                            key={colIndex}
                                            className={`${col.tdClass ?? ""}`}
                                        >
                                            {col.cell(row[col.accessor], row, rowIndex)}
                                        </TableCell>
                                    );
                                }
                                return (
                                    <TableCell key={colIndex} className={`${col.tdClass ?? ""}`}>
                                        {row[col.accessor]}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {pagination && <LmsPaginations pagination={pagination} pageSize={pageSize} />}
            {!data.length && showEmptyMessage && (
                <div
                    className={"relative justify-center flex items-center min-h-[300px]"}
                >
                    <div className={"w-max text-center"}>
                        <MessageCircleWarning size={40} className={`text-placeholderColor m-auto mb-4`} />
                        <span className={"text-placeholderColor"}>{emptyMessage}</span>
                    </div>
                </div>
            )}
        </>
    );
}
