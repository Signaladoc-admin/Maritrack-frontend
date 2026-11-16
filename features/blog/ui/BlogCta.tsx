import RegisterOrSignInButtons from "@/features/landing/ui/RegisterOrSignIn";

export default function BlogCta() {
  return (
    <section className="container mx-auto px-4 py-6 md:px-10 md:py-8" aria-label="Get started with Flentra">
      <div className="relative overflow-hidden rounded-3xl bg-[#17366A] p-10 md:p-16">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(5,224,228,0.5), transparent)" }}
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center gap-8 text-center">
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white md:text-5xl">
            Protect every device and everything it carries.
          </h2>
          <RegisterOrSignInButtons />
        </div>
      </div>
    </section>
  );
}
