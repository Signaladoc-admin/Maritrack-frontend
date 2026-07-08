import Image from "next/image";
import Link from "next/link";
import { footerLinks, footerSocials } from "@/features/landing/data";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#FFFFFF40] mt-12 md:py-16 py-10">
      <div className="container mx-auto md:px-10 px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 lg:col-span-2 space-y-6">
          <div className="flex items-center">
            <Image 
              src="/assets/FlentraLogo.svg" 
              alt="Flentra Logo" 
              width={118} 
              height={30} 
              className="h-9 w-auto" 
            />
          </div>
          <p className="text-gray-400 text-sm max-w-xs">
            Helps teams monitor growth, understand user engagement, device activity, optimize user experiences through fast, data-driven analytics, intelligent reporting across their entire device network.
          </p>
          <div className="flex items-center gap-4">
            {footerSocials.map((social, idx) => (
              <Link
                key={idx}
                href={social.href}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors"
              >
                <Image src={social.icon} alt={social.alt} width={16} height={16} />
              </Link>
            ))}
          </div>
        </div>
        
        {footerLinks.map((column, idx) => (
          <div key={idx}>
            <h4 className="font-bold mb-6">{column.title}</h4>
            <ul className="space-y-4 text-sm text-[#FFFFFF99]">
              {column.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#FFFFFF99]">
        <p>© {currentYear} Flentra. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-white transition-colors">Security</Link>
          <Link href="#" className="hover:text-white transition-colors">Trust Center</Link>
          <Link href="#" className="hover:text-white transition-colors">Compliance</Link>
        </div>
      </div>
    </footer>
  );
}
