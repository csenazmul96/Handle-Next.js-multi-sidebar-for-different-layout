import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Check, Info, Pipette, TriangleAlert} from "lucide-react";
import {RiCheckLine} from "react-icons/ri";

import { X } from 'lucide-react' // or any icon you want

const CustomCloseButton = ({ closeToast }) => (
    <button
        onClick={closeToast}
        className="text-gray-400 hover:text-gray-700 transition p-1"
    >
        <X size={18} />
    </button>
)


const bgColor = (type) => {
  return type === "warning"
      ? "bg-yellow-500"
      : type === "error"
          ? "bg-red-500"
          : "bg-[#2962FF]"
}
export const LmsToastMessage = (title = '완료되었습니다.', subtitle = '변경하신 사항이', type="success") =>

    toast(
        <div className="flex items-center gap-4">
            <div className={`!w-[36px] min-w-[36px] !h-[36px] ${bgColor(type)} rounded-full flex items-center justify-center`}>
            {type === "success" ?
                <Check className={`text-white w-[20px] h-[20px]`} />
                : type === "warning" ?
                    <TriangleAlert className={`text-white w-[20px] h-[20px]`} />
                    : type === "error" ?
                        <Info className={`text-white w-[20px] h-[20px]`} />
                        : null
            }

            </div>
            <div className={`flex flex-col gap-1`}>
                <p className="font-bold text-[16px] text-black">{title}</p>
                <p className="text-[#717171] text-[14px]">{subtitle}</p>
            </div>
        </div>,
        {
            icon: true,
            closeButton: CustomCloseButton,
            hideProgressBar: false,
            autoClose: 2000,
            className: 'bg-white rounded-xl shadow-md p-4 !min-h-0',
            bodyClassName: 'flex items-start gap-4 text-start',
            progressClassName: 'toast-progress-bar',
        }
    )
