// app/privacy-policy/page.tsx

import LegalPageLayout from '@/components/shared/LegalPageLayout';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p className="text-sm text-red-600 font-bold">
        IMPORTANT LEGAL NOTICE: This is a template and not legal advice. You must consult with a qualified legal professional to customize this document for your specific business needs and ensure compliance with all applicable laws (like GDPR, CCPA, etc.).
      </p>
      <p>Last Updated: 18 April 2025</p>
      
      <h2>1. Introduction</h2>
      <p>
        At Decorythm, we value your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website and services ("Service").
      </p>

      <h2>2. Information We Collect</h2>
      <p>We collect several types of information to provide and improve our Service to you:</p>
      <ul>
        <li><strong>Personal Information:</strong> This includes your name, email address, and phone number when you register for an account. When you make a purchase, our payment processor (Stripe) collects your billing and payment information.</li>
        <li><strong>Uploaded Content:</strong> We collect the interior room images or photos you upload to the Service, as well as the AI-generated outputs and designs created from them.</li>
        <li><strong>Usage Data:</strong> We automatically collect data when you interact with our Service, such as your IP address, browser type, device information, pages visited, and session duration. This is collected via cookies and other analytics technologies.</li>
        <li><strong>Communication Data:</strong> We collect information when you communicate with us, including emails, messages to our support team, and any feedback you provide.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>Your information is used for the following purposes:</p>
      <ul>
        <li>To provide and process the AI-generated designs which are core to our Service.</li>
        <li>To manage your account, process payments, and provide customer support.</li>
        <li>To improve our website's functionality, AI models, and overall user experience.</li>
        <li>To send you important service updates, and marketing or product announcements (you may opt-out of marketing communications at any time).</li>
        <li>For internal analytics, to monitor the health of our service, and for security and fraud prevention.</li>
      </ul>
      
      <h2>4. How We Share Your Information</h2>
      <p>We do not sell your personal information. We only share your data with trusted third-party service providers who assist us in operating our Service, including:</p>
      <ul>
        <li><strong>Cloud & AI Providers:</strong> We share your uploaded images with AI service providers (like Replicate) to generate designs, and we store your data with secure cloud hosting providers.</li>
        <li><strong>Payment Processors:</strong> Your payment information is provided directly to our payment processors (e.g., Stripe) who securely handle the transaction.</li>
        <li><strong>Analytics Providers:</strong> We share usage data with analytics services (e.g., Google Analytics) to understand how our service is used.</li>
      </ul>
      <p>We may also disclose your information if required by law or in connection with a business transfer, such as a merger or acquisition.</p>

      <h2>5. Cookies & Tracking Technologies</h2>
      <p>
        We use cookies, pixels, and other tracking technologies to operate our Service, personalize your experience, and analyze usage. You can control or refuse cookies through your browser settings, though some features of the Service may not function properly without them.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain your personal data for as long as your account is active or as needed to provide you with our services. Generated images and uploaded content may be stored to improve our AI models but can be deleted upon request. You can request the deletion of your account and associated data by contacting us.
      </p>

      <h2>7. Security Measures</h2>
      <p>
        We implement robust security measures, including HTTPS encryption and secure server infrastructure, to protect your data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee its absolute security.
      </p>

      <h2>8. Your Rights (GDPR/CCPA)</h2>
      <p>Depending on your location, you have certain rights over your personal data:</p>
      <ul>
        <li>The right to access, correct, or update your information.</li>
        <li>The right to request the deletion of your personal data.</li>
        <li>The right to opt-out of marketing communications.</li>
        <li>The right to data portability.</li>
      </ul>
      <p>To exercise these rights, please contact us at the address below.</p>

      <h2>9. Third-Party Links</h2>
      <p>
        Our Service may contain links to other websites not operated by us. If you click a third-party link, you will be directed to that third party's site. We have no control over and assume no responsibility for the content or privacy practices of any third-party sites.
      </p>
      
      <h2>10. Children’s Privacy</h2>
      <p>
        Our Service is not intended for use by anyone under the age of 18. We do not knowingly collect personally identifiable information from children.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have any questions or requests regarding your data or this Privacy Policy, please contact us at <Link href="mailto:privacy@decorythm.com" className="text-accent hover:underline">privacy@decorythm.com</Link>.
      </p>
    </LegalPageLayout>
  );
}