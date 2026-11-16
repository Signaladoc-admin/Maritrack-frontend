"use client";

import type { BlogPost } from "@/features/blog/types";
import LandingV2PageShell from "@/features/landing-v2/ui/LandingV2PageShell";
import ResourcesBlogSection from "@/features/landing-v2/ui/ResourcesBlogSection";

interface ResourcesBlogV2Props {
  posts?: BlogPost[];
}

export default function ResourcesBlogV2({ posts }: ResourcesBlogV2Props) {
  return (
    <LandingV2PageShell>
      <ResourcesBlogSection initialPosts={posts} />
    </LandingV2PageShell>
  );
}
