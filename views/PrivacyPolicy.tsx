"use client";

import LandingHeader from "@/features/landing/ui/LandingHeader";
import LandingFooter from "@/features/landing/ui/LandingFooter";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white selection:bg-blue-500/30">
      <LandingHeader />

      <main className="container mx-auto px-6 py-24 md:py-32 max-w-4xl">
        <div className="space-y-4 mb-16 border-b border-white/10 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-6 mt-8">
            Privacy Policy
          </h1>
          <div className="text-gray-400 space-y-2 text-sm md:text-base bg-white/5 p-6 rounded-2xl border border-white/5">
            <p>
              <span className="font-semibold text-gray-300">Effective date:</span> 9 July 2026
            </p>
            <p>
              <span className="font-semibold text-gray-300">Applies to:</span> Flentra for Business and Flentra for Family, and www.flentra.io
            </p>
            <p className="italic pt-2">Prepared in accordance with applicable data protection laws in Nigeria.</p>
          </div>
        </div>

        <div className="prose-lg max-w-none text-gray-300 space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">1. Introduction and Scope</h2>
            <p>
              Marimax Global Concepts Limited ("Marimax", "we", "us", or "our") owns and operates the Flentra platform, which provides two connected services: Flentra for Business, a device intelligence platform used by telecom operators, financing partners, enterprises, retailers, schools, government bodies and other organizations to track, secure, and recover mobile devices; and Flentra for Family, a mobile application that enables parents and guardians to view their child's location, manage screen time, and secure a child's device (together, the "Services").
            </p>
            <p>
              This Privacy Policy explains what personal data we collect, why we collect it, how we use and share it, how long we keep it, and the rights available to you, in accordance with the Nigeria Data Protection Act, 2023 (NDPA), applicable regulations issued by the Nigeria Data Protection Commission (NDPC), and other applicable laws.
            </p>
            <p>This Policy applies to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Visitors to our website, www.flentra.io;</li>
              <li>Businesses that subscribe to Flentra for Business - telecom operators, MVNOs, financing partners, enterprises, retailers, schools, and government agencies ("Business Customers");</li>
              <li>Individuals whose devices are managed through Flentra for Business at the direction of a Business Customer, such as subscribers, employees, or contractors ("Managed Users");</li>
              <li>Parents and guardians who register for and use Flentra for Family ("Account Holders"); and</li>
              <li>Children whose devices are monitored through Flentra for Family at the direction of a parent or guardian ("Monitored Children").</li>
            </ul>
            <p className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg mt-4 text-sm">
              Where this Policy refers to "you," it means whichever of the above categories applies to your use of the Services. If you are a Managed User, the Business Customer that issued or enrolled your device is generally responsible for explaining how your data is used — see Section 3 below.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">2. Who we are</h2>
            <p>
              Flentra is a software platform owned and operated by Marimax Global Concepts Limited ("Marimax", "we", "us", or "our"), a company incorporated under the laws of the Federal Republic of Nigeria, with its registered office at 13 Hughes Avenue, Alagomeji, Yaba, Lagos, Nigeria.
            </p>
            <p>
              Throughout this Privacy Policy, references to "Flentra" refer to the Flentra platform and related services operated by Marimax Global Concepts Limited. References to "Marimax," "we," "us," or "our" refer to Marimax Global Concepts Limited in its capacity as the data controller or data processor, as applicable.
            </p>
            <p>
              You can contact us at <a href="mailto:info@flentra.io" className="text-blue-400 hover:underline">info@flentra.io</a> or through the contact details provided in Section 25.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">3. Our role: data controller or data processor</h2>
            <p>We distinguish between a data controller, who determines the purposes and means of processing personal data, and a data processor, who processes personal data on the instructions of a controller. Flentra's role differs depending on which part of the Services you use.</p>
            
            <h3 className="text-xl font-medium text-white mt-6 mb-2">Flentra for Family</h3>
            <p>Marimax Global Concepts Limited, through the Flentra platform, acts as the data controller for personal data relating to Account Holders and, in most cases, Monitored Children, because we determine the purposes and means of processing that personal data.</p>
            
            <h3 className="text-xl font-medium text-white mt-6 mb-2">Flentra for Business</h3>
            <p>The Business Customer is ordinarily the data controller for personal data relating to its Managed Users — it decides which devices are enrolled, what policies apply, and how long data is kept. Marimax Global Concepts Limited acts as a data processor on behalf of the Business Customer, processing Managed User personal data solely on the documented instructions of the Business Customer under a written data processing agreement. Marimax Global Concepts Limited acts as a data controller only for the limited processing activities it determines itself, such as maintaining the security of the Flentra platform, managing billing relationships with Business Customers, complying with legal obligations, and maintaining its own business records.</p>
            
            <p className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg mt-4 text-sm">
              If you are a Managed User and have questions about how your personal data is used, please contact your employer or service provider (the Business Customer) in the first instance; we will support them in responding to you.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">4. Key definitions</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-white">Personal data</strong> - any information relating to an identified or identifiable natural person, including a name, identification number, location data, or online identifier.</li>
              <li><strong className="text-white">Sensitive personal data</strong> - personal data revealing racial or ethnic origin, religious or similar belief, health status, sexual life, genetic or biometric data, trade union membership, or criminal records, and any other category we may treat with heightened care.</li>
              <li><strong className="text-white">Data controller</strong> - a person or organization that determines the purposes and means of processing personal data.</li>
              <li><strong className="text-white">Data processor</strong> - a person or organization that processes personal data on behalf of, and on the instructions of, a data controller.</li>
              <li><strong className="text-white">Data subject</strong> - an identified or identifiable natural person to whom personal data relates.</li>
              <li><strong className="text-white">Processing</strong> - any operation performed on personal data, including collection, storage, use, disclosure, or erasure.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">5. Personal data we collect</h2>
            <p>The personal data we collect depends on whether you interact with our website, Flentra for Business, or Flentra for Family.</p>
            
            <div className="overflow-x-auto rounded-xl border border-white/10 mt-6">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-white/5 text-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold border-b border-white/10">Category</th>
                    <th className="px-6 py-4 font-semibold border-b border-white/10">Examples</th>
                    <th className="px-6 py-4 font-semibold border-b border-white/10">Collected from</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">Account and identity data</td>
                    <td className="px-6 py-4">Name, email address, phone number, business role, password (hashed)</td>
                    <td className="px-6 py-4">Directly from you or your Business Customer</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">Device data</td>
                    <td className="px-6 py-4">Device make and model, operating system, IMEI/serial number, SIM and network identifiers, lock and connectivity status</td>
                    <td className="px-6 py-4">Automatically, from the device and the Flentra app</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">Location data</td>
                    <td className="px-6 py-4">Real-time and historical GPS location, safe zone entry and exit events</td>
                    <td className="px-6 py-4">Automatically, from the device</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">Usage and activity data</td>
                    <td className="px-6 py-4">App usage, screen time, installed apps, content filtering events</td>
                    <td className="px-6 py-4">Automatically, from the device and the Flentra app</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">Financing and billing data (Business only)</td>
                    <td className="px-6 py-4">Payment or subscription status linked to a financed device, invoicing details for Business Customers</td>
                    <td className="px-6 py-4">From the Business Customer, or its financing partner</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">Family relationship data (Family only)</td>
                    <td className="px-6 py-4">Parent-child relationship, child's first name and age band</td>
                    <td className="px-6 py-4">Directly from the Account Holder</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">Support and communications data</td>
                    <td className="px-6 py-4">Records of correspondence, support tickets, call notes</td>
                    <td className="px-6 py-4">Directly from you</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">Technical and log data</td>
                    <td className="px-6 py-4">IP address, browser type, access times, diagnostic and crash logs</td>
                    <td className="px-6 py-4">Automatically, from your device or browser</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-400">We do not knowingly collect more personal data than is necessary for the purposes described in this Policy.</p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">6. Sensitive personal data</h2>
            <p>Sensitive personal data includes information revealing racial or ethnic origin, religious or similar belief, health status, sexual life, genetic or biometric data, trade union membership, or criminal records. Marimax does not intentionally collect sensitive personal data as part of the ordinary operation of the Services.</p>
            <p>Where a Business Customer's own device policy causes sensitive personal data to be incidentally processed through the platform (for example, a healthcare provider's field devices carrying patient-related information), that Business Customer remains the data controller for that data, is responsible for identifying a valid basis for processing it, and must instruct Flentra accordingly under the parties' data processing agreement.</p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">7. Location data and continuous monitoring</h2>
            <p>Location tracking sits at the core of the Services, whether that means locating a lost fleet device or showing a parent where their child is. We recognize that continuous location monitoring is inherently higher risk than most other data processing, even though location data is not classified as sensitive personal data. Accordingly, we apply additional safeguards to location data specifically:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Location is visible only to the specific Account Holder, or the authorized personnel of the relevant Business Customer, who are entitled to see it - never to Marimax personnel, except where access is strictly necessary to provide technical support, investigate security incidents, or comply with legal obligations.</li>
              <li>We conduct a data privacy impact assessment before launching or materially changing any location-tracking feature.</li>
              <li>Historical location data is retained only for the period described in Section 13, and is deleted or anonymized thereafter.</li>
              <li>Every access to location data through Flentra for Business is logged in an auditable trail, as described in Section 14.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">8. How we use personal data, and our lawful basis</h2>
            <p>Every instance of our processing of personal data rests on one of the following lawful bases: consent, performance of a contract, compliance with a legal obligation, protection of a vital interest, performance of a task in the public interest, or a legitimate interest that is not overridden by your rights. The table below sets out our main purposes and the basis we rely on for each.</p>
            
            <div className="overflow-x-auto rounded-xl border border-white/10 mt-6">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-white/5 text-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold border-b border-white/10">Purpose</th>
                    <th className="px-6 py-4 font-semibold border-b border-white/10">Lawful basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">Creating and administering your account</td>
                    <td className="px-6 py-4">Performance of a contract with you</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">Providing core features — location, lock, wipe, recovery, screen time, content filtering</td>
                    <td className="px-6 py-4">Performance of a contract with you or your Business Customer; consent, for Monitored Children (see Section 9)</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">Enforcing payment-linked device policy on financed devices</td>
                    <td className="px-6 py-4">Performance of a contract between the Business Customer and its own customer, processed by us on their instructions</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">Billing and invoicing Business Customers</td>
                    <td className="px-6 py-4">Performance of a contract; legal obligation, for tax and accounting records</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">Detecting fraud, misuse, or unauthorized access</td>
                    <td className="px-6 py-4">Legitimate interest in keeping the Services secure</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">Improving and maintaining the Services, including diagnostics</td>
                    <td className="px-6 py-4">Legitimate interest in operating a reliable service</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">Responding to support requests</td>
                    <td className="px-6 py-4">Performance of a contract; legitimate interest</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">Sending marketing communications</td>
                    <td className="px-6 py-4">Consent, which you may withdraw at any time (see Section 21)</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">Complying with law enforcement, court orders, or regulatory requests</td>
                    <td className="px-6 py-4">Compliance with a legal obligation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-400">Where we rely on consent, we will ask for it in clear and simple language, tell you of your right to withdraw it before you give it, and treat your silence or inactivity as something other than consent.</p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">9. Children's personal data</h2>
            <p>Flentra for Family is, by design, a service through which a parent or guardian monitors a child's device. Where personal data of a child or a person lacking the legal capacity to consent is processed, we require verifiable consent from a parent or guardian, using appropriate age and consent verification mechanisms.</p>
            <p>In practice, this means:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Only a verified adult Account Holder, confirmed as the child's parent or legal guardian at signup, can create a Monitored Child profile and enable tracking, screen time, or content-filtering features.</li>
              <li>We collect only the minimum information needed to operate the Services for a Monitored Child - typically a first name, an age band, and the device's own data - and we do not use a Monitored Child's data for advertising or marketing.</li>
              <li>An Account Holder can review, correct, or delete their child's data, or remove the child's profile entirely, at any time from within the app.</li>
              <li>Where processing is necessary to protect a child's vital interests, or is carried out by an appropriately safeguarded child-welfare or educational service, we may rely on specific limited exceptions rather than parental consent - for example, in a safety-critical emergency.</li>
              <li>We will continue to update our practices as further guidance on the processing of children's personal data becomes available in Nigeria.</li>
            </ul>
            <p>If we become aware that a Monitored Child's profile was created without appropriate parental or guardian authority, we will suspend tracking on that profile and delete the associated data, unless the parent or guardian confirms and completes the required verification.</p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">10. Automated decision-making</h2>
            <p>Some features of Flentra for Business apply automatically, based on rules the Business Customer configures - for example, restricting a financed device's functionality when a payment falls into arrears, or triggering a lock when a device leaves an approved zone. You have the right not to be subject to a decision based solely on automated processing where it produces a legal effect concerning you or similarly significantly affects you.</p>
            <p>Where such a policy could significantly affect you - for instance, restricting a device you rely on - the Business Customer that configured the policy is responsible for ensuring a human review or appeal path is available to you, and Marimax provides, through the Flentra platform, the audit logs and administrative controls necessary to support that review. Please raise any concern about an automated restriction with the Business Customer in the first instance, or with us if you are an Account Holder of Flentra for Family.</p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">11. How we share personal data</h2>
            <p>We do not sell personal data. We share personal data only in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>With the relevant Business Customer, where you are a Managed User, so that they can operate the device policy they have configured;</li>
              <li>With service providers who process personal data on our behalf - cloud hosting, SMS gateway, customer support, analytics, and payment processing providers - under written contracts that require them to protect personal data to a standard consistent with applicable law;</li>
              <li>With a financing partner named by a Business Customer, strictly to the extent needed to enforce a payment-linked device policy the Business Customer has configured;</li>
              <li>With law enforcement, courts, or regulators, where we are legally required to disclose personal data, or where disclosure is necessary to protect the vital interests of a data subject;</li>
              <li>With a prospective buyer or successor, in the event of a merger, acquisition, or sale of assets, subject to continued protection of personal data under this Policy or its successor; and</li>
              <li>With your explicit consent, for any other purpose we have described to you at the time.</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">12. Cross-border transfers of personal data</h2>
            <p>Some of our service providers, such as cloud infrastructure and analytics providers, may process personal data outside Nigeria. We only make a cross-border transfer of personal data where the recipient country, or the recipient itself, is subject to a law, binding corporate rules, contractual clauses, code of conduct, or certification mechanism that affords a level of protection adequate to, or equal to, that provided under applicable law.</p>
            <p>Where no such adequacy exists, we rely on another appropriate basis for the transfer, which may include your explicit consent to the specific transfer, the necessity of the transfer to perform a contract with you, or standard contractual clauses entered into with the recipient. We document the basis and safeguards relied on for each cross-border transfer, and we will inform the relevant regulatory authority of these measures if and as required.</p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">13. Data retention</h2>
            <p>We retain personal data only for as long as necessary to fulfil the purposes described in this Policy. As a general rule:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Account data is retained for as long as your account remains active, and for a limited period afterwards to allow reactivation, resolve disputes, and meet legal obligations.</li>
              <li>Historical location data is retained for a limited rolling period necessary for the safety, recovery, and reporting purposes it was collected for, after which it is deleted or anonymized.</li>
              <li>Financing and billing records are retained for the period required under applicable tax, accounting, and financial services laws.</li>
              <li>Support and communications records are retained for a reasonable period to allow us to review past interactions, then deleted.</li>
            </ul>
            <p>When a Business Customer terminates its subscription, Marimax deletes or returns Managed User data in accordance with our agreement with that Business Customer, unless we are required by law to retain it for longer.</p>
          </section>

          {/* Section 14 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">14. Data security</h2>
            <p>We implement appropriate technical and organizational measures to secure personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Encryption of personal data in transit and at rest;</li>
              <li>Role-based access control, so that only authorized personnel and authorized Business Customer users can access personal data relevant to their role;</li>
              <li>An encrypted, auditable log of every lock, wipe, location request, and policy change made on the platform;</li>
              <li>Support for offline control — including lock and unlock instructions delivered over SMS — so that device security does not depend solely on network connectivity; and</li>
              <li>Regular review of our security measures and periodic internal compliance audits.</li>
            </ul>
            <p>No system is completely secure, and we cannot guarantee the absolute security of personal data. If you believe your account has been compromised, please contact us immediately using the details in Section 25.</p>
          </section>

          {/* Section 15 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">15. Personal data breach notification</h2>
            <p>If a personal data breach occurs that is likely to result in a risk to your rights and freedoms, we will notify the relevant regulatory authority within 72 hours of becoming aware of the breach. Where the breach is likely to result in a high risk to your rights and freedoms, we will also notify you directly, without undue delay, describing the nature of the breach, its likely consequences, and the measures taken or proposed to address it.</p>
            <p>Where Marimax Global Concepts Limited acts as a data processor for a Business Customer, we will notify the affected Business Customer without undue delay of any personal data breach affecting the personal data it controls, enabling the Business Customer to comply with its own notification obligations under applicable law.</p>
          </section>

          {/* Section 16 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">16. Your privacy rights</h2>
            <p>Subject to certain exceptions, and to the extent Marimax Global Concepts Limited acts as the data controller for your personal data, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong className="text-white">Right to be informed</strong> - to be told, in clear language, how your personal data is processed.</li>
              <li><strong className="text-white">Right of access</strong> - to request confirmation of whether we process your personal data, and to receive a copy of it.</li>
              <li><strong className="text-white">Right to rectification</strong> - to have inaccurate, incomplete, or out-of-date personal data corrected.</li>
              <li><strong className="text-white">Right to erasure</strong> - to request deletion of your personal data where it is no longer needed for the purpose it was collected, or you have withdrawn consent and no other lawful basis applies.</li>
              <li><strong className="text-white">Right to restrict processing</strong> - to request that we limit how we use your personal data in certain circumstances.</li>
              <li><strong className="text-white">Right to data portability</strong> - to receive personal data you provided to us in a structured, commonly used, machine-readable format.</li>
              <li><strong className="text-white">Right to object</strong> - to object to processing based on our legitimate interest or the public interest, in which case we will stop unless we can demonstrate compelling grounds that override your interests.</li>
              <li><strong className="text-white">Right to withdraw consent</strong> - to withdraw consent at any time, as easily as you gave it, without affecting the lawfulness of processing carried out before withdrawal.</li>
              <li><strong className="text-white">Right not to be subject to solely automated decision-making</strong> - that produces a legal effect concerning you or similarly significantly affects you, without appropriate safeguards.</li>
              <li><strong className="text-white">Right to lodge a complaint</strong> - with the relevant data protection regulatory authority, or to seek redress before a court of competent jurisdiction.</li>
            </ul>
            <p>Where Marimax Global Concepts Limited acts as a data processor on behalf of a Business Customer, we will forward your request to the relevant Business Customer and support them in responding to it, unless you have asked us to deal with it directly and the Business Customer has authorized us to do so.</p>
          </section>

          {/* Section 17 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">17. How to exercise your rights</h2>
            <p>You can exercise any of the rights described in Section 16 by writing to us at <a href="mailto:info@flentra.io" className="text-blue-400 hover:underline">info@flentra.io</a>. We may need to verify your identity before acting on your request, to protect your personal data from being disclosed to the wrong person.</p>
            <p>We will respond to your request as promptly as possible, and in any event within the timeframe required under applicable law. If we are unable to fulfil a request - for example, because another lawful basis requires us to keep the data - we will explain why.</p>
          </section>

          {/* Section 18 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">18. Our Data Protection Officer</h2>
            <p>We have appointed a Data Protection Officer (DPO) with responsibility for monitoring our compliance with data protection law and advising us on our obligations. You can contact our DPO at <a href="mailto:dpo@flentra.io" className="text-blue-400 hover:underline">dpo@flentra.io</a> with any question or concern about how we handle personal data.</p>
          </section>

          {/* Section 19 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">19. Regulatory registration</h2>
            <p>Where Marimax Global Concepts Limited is classified as a Data Controller or Data Processor of Major Importance under applicable law, we will comply with all registration, audit, filing, and other regulatory obligations prescribed by the Nigeria Data Protection Commission (NDPC), including maintaining any required registration and submitting applicable compliance reports.</p>
          </section>

          {/* Section 20 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">20. Cookies and similar technologies</h2>
            <p>Our website uses cookies and similar technologies to keep you signed in, remember your preferences, and understand how visitors use our site. You can control cookies through your browser settings; disabling certain cookies may affect how parts of the website function. Where required, we will ask for your consent before placing non-essential cookies, and provide a way to withdraw that consent as easily as you gave it.</p>
          </section>

          {/* Section 21 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">21. Marketing communications</h2>
            <p>We will only send you marketing communications about the Services if you have consented to receive them, or, where permitted by law, in relation to a similar product or service you already use. You can opt out at any time using the unsubscribe link in any marketing message, or by contacting us directly. We do not send marketing communications to Monitored Children.</p>
          </section>

          {/* Section 22 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">22. Third-party links and services</h2>
            <p>The Services may contain links to third-party websites or integrate with third-party services, such as payment processors or app stores. This Policy does not cover the privacy practices of those third parties, and we encourage you to review their own privacy policies before providing them with personal data.</p>
          </section>

          {/* Section 23 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">23. Changes to this policy</h2>
            <p>We may update this Policy from time to time to reflect changes in our practices, the Services, or applicable law. We will post the updated Policy on our website with a revised effective date, and, where a change is material, we will provide additional notice, such as an in-app message or email, before it takes effect.</p>
          </section>

          {/* Section 24 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">24. Complaints and regulatory redress</h2>
            <p>If you are unhappy with how we have handled your personal data, we would welcome the chance to resolve it directly - please contact our DPO using the details in Section 18. You also have the right to lodge a complaint with the relevant data protection regulatory authority in Nigeria, or to seek redress before a court of competent jurisdiction.</p>
          </section>

          {/* Section 25 */}
          <section className="space-y-4 bg-white/5 p-8 rounded-2xl border border-white/10 mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6">25. Contact us</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <strong className="block text-white mb-1">Marimax Global Concepts Limited (Operator of the Flentra Platform)</strong>
                <p>13 Hughes Avenue, Alagomeji, Yaba, Lagos, Nigeria</p>
              </div>
              <div>
                <strong className="block text-white mb-1">General enquiries:</strong>
                <a href="mailto:info@flentra.io" className="text-blue-400 hover:underline">info@flentra.io</a>
              </div>
              <div>
                <strong className="block text-white mb-1">Privacy enquiries and data subject requests:</strong>
                <a href="mailto:info@flentra.io" className="text-blue-400 hover:underline">info@flentra.io</a>
              </div>
              <div>
                <strong className="block text-white mb-1">Data Protection Officer:</strong>
                <a href="mailto:dpo@flentra.io" className="text-blue-400 hover:underline">dpo@flentra.io</a>
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
