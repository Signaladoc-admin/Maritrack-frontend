import Image from "next/image";
import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="container mx-auto px-10 py-6 flex items-center justify-between">
      <Link href="/landing" className="flex items-center">
        <Image 
          src="/assets/FlentraLogo.svg" 
          alt="Flentra Logo" 
          width={118} 
          height={30} 
          className="h-8 w-auto"
          priority
        />
      </Link>
    </header>
  );
}
