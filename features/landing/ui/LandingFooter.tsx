import Image from "next/image";
import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="border-t border-[#FFFFFF40] mt-12 py-16">
      <div className="container mx-auto px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 lg:col-span-2 space-y-6">
          <div className="flex items-center">
            <Image 
              src="/assets/FlentraLogo.svg" 
              alt="Flentra Logo" 
              width={118} 
              height={30} 
              className="h-7 w-auto" 
            />
          </div>
          <p className="text-gray-400 text-sm max-w-xs">
            Real-time analytics platform helping product teams understand user behavior and drive growth.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">
              <Image src="/assets/Icon1.svg" alt="Icon 1" width={16} height={16} />
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">
              <Image src="/assets/Icon2.svg" alt="Icon 2" width={16} height={16} />
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">
              <Image src="/assets/Icon3.svg" alt="Icon 3" width={16} height={16} />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-[#FFFFFF99]">
            <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-[#FFFFFF99]">
            <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-[#FFFFFF99]">
            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">GDPR</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#FFFFFF99]">
        <p>© 2026 Flentra. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-white transition-colors">Security</Link>
          <Link href="#" className="hover:text-white transition-colors">Trust Center</Link>
          <Link href="#" className="hover:text-white transition-colors">Compliance</Link>
        </div>
      </div>
    </footer>
  );
}
