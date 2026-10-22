import Link from "next/link";
import { Search, X } from "lucide-react";
import "@/features/landing/ui/landing.css";

interface BlogHeroProps {
  search?: string;
}

/**
 * Search is a plain GET form → `/blog?q=...` so it works without client JS and
 * results are shareable/bookmarkable URLs.
 */
export default function BlogHero({ search = "" }: BlogHeroProps) {
  return (
    <section className="relative w-full overflow-hidden pt-16 pb-12 md:pt-20" aria-label="Flentra blog">
      {/* Soft cyan glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(5,224,228,0.35), transparent)" }}
        aria-hidden="true"
      />

      <div className="container relative mx-auto flex flex-col items-center gap-7 px-6 text-center md:px-10">
        <div
          className="inline-flex items-center gap-2 rounded-full border border-[#05E0E4]/30 bg-[#05E0E4]/5 px-4 py-2 text-sm font-medium uppercase tracking-widest text-[#05E0E4]"
          style={{ animation: "fl-slide-up 0.65s cubic-bezier(0.16,1,0.3,1) 0.05s both" }}
        >
          <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#05E0E4] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#05E0E4]" />
          </span>
          The Flentra Blog
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl">
          <span className="fl-word-reveal block" style={{ animationDelay: "0.15s" }}>
            Insights on Device Security
          </span>
          <span className="fl-word-reveal block" style={{ animationDelay: "0.28s" }}>
            &amp; <span className="text-[#05E0E4]">Digital Safety</span>
          </span>
        </h1>

        <p
          className="fl-word-reveal max-w-2xl text-lg leading-relaxed text-white/55"
          style={{ animationDelay: "0.42s" }}
        >
          News, guides and best practices for managing devices, protecting data and keeping
          families safe online.
        </p>

        <form
          action="/blog"
          method="get"
          role="search"
          className="mt-2 flex w-full max-w-xl items-center gap-2 rounded-full border border-white/12 bg-white/5 py-1.5 pl-5 pr-1.5 backdrop-blur-md transition-colors duration-200 focus-within:border-[#05E0E4]/50 focus-within:bg-white/8"
          style={{ animation: "fl-slide-up 0.65s cubic-bezier(0.16,1,0.3,1) 0.55s both" }}
        >
          <Search className="h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-search"
            name="q"
            type="search"
            defaultValue={search}
            maxLength={255}
            placeholder="Search articles…"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white placeholder:text-white/35 focus:outline-none"
            autoComplete="off"
          />
          {search && (
            <Link
              href="/blog"
              aria-label="Clear search"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Link>
          )}
          <button
            type="submit"
            className="rounded-full bg-[#05E0E4] px-5 py-2 text-sm font-semibold text-[#0A0E1A] transition-all duration-200 hover:bg-[#35f0f3] active:scale-95"
          >
            Search
          </button>
        </form>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
