"use client"

import React from 'react';
import {Button} from "@/components/common/button";

const ConfirmPopup = ({title, message, onClose, onConfirm}) => {



    return (
        <div className='custom-ui w-[370px] bg-white shadow-modalShadow p-10'>
            <h1 className="pb-4 border-b border-borderColor text-[19px] font-bold">{title}</h1>
            <p className="text-textSubColor text-[17px] py-5 pb-9">{message}</p>
            <div className="flex items-center justify-end gap-2">

                {onConfirm.map((btn, index) => (
                    <Button
                        key={index}
                        onClick={ ()=> {
                            btn.onClick();
                            onClose();
                        } }
                        color={btn.label === '확인' ? 'primary' : 'transparent'}
                        className="min-w-[62px] !p-3 !h-[40px] cursor-pointer"
                    >
                        {btn.label === '확인' ? (btn.buttonLabel ? btn.buttonLabel : '확인') : (btn.buttonLabel ? btn.buttonLabel : '취소')}

                    </Button>
                ))}

            </div>

        </div>
    );
};

export default ConfirmPopup;