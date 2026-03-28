import { H3, H4, P } from "@/shared/ui/typography";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background grid min-h-screen w-full grid-cols-1 items-center gap-5 p-5 lg:grid-cols-[4fr_3fr]">
      {/* Form Section */}
      <div className="mx-auto w-full max-w-4xl lg:px-28">{children}</div>

      {/* Image Section using background image - matching design screenshot */}
      <div className="hidden h-full overflow-hidden rounded-4xl bg-[url('/assets/auth.jpg')] bg-cover bg-center text-white lg:block">
        <div className="flex h-full flex-col bg-linear-to-b from-transparent from-0% via-[#0B182E]/40 via-45% to-[#0B182E] to-100% px-10 pb-20">
          <div className="mt-auto space-y-4">
            <H4 className="text-[28px] leading-tight font-semibold tracking-tight text-white">
              Build healthy digital <br />
              habits together.
            </H4>
            <P className="max-w-md text-base leading-relaxed font-medium text-white/90">
              Set boundaries, manage screen time, and guide them through a smarter digital journey.
            </P>
          </div>
        </div>
      </div>
    </div>
  );
}
