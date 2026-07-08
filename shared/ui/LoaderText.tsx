export default function LoaderText({
    text,
    subText,
    className,
    iconSize,
    textSize,
    subTextSize
}: {
    text: string,
    subText?: string,
    className?: string,
    iconSize?: number,
    textSize?: number,
    subTextSize?: number
}) {
    return (
        <div className={`flex h-[400px] flex-col items-center justify-center gap-4 ${className}`}>
            <div className={`h-${iconSize || 10} w-${iconSize || 10} animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#1B3C73]`} />
            <p className={`text-${textSize || 500} font-medium text-slate-500`}>{text}</p>
            {subText && <p className={`text-${subTextSize || 500} font-medium text-slate-500`}>{subText}</p>}
        </div>
    );
}