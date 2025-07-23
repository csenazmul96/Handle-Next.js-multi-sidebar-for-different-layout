"use client"

export default function Progress({
                                        value,
                                        max,
                                        color = "#3058FF", // Default blue color
                                        height = 8,
                                        showText = true,
                                    }) {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100)

    return (
        <div className="flex items-center gap-3">
            <div className="relative w-full min-w-[320px] max-w-[320px] overflow-hidden rounded-full bg-[#E4E4E4]" style={{ height: `${height}px` }}>
                <div
                    className="h-full rounded-full transition-all duration-300 ease-in-out"
                    style={{
                        width: `${value}%`,
                        backgroundColor: color,
                    }}
                />
            </div>

            {showText && (
                <span className="text-[17px] text-textColor whitespace-nowrap min-w-[48px]">
                    {  Math.round(value)}%
                </span>
            )}
        </div>
    )
}

export function ProgressBar({value, max}) {

    return (
        <div className="w-full max-w-md space-y-4 p-4">
            <Progress value={value} max={max} />
        </div>
    )
}

