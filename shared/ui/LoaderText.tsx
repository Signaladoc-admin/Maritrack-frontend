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
        <div className={`flex h-[400px] flex-col items-center justify-center gap-4 ${className || ""}`}>
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-accent will-change-transform" />
            <p className="text-sm font-medium text-foreground">{text}</p>
            {subText && <p className="text-xs text-muted-foreground">{subText}</p>}
        </div>
    );
}