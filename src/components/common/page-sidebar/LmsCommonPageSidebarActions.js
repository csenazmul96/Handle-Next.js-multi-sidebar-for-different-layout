"use client"
import {Button} from "@/components/common/button";
import React from "react";
import {confirmAlert} from "react-confirm-alert";
import {toast} from "react-toastify";
import ConfirmPopup from "@/components/common/confirmAlert/ConfirmPopup";
import {deleteParentGroup, deleteSubGroup, deleteSubSubGroup} from "@/utils/api/lmsPageCommonSidebar";
import {usePageSidebarContext} from "@/store/PageSidebarContext";
import {Pencil, Plus, Trash2} from "lucide-react";

const LmsCommonPageSidebarActions = ({apiPrefix, apiPostFix, tag,
                                         deleteMessage= "선택한 그룹을 삭제하시겠습니까?",
                                         headingMessage='그룹 삭제',
                                         editBtnText='수정',
                                         deleteBtnText="삭제"}) => {
    const { setActionType, currentGroup,  setOpenForm} = usePageSidebarContext()

    const createNewGroup = () => {
        setActionType('create')
        setOpenForm(true)
    }

    const editGroup = () => {
        setActionType('edit')
        setOpenForm(true)
    }

    const deleteHandler = () => {
        confirmAlert({
            title: headingMessage,
            message: deleteMessage,
            buttons: [
                {
                    label: '취소',
                    onClick: () => {
                        return false;
                    }
                },
                {
                    label: '확인',
                    buttonLabel: deleteBtnText,
                    onClick: async () => {
                        let response = null;

                        if (currentGroup.level === 1) {
                            response = await deleteParentGroup(currentGroup.id, `${apiPrefix}/${apiPostFix}`, tag)
                        } else if (currentGroup.level === 2) {
                            response = await deleteSubGroup(currentGroup.id, `${apiPrefix}/sub/${apiPostFix}`, tag)
                        } else if (currentGroup.level === 3) {
                            response = await deleteSubSubGroup(currentGroup.id, `${apiPrefix}/sub-sub/${apiPostFix}`, tag)
                        }

                        if (response && response.status === 'success') {
                            toast.success('Group has been removed')
                        } else {
                            toast.error('Something went wrong')
                        }
                    }
                }
            ],
            customUI: ({ title, message, onClose , buttons}) => {
                return (
                    <ConfirmPopup title={title} message={message} onClose={onClose} onConfirm={buttons} />
                );
            }
        });
    }

    return (
        <div className="absolute bottom-0 left-0 w-full py-4 px-6 pb-6 bg-white">
            <div className="flex-col flex gap-4">
                {!currentGroup || (currentGroup.level === 1 || currentGroup.level === 2) ?
                    <Button color="transparentMedium"
                            onClick={createNewGroup}
                            className={`h-[40px] w-full`} >
                        <span>
                            {/*<img src="/images/content-management/li_plus.png" alt=""/>*/}
                            <Plus size={20} />
                        </span> <span>추가</span>
                    </Button> : ''
                }
                {currentGroup &&
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <Button color="transparentMedium"
                                    onClick={editGroup}
                                    className={`h-[40px] !gap-[10px] w-full`}>
                                <span>
                                    {/*<img src="/images/content-management/li_pencil.png" alt=""/>*/}
                                    <Pencil size={20} />
                                </span> <span>{editBtnText}</span>
                            </Button>
                        </div>
                        <div className="flex-1">
                            <Button color="transparentMedium"
                                    onClick={deleteHandler}
                                    className={`h-[40px] !gap-[10px] w-full`}>
                                <span>
                                    {/*<img src="/images/content-management/li_trash-2.png" alt=""/>*/}
                                    <Trash2 size={20}/>
                                </span>
                                <span> {deleteBtnText}</span>
                            </Button>

                        </div>

                    </div>
                }
            </div>
        </div>
    );
}

export default LmsCommonPageSidebarActions