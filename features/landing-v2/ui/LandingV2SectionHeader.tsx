export interface LandingV2SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  maxWidthClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function LandingV2SectionHeader({
  eyebrow,
  title,
  description,
  maxWidthClassName = "max-w-[760px]",
  titleClassName = "text-[32px] leading-[1.1] font-extrabold tracking-[-0.025em] min-[721px]:text-[42px]",
  descriptionClassName = "text-[17px] leading-[1.65] text-text-muted",
}: LandingV2SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-3.5 ${maxWidthClassName}`}>
      <p className="m-0 text-[12.5px] font-bold tracking-[0.08em] text-cyan uppercase">
        {eyebrow}
      </p>
      <h2 className={`m-0 text-white ${titleClassName}`}>{title}</h2>
      {description ? (
        <p className={`m-0 ${descriptionClassName}`}>{description}</p>
      ) : null}
    </div>
  );
}
