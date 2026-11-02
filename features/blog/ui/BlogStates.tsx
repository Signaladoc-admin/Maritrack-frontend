import Link from "next/link";
import "./blog.css";

function EmptyArt() {
  return (
    <svg viewBox="0 0 200 190" aria-hidden="true" className="w-full h-auto overflow-visible">
      <path
        stroke="rgba(255,255,255,0.28)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M34 30 L140 22 L148 158 L40 166 Z"
      />
      <path
        stroke="rgba(255,255,255,0.28)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M56 64 L118 60"
        strokeDasharray="2 7"
      />
      <path
        stroke="rgba(255,255,255,0.28)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M57 86 L104 83"
        strokeDasharray="2 7"
      />
      <path
        stroke="rgba(255,255,255,0.28)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M58 108 L92 106"
        strokeDasharray="2 7"
      />
      <path
        stroke="#05E0E4"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M172 46 L186 134 L178 148 L169 136 L156 50 Z"
      />
      <path
        stroke="#05E0E4"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M157 52 L171 50"
      />
      <path
        stroke="#05E0E4"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M178 148 L177 138"
      />
      <circle fill="#05E0E4" cx="22" cy="150" r="3" />
    </svg>
  );
}

function SearchArt() {
  return (
    <svg viewBox="0 0 200 190" aria-hidden="true" className="w-full h-auto overflow-visible">
      <path
        stroke="#05E0E4"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M84 28 C122 24 150 52 146 90 C142 128 106 148 74 138 C42 128 30 90 46 62 C54 46 68 31 84 28 Z"
      />
      <path
        stroke="#05E0E4"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M130 130 L170 172"
      />
      <path
        stroke="rgba(255,255,255,0.28)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M62 90 q9 -14 18 0 t18 0 t18 0"
      />
      <circle fill="#05E0E4" cx="30" cy="30" r="3" />
      <circle fill="#05E0E4" cx="182" cy="62" r="2" />
    </svg>
  );
}

function ErrorArt() {
  return (
    <svg viewBox="0 0 200 190" aria-hidden="true" className="w-full h-auto overflow-visible">
      <path
        stroke="#F2B56B"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 96 H62"
      />
      <path
        stroke="#F2B56B"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M62 80 H88 V112 H62 Z"
      />
      <path
        stroke="#F2B56B"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M88 90 H100 M88 102 H100"
      />
      <path
        stroke="#F2B56B"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M192 96 H146"
      />
      <path
        stroke="#F2B56B"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M146 80 H122 V112 H146 Z"
      />
      <path
        stroke="rgba(255,255,255,0.28)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M108 60 L112 74 M100 56 L100 70 M118 66 L112 78"
      />
      <path
        stroke="rgba(255,255,255,0.28)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M104 126 L100 140 M112 124 L116 136"
      />
    </svg>
  );
}

export function BlogEmptyState({ search }: { search?: string }) {
  if (search) {
    return (
      <div className="blog-enter mx-auto grid max-w-[760px] grid-cols-1 items-center gap-8 py-12 sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-12 sm:py-20">
        <div>
          <h2 className="mb-3.5 text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-[46px]">
            Nothing for <em className="font-medium italic text-[#05E0E4]">“{search}”.</em>
          </h2>
          <p className="max-w-[42ch] text-base leading-relaxed text-white/65">
            Check the spelling, or try something broader. Shorter searches usually turn up more.
          </p>
          <div className="mt-7">
            <Link
              href="/blog"
              className="inline-block border-b border-white/30 pb-0.5 text-[15px] text-white transition-colors hover:border-[#05E0E4]"
            >
              Clear search and see all articles
            </Link>
          </div>
        </div>
        <div className="order-first w-32 sm:order-none sm:w-[220px]">
          <SearchArt />
        </div>
      </div>
    );
  }

  return (
    <div className="blog-enter mx-auto grid max-w-[760px] grid-cols-1 items-center gap-8 py-12 sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-12 sm:py-20">
      <div>
        <h2 className="mb-3.5 text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-[46px]">
          Nothing here <em className="font-medium italic text-[#05E0E4]">yet.</em>
        </h2>
        <p className="max-w-[42ch] text-base leading-relaxed text-white/65">
          The first articles are still being written. Check back, or head back to the{" "}
          <Link
            href="/"
            className="text-white underline underline-offset-4 decoration-white/35 transition-colors hover:decoration-[#05E0E4]"
          >
            homepage
          </Link>{" "}
          in the meantime.
        </p>
      </div>
      <div className="order-first w-32 sm:order-none sm:w-[220px]">
        <EmptyArt />
      </div>
    </div>
  );
}

export function BlogErrorState({ message, retryHref }: { message: string; retryHref: string }) {
  return (
    <div
      role="alert"
      className="blog-enter mx-auto grid max-w-[760px] grid-cols-1 items-center gap-8 py-12 sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-12 sm:py-20"
    >
      <div>
        <h2 className="mb-3.5 text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-[46px]">
          That didn’t <em className="font-medium italic text-[#F2B56B]">load.</em>
        </h2>
        <p className="max-w-[42ch] text-base leading-relaxed text-white/65">
          It’s on our side, not yours. Give it another go, and if it keeps happening, let us know.
        </p>
        <div className="mt-7">
          <a
            href={retryHref}
            className="inline-flex items-center gap-2 rounded-xl bg-[#05E0E4] px-5 py-3 text-[15px] font-semibold text-[#06222a] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#35f0f3] active:translate-y-0"
          >
            Try again
          </a>
        </div>
        <div className="mt-8 max-w-[48ch] break-words font-mono text-xs text-white/40">
          {message || "The blog service didn’t respond."}
        </div>
      </div>
      <div className="order-first w-32 sm:order-none sm:w-[220px]">
        <ErrorArt />
      </div>
    </div>
  );
}
