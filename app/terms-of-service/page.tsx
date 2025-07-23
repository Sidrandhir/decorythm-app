// app/terms-of-service/page.tsx

import LegalPageLayout from '@/components/shared/LegalPageLayout';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service">
      <p className="text-sm text-red-600 font-bold">
        IMPORTANT LEGAL NOTICE: This is a template and not legal advice. You must consult with a qualified legal professional to customize this document for your specific business needs.
      </p>
      <p>Last Updated: 18 April 2025</p>
      
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using the Decorythm.com website and its related services ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years of age, or the age of legal majority in your jurisdiction, to create an account and use our Service. By using Decorythm, you represent and warrant that you meet this requirement.
      </p>

      <h2>3. Description of Services</h2>
      <p>
        Decorythm provides an AI-powered platform that allows users to upload images of their spaces ("User Images") and receive AI-generated interior design concepts ("Generated Designs").
      </p>

      <h2>4. User Responsibilities</h2>
      <ul>
        <li>You agree to provide true, accurate, and complete information when creating your account.</li>
        <li>You are solely responsible for the User Images you upload. You must own the rights to these images or have permission to use them.</li>
        <li>You must not upload any content that is illegal, defamatory, obscene, or infringing on intellectual property rights.</li>
        <li>You agree not to misuse the Service, including attempting to gain unauthorized access, introducing malware, or reverse-engineering our technology.</li>
      </ul>

      <h2>5. Account Registration and Security</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
      </p>

      <h2>6. Payment and Credits</h2>
      <ul>
        <li>Access to certain features of the Service requires the purchase of "Credits".</li>
        <li>All applicable fees and plans are listed on our official Pricing page.</li>
        <li>Payments are processed securely through a third-party payment processor (e.g., Stripe).</li>
        <li>All purchases of Credits are final and non-refundable, unless otherwise required by applicable law.</li>
      </ul>

      <h2>7. Intellectual Property and Generated Content</h2>
      <ul>
        <li>You retain full ownership rights to the User Images you upload.</li>
        <li>By uploading a User Image, you grant Decorythm a limited, worldwide, non-exclusive license to use, reproduce, and modify that image solely for the purpose of providing the Service and generating your designs.</li>
        <li>Decorythm and its licensors own all rights to the Service itself, including the underlying AI technology. We retain the right to use Generated Designs for service improvement, analytics, and marketing purposes.</li>
        <li>You may use the Generated Designs you create for your own personal or commercial purposes, subject to these Terms.</li>
      </ul>

      <h2>8. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your account and access to the Service at our sole discretion, without notice, for any conduct that we believe violates these Terms or is harmful to other users of the Service, us, or third parties. You may also terminate your account at any time by contacting our support team.
      </p>
      
      <h2>9. Disclaimer of Warranties</h2>
      <p>
        The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Decorythm makes no warranties, express or implied, regarding the service's reliability, accuracy, or availability. AI-generated content is for inspirational purposes and should not be considered as a substitute for professional architectural or construction advice.
      </p>

      <h2>10. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Decorythm shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of the Service.
      </p>
      
      <h2>11. Modifications to Terms</h2>
      <p>
        We may modify these Terms at any time. We will post the most current version on this page and update the "Last Updated" date. By continuing to use the Service after changes become effective, you agree to be bound by the revised Terms.
      </p>
      
      <h2>12. Governing Law</h2>
      <p>
        These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction/Country], without regard to its conflict of law provisions.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at <Link href="mailto:support@decorythm.com" className="text-accent hover:underline">support@decorythm.com</Link>.
      </p>
    </LegalPageLayout>
  );
}