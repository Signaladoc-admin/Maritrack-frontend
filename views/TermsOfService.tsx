"use client";

import LandingHeader from "@/features/landing/ui/LandingHeader";
import LandingFooter from "@/features/landing/ui/LandingFooter";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white selection:bg-blue-500/30">
      <LandingHeader />

      <main className="container mx-auto px-6 py-24 md:py-32 max-w-4xl">
        <div className="space-y-4 mb-16 border-b border-white/10 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-6 mt-8">
            Terms of Service
          </h1>
          <div className="text-gray-400 space-y-2 text-sm md:text-base bg-white/5 p-6 rounded-2xl border border-white/5">
            <p>
              <span className="font-semibold text-gray-300">Effective date:</span> 9 July 2026
            </p>
            <p>
              <span className="font-semibold text-gray-300">Applies to:</span> Flentra for Business and Flentra for Family, and www.flentra.io
            </p>
            <p className="italic pt-2">This document should be read together with the Flentra Privacy Policy, which explains how we handle personal data and is incorporated into these Terms by reference.</p>
          </div>
        </div>

        <div className="prose-lg max-w-none text-gray-300 space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">1. Acceptance of these Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you and Marimax Technologies Limited ("Marimax", "we", "us", or "our"), the owner and operator of the Flentra platform.
            </p>
            <p>
              These Terms govern your access to and use of Flentra for Business, Flentra for Family, our website at www.flentra.io, and any related mobile applications, web applications, dashboards, software, APIs, and services (collectively, the "Services").
            </p>
            <p>
              By creating an account, installing an application, clicking to accept, or otherwise accessing or using the Services, you agree to be bound by these Terms. If you are entering into these Terms on behalf of a company or other organization, you confirm that you have authority to bind that organization, and "you" refers to both you and that organization. If you do not agree to these Terms, you must not access or use the Services.
            </p>
            <p>
              Where a separate written agreement, order form, or data processing agreement exists between Flentra and a Business Customer, and its terms conflict with these Terms, that separate agreement will govern to the extent of the conflict.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">2. Description of the services</h2>
            <p>Flentra provides two connected services:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-white">Flentra for Business</strong> — a device intelligence platform that allows organizations to track, lock, restrict, wipe, and recover mobile devices, and to enforce device-related policies such as payment-linked restrictions on financed handsets.</li>
              <li><strong className="text-white">Flentra for Family</strong> — a mobile application that allows a parent or guardian to view a child's device location, manage screen time, filter apps and content, and lock or locate a lost or stolen device.</li>
            </ul>
            <p>
              The specific features available to you depend on your subscription plan, device compatibility, and, for Managed Users and Monitored Children, the configuration chosen by the Business Customer or Account Holder responsible for that device.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">3. Eligibility and who may use Flentra</h2>
            <p>
              You must be at least 18 years old to create a Flentra account, whether as a Business Customer representative or as an Account Holder of Flentra for Family. Flentra for Family is designed for use by parents and legal guardians to manage the devices of children in their care; it is not intended to be used directly by children, and we do not knowingly permit a child to register their own Account Holder profile.
            </p>
            <p>
              You must also have the legal capacity to enter into a binding contract, and, if using the Services on behalf of an organization, the actual authority to do so.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">4. Your account</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials, and for all activity that occurs under your account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Provide accurate, current, and complete information when registering, and keep it up to date;</li>
              <li>Notify us promptly at <a href="mailto:info@flentra.io" className="text-blue-400 hover:underline">info@flentra.io</a> if you become aware of any unauthorized use of your account or any other security breach;</li>
              <li>Not share your account credentials with anyone who is not authorized to access the Services on your behalf.</li>
            </ul>
            <p>
              We may suspend or terminate your account if we reasonably believe your account credentials have been compromised or that your account is being used in violation of these Terms.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">5. Lawful use, consent, and authority to track a device</h2>
            <p>
              Flentra's device-tracking and monitoring features may only be used where you have a clear legal right to do so. Using Flentra to track, monitor, lock, or access another person's device without their knowledge, where you do not have that right, may be unlawful and is strictly prohibited.
            </p>
            <p>Before enabling location tracking, monitoring, or remote control features on any device, you confirm and warrant that:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-white">For Flentra for Family:</strong> you are the parent or legal guardian of the Monitored Child, or otherwise have legal authority to make decisions about that child's device use, and that your use of the Services is consistent with applicable law in your jurisdiction;</li>
              <li><strong className="text-white">For Flentra for Business:</strong> you are the Business Customer that lawfully owns, leases, finances, or issues the device — or you are authorized to act on that Business Customer's behalf — and that enrolling the device is consistent with the Business Customer's agreements with the device user and with applicable law, including, where required, providing notice to the device user;</li>
              <li>You will not use the Services to track, monitor, or control a device belonging to a spouse, partner, family member, employee, or any other individual, where you do not have the legal right or their informed consent to do so;</li>
              <li>You will not use the Services to stalk, harass, intimidate, or otherwise harm another person, or to violate another person's reasonable expectation of privacy.</li>
            </ul>
            <p className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg mt-4 text-sm">
              Flentra reserves the right to investigate suspected misuse of the Services, and to suspend or terminate any account used, or reasonably suspected of being used, in violation of this Section, without prior notice.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">6. Acceptable use policy</h2>
            <p>In addition to Section 5, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Use the Services for any unlawful purpose, or in a way that infringes the rights of any third party;</li>
              <li>Reverse engineer, decompile, disassemble, or attempt to derive the source code of any part of the Services, except to the extent this restriction is prohibited by applicable law;</li>
              <li>Interfere with or disrupt the integrity or performance of the Services, including through introducing malware, attempting unauthorized access, or conducting security testing without our prior written consent;</li>
              <li>Resell, sublicense, or provide access to the Services to any third party, except as expressly permitted under a written agreement with Flentra;</li>
              <li>Use the Services to build a competing product, or to benchmark the Services for that purpose;</li>
              <li>Remove, obscure, or alter any proprietary notices on the Services;</li>
              <li>Misrepresent your identity or your authority to enroll a device or act on behalf of a Business Customer, Account Holder, or Monitored Child.</li>
            </ul>
            <p>
              We may suspend your access to the Services immediately, without liability, if we reasonably believe you have violated this Section.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">7. Terms specific to Flentra for Business</h2>
            
            <h3 className="text-xl font-medium text-white mt-6 mb-2">License</h3>
            <p>Subject to your compliance with these Terms and payment of applicable fees, we grant your organization a limited, non-exclusive, non-transferable license to access and use Flentra for Business during your subscription term, solely for your own internal business purposes and those of your Managed Users.</p>
            
            <h3 className="text-xl font-medium text-white mt-6 mb-2">Your responsibilities as a Business Customer</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>You are responsible for configuring device policies (including lock, wipe, and payment-linked restrictions) in a manner consistent with your own agreements with your Managed Users and with applicable law;</li>
              <li>You are responsible for providing any notices to, or obtaining any consents from, your Managed Users that are required under applicable law before enrolling their devices;</li>
              <li>You are responsible for the accuracy of any data you provide to us, including device inventories, financing status, and contact details;</li>
              <li>Where a data processing agreement is in place between you and Flentra, you remain the data controller for your Managed Users' personal data, and Flentra will process that data only on your documented instructions.</li>
            </ul>

            <h3 className="text-xl font-medium text-white mt-6 mb-2">Managed devices</h3>
            <p>Certain features, such as remote lock, restriction, and wipe, will alter the functionality of an enrolled device. You are solely responsible for the consequences of applying these features to a device, including any loss of access, data, or functionality experienced by the Managed User, except to the extent caused by Flentra's own negligence or breach of these Terms.</p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">8. Terms specific to Flentra for Family</h2>
            
            <h3 className="text-xl font-medium text-white mt-6 mb-2">Parental responsibility</h3>
            <p>As an Account Holder, you are solely responsible for how you use Flentra for Family in relation to a Monitored Child, including deciding what to monitor, how to act on information the Services provide, and how to discuss the use of the Services with your child, where you consider it appropriate to do so.</p>
            
            <h3 className="text-xl font-medium text-white mt-6 mb-2">No guarantee of safety outcomes</h3>
            <p>Flentra for Family is a tool to support you in caring for your child; it is not a substitute for direct parental supervision, and it cannot guarantee your child's safety or prevent every risk. Location accuracy, screen time reporting, and content filtering depend on device settings, network conditions, and the underlying operating system, and may not be complete or instantaneous.</p>
            
            <h3 className="text-xl font-medium text-white mt-6 mb-2">Transition to adulthood</h3>
            <p>Where a Monitored Child reaches the age of majority, or otherwise gains the legal right to control their own device under applicable law, you agree to stop using the Services to monitor that individual's device without their informed consent, and to remove their profile from your account if they request it.</p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">9. Fees, billing, and payment</h2>
            <p>Certain parts of the Services require payment of subscription fees, as set out at the time of purchase or in an order form agreed with a Business Customer. Unless otherwise stated:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Subscription fees are billed in advance on a recurring basis (monthly) and are non-refundable except as required by law or as expressly stated in these Terms;</li>
              <li>You authorize us, or our payment processor, to charge your chosen payment method for all fees due;</li>
              <li>If a payment fails, we may suspend access to paid features until payment is successfully made;</li>
              <li>Fees are exclusive of applicable taxes, levies, or duties, which you are responsible for, except taxes based on our net income;</li>
              <li>We may change our fees on renewal, on reasonable prior notice to you.</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">10. Free trials and promotional offers</h2>
            <p>
              We may offer a free trial or promotional pricing for the Services. We may require payment details to start a trial, and, unless you cancel before the trial ends, your subscription will automatically convert to a paid plan and be billed at the applicable rate. We may modify or discontinue any trial or promotional offer at any time.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">11. Service availability and performance</h2>
            <p>
              We aim to keep the Services available and performing reliably, but we do not guarantee uninterrupted or error-free operation. Location tracking, remote lock, and other features depend on factors outside our control, including the Monitored Child's or Managed User's device settings, network coverage, battery level, and whether location or connectivity services are enabled on the device. We may perform scheduled or emergency maintenance that temporarily limits access to the Services.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">12. Intellectual property</h2>
            <p>
              Flentra and its licensors own all right, title, and interest in and to the Services, including all related software, designs, trademarks, and documentation. Except for the limited license granted in these Terms, nothing in these Terms transfers any intellectual property right to you. Any feedback or suggestions you provide about the Services may be used by us without restriction or obligation to you.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">13. Your content and data</h2>
            <p>
              You retain ownership of the data you or your devices submit to the Services, including account information, device data, and location data ("Your Data"). You grant Flentra a license to host, process, and use Your Data solely to provide, maintain, and improve the Services, and as otherwise described in our Privacy Policy. You are responsible for ensuring that Your Data, and your use of the Services, does not violate any law or any third party's rights.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">14. Privacy and data protection</h2>
            <p>
              Our collection and use of personal data in connection with the Services is described in our Privacy Policy, available at <a href="https://www.flentra.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">www.flentra.io</a>, which is incorporated into these Terms by reference. By using the Services, you acknowledge that you have reviewed the Privacy Policy.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">15. Third-party services and integrations</h2>
            <p>
              The Services may integrate with, or rely on, third-party services, such as mobile operating system providers, app stores, payment processors, and SMS gateways. We are not responsible for the availability, content, or practices of these third-party services, and your use of them may be subject to their own separate terms.
            </p>
          </section>

          {/* Section 16 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">16. Confidentiality (Business Customers)</h2>
            <p>
              Each party agrees to protect the other's confidential information, disclosed in connection with the Services, with at least the same degree of care it uses to protect its own confidential information of similar importance, and not to disclose it to third parties except as necessary to perform its obligations, as required by law, or with the disclosing party's consent. This Section does not apply to information that is or becomes publicly available through no fault of the receiving party, or that was already known to the receiving party without an obligation of confidentiality.
            </p>
          </section>

          {/* Section 17 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">17. Term, suspension, and termination</h2>
            <p>
              These Terms remain in effect for as long as you use the Services. You may stop using the Services, or delete your account, at any time; a Business Customer's ability to terminate a paid subscription is governed by the relevant order form or agreement.
            </p>
            <p>We may suspend or terminate your access to the Services, in whole or in part, immediately and without liability, if:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>You materially breach these Terms, including the lawful use requirements in Section 5 or the acceptable use policy in Section 6, and, where the breach is capable of remedy, fail to remedy it within a reasonable period after notice;</li>
              <li>You fail to pay fees when due;</li>
              <li>We are required to do so by law, or to protect the security or integrity of the Services or other users; or</li>
              <li>We reasonably believe your continued use poses a risk of harm to another person.</li>
            </ul>
          </section>

          {/* Section 18 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">18. Effect of termination</h2>
            <p>
              On termination of your access to the Services, your right to use the Services ends immediately. We will handle any personal data associated with your account in accordance with our Privacy Policy and, for Business Customers, any applicable data processing agreement, including deleting or returning Managed User data as agreed, unless we are required by law to retain it for longer. Provisions of these Terms that by their nature should survive termination - including Sections 12, 13, 16, 19, 20, 21, and 23 - will survive.
            </p>
          </section>

          {/* Section 19 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">19. Disclaimers</h2>
            <p className="uppercase text-sm tracking-wider text-gray-400">
              Except as expressly stated in these Terms, the Services are provided "as is" and "as available," without warranties of any kind, whether express, implied, or statutory, including any implied warranties of merchantability, fitness for a particular purpose, title, or non-infringement. Flentra does not warrant that the Services will be uninterrupted, error-free, or completely secure, that a lost or stolen device will always be recovered, or that location, screen-time, or content-filtering data will always be accurate or complete.
            </p>
          </section>

          {/* Section 20 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">20. Limitation of liability</h2>
            <p className="uppercase text-sm tracking-wider text-gray-400">
              To the maximum extent permitted by applicable law, Flentra will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill, arising out of or relating to your use of, or inability to use, the Services, even if we have been advised of the possibility of such damages.
            </p>
            <p className="uppercase text-sm tracking-wider text-gray-400">
              To the maximum extent permitted by applicable law, Flentra's total aggregate liability arising out of or relating to these Terms or the Services will not exceed the total amount you paid to Flentra for the Services in the twelve (12) months immediately preceding the event giving rise to the claim.
            </p>
            <p className="uppercase text-sm tracking-wider text-gray-400">
              Nothing in these Terms limits or excludes liability that cannot be limited or excluded under applicable law, including liability for death or personal injury caused by negligence, or for fraud.
            </p>
          </section>

          {/* Section 21 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">21. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Flentra and its officers, employees, and agents from and against any claims, damages, liabilities, costs, and expenses (including reasonable legal fees) arising out of or relating to: your use of the Services in violation of these Terms, including Section 5; your violation of any law or the rights of a third party; or Your Data. Flentra reserves the right, at your expense, to assume the exclusive defense and control of any matter subject to indemnification by you.
            </p>
          </section>

          {/* Section 22 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">22. Force majeure</h2>
            <p>
              Neither party will be liable for any failure or delay in performance under these Terms resulting from causes beyond that party's reasonable control, including natural disasters, acts of government, labor disputes, internet or telecommunications failures, or power outages.
            </p>
          </section>

          {/* Section 23 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">23. Governing law and dispute resolution</h2>
            <p>
              These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to its conflict of law principles. The parties will first attempt to resolve any dispute arising out of or relating to these Terms through good-faith negotiation. If a dispute is not resolved within thirty (30) days, either party may pursue any remedy available to it before a court of competent jurisdiction in Nigeria, or, where the parties separately agree in writing, through arbitration.
            </p>
          </section>

          {/* Section 24 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">24. Changes to these terms</h2>
            <p>
              We may update these Terms from time to time to reflect changes in the Services, our business, or applicable law. We will post the updated Terms on our website with a revised effective date, and, where a change is material, we will provide additional notice, such as an in-app message or email, before it takes effect. Your continued use of the Services after a change takes effect constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Section 25 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">25. General provisions</h2>
            <ul className="list-disc pl-6 space-y-4 text-gray-400">
              <li><strong className="text-white">Entire agreement</strong> - these Terms, together with the Privacy Policy and any order form or written agreement between you and Flentra, constitute the entire agreement between you and Flentra regarding the Services.</li>
              <li><strong className="text-white">Assignment</strong> - you may not assign or transfer these Terms without our prior written consent; we may assign these Terms in connection with a merger, acquisition, or sale of assets.</li>
              <li><strong className="text-white">Severability</strong> - if any provision of these Terms is found unenforceable, the remaining provisions will remain in full effect, and the unenforceable provision will be interpreted to best reflect the parties' intent.</li>
              <li><strong className="text-white">No waiver</strong> - our failure to enforce any provision of these Terms is not a waiver of our right to do so later.</li>
              <li><strong className="text-white">Notices</strong> - we may provide notices to you by email, through the Services, or by posting on our website; you may provide notices to us using the contact details in Section 26.</li>
              <li><strong className="text-white">Relationship of the parties</strong> - nothing in these Terms creates a partnership, joint venture, agency, or employment relationship between you and Flentra.</li>
            </ul>
          </section>

          {/* Section 26 */}
          <section className="space-y-4 bg-white/5 p-8 rounded-2xl border border-white/10 mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6">26. Contact us</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <strong className="block text-white mb-1">Marimax Global Concepts Limited (Operators of Flentra)</strong>
                <p>13 Hughes Avenue, Alagomeji, Yaba, Lagos, Nigeria</p>
              </div>
              <div>
                <strong className="block text-white mb-1">General enquiries:</strong>
                <a href="mailto:info@flentra.io" className="text-blue-400 hover:underline">info@flentra.io</a>
              </div>
              <div>
                <strong className="block text-white mb-1">Website:</strong>
                <a href="https://www.flentra.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">www.flentra.io</a>
              </div>
            </div>
          </section>

        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
