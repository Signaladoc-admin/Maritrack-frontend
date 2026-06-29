import Image from "next/image";
import Link from "next/link";

export default function LandingHeader() {

  return (
    <header className="container mx-auto md:px-10 px-6 py-6 flex items-center justify-between">
      <Link href="/landing" className="flex items-center">
        <Image 
          src="/assets/FlentraLogo.svg" 
          alt="Flentra Logo" 
          width={118} 
          height={30} 
          className="lg:h-12 h-9 w-auto"
          priority
        />
      </Link>
    </header>
  );
}
