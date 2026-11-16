import type { Metadata } from "next";
import BookADemo from "@/views/BookADemo";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a Flentra demo and plan a 30-day pilot on your own devices.",
  alternates: { canonical: "/book-a-demo" },
};

export default function BookADemoPage() {
  return <BookADemo />;
}
