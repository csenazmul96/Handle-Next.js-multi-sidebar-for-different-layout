"use client";

import React, { useState } from "react";
import NotificationItem from "./NotificationItem";
import {BellOff, BellRing, Settings, Trash2} from "lucide-react";
import { Button } from "@/components/common/button";

const dummyData = [
    {
        title: "이메일 ‘업데이트 사항 공지드립니다’",
        author: "주설아 (skyfox1234)",
        date: "24.09.05",
        time: "09:15",
        type: "이메일/SMS",
    },
    {
        title: "새로운 콘텐츠가 업로드되었습니다",
        author: "김도현 (contentAdmin)",
        date: "24.09.06",
        time: "14:30",
        type: "콘텐츠",
    },
    {
        title: "1:1문의에 답변이 등록되었습니다",
        author: "운영팀",
        date: "24.09.07",
        time: "11:10",
        type: "1:1문의",
    },
    {
        title: "이메일 ‘업데이트 사항 공지드립니다’",
        author: "주설아 (skyfox1234)",
        date: "24.09.05",
        time: "09:15",
        type: "이메일/SMS",
    },
    {
        title: "새로운 콘텐츠가 업로드되었습니다",
        author: "김도현 (contentAdmin)",
        date: "24.09.06",
        time: "14:30",
        type: "콘텐츠",
    },
    {
        title: "1:1문의에 답변이 등록되었습니다",
        author: "운영팀",
        date: "24.09.07",
        time: "11:10",
        type: "1:1문의",
    },
];

const Notification = () => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleCheckboxChange = (id, checked) => {
        setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((item) => item !== id)
        );
    };

    return (
        <div className="w-[400px] shadow-notificatoindShadow bg-white border border-borderColor relative">
            <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-borderColor transform rotate-45 shadow-[0_-2px_4px_rgba(0,0,0,0.1)]" />

            <div className="flex items-center justify-between py-4 px-5">
                <h2 className="text-medium font-bold">알림</h2>
                <button className="w-6 h-6 flex items-center justify-center">
                    <Settings size={20} className="text-textSubColor" />
                </button>
            </div>

            <div className="navwrap px-[26.5px] border-b border-borderColor">
                <nav className="flex">
                    <button className="px-3 py-2 text-base font-bold text-textColor relative before:absolute before:bottom-[-1px] before:bg-themeColor before:left-0 before:h-[1.5px] before:w-full before:content-['']">전체</button>
                    <button className="px-3 py-2 text-base hover:bg-primaryLightColor text-textSubColor">로그인</button>
                    <button className="px-3 py-2 text-base hover:bg-primaryLightColor text-textSubColor">콘텐츠</button>
                    <button className="px-3 py-2 text-base hover:bg-primaryLightColor text-textSubColor">1:1문의</button>
                    <button className="px-3 py-2 text-base hover:bg-primaryLightColor text-textSubColor">이메일/SMS</button>
                </nav>
            </div>

            <div className="notification-list max-h-[416px] h-[416px] overflow-hidden py-1 pr-1">
                {/*<div className="custom-notification-scrollbar">*/}
                {/*    <ul className="flex flex-col w-full divide-y divide-borderColor pl-5 pr-[10px]">*/}
                {/*        {dummyData.map((item, id) => (*/}
                {/*            <NotificationItem*/}
                {/*                key={id}*/}
                {/*                id={id}*/}
                {/*                title={item.title}*/}
                {/*                author={item.author}*/}
                {/*                date={item.date}*/}
                {/*                time={item.time}*/}
                {/*                type={item.type}*/}
                {/*                isChecked={selectedIds.includes(id)}*/}
                {/*                onCheckboxChange={(checked) => handleCheckboxChange(id, checked)}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*</div>*/}

                <div className="flex flex-col items-center justify-center h-full">
                    <div className={`flex gap-4 flex-col items-center justify-center`}>
                        <BellRing size={36} />
                        <div className="flex flex-col items-center justify-center gap-1">
                            <p className={`text-baseNormal`}>새로운 알람이 없습니다.</p>
                            <p className={`text-textSubColor`}>최근 14일 동안 받은 알림을 표시합니다.</p>
                        </div>

                    </div>
                </div>

            </div>

            {/* Delete button shown when any selected */}
            {selectedIds.length > 0 && (
                <div className="absolute bottom-0 bg-white w-full p-5 z-40">
                    <div className="actions flex flex-col bg-white gap-3 justify-between">
                        <Button
                            color="transparentLarge"
                            className="flex-1 w-full"
                            onClick={() => setShowConfirmModal(false)}
                        >
                            선택 알림 삭제
                        </Button>
                        <Button
                            color="primaryLarge"
                            className="flex-1 w-full"
                            onClick={() => setShowConfirmModal(true)}
                        >
                            전체 알림 삭제
                        </Button>
                    </div>

                    {/*<div className="flex flex-col gap-3">*/}
                    {/*    <div className="flex flex-col">*/}
                    {/*        <div className="flex p-3 gap-[10px] bg-primaryLightColor hover:bg-primaryLightColor">*/}
                    {/*            <div>*/}
                    {/*                <Trash2 size={28} className={`text-textSubColor`} />*/}
                    {/*            </div>*/}
                    {/*            <div className={`flex flex-col gap-1`}>*/}
                    {/*                <h2 className={`text-baseNormal`}>삭제하기</h2>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="flex items-center p-3 gap-[10px] hover:bg-primaryLightColor">*/}
                    {/*            <div>*/}
                    {/*                <BellOff className={`text-textSubColor`} size={28} />*/}
                    {/*            </div>*/}
                    {/*            <div className={`flex flex-col gap-1`}>*/}
                    {/*                <h2 className={`text-baseNormal`}>알림 끄기</h2>*/}
                    {/*                <p className={`text-textSubColor text-13`}> 로그인 ‘관리자 로그인’ 알림을 끕니다.</p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <Button*/}
                    {/*        color="transparentLarge"*/}
                    {/*        className="flex-1 w-full"*/}
                    {/*        onClick={() => setShowConfirmModal(false)}*/}
                    {/*    >*/}
                    {/*        취소*/}
                    {/*    </Button>*/}
                    {/*</div>*/}

                </div>
            )}

            {/* Confirm Modal */}
            {showConfirmModal && (
                <div className="nofification-popup absolute inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-20"
                        onClick={() => setShowConfirmModal(false)}
                    />
                    <div className="absolute bottom-0 left-0 w-full flex flex-col gap-6 bg-white p-5 z-10">
                        <div>
                            <h2 className="font-bold">알림을 삭제하시겠습니까?</h2>
                            <p>
                                선택한 알림이 삭제됩니다.{" "}
                                <br className="hidden lg:block" />
                                삭제된 알림은 다시 복구할 수 없습니다.
                            </p>
                        </div>

                        <div className="actions flex gap-3 justify-between">
                            <Button
                                color="transparentLarge"
                                className="flex-1"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                취소
                            </Button>
                            <Button
                                color="primaryLarge"
                                className="flex-1"
                                onClick={() => {
                                    // Simulate delete
                                    setSelectedIds([]);
                                    setShowConfirmModal(false);
                                }}
                            >
                                삭제
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;
