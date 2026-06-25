export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">Last updated: June 25, 2025</p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using InstaBot's services, you agree to be bound by
              these Terms of Service. If you do not agree to these terms, please do
              not use our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              InstaBot provides an AI-powered Instagram automation platform that allows
              users to automate responses to Instagram DMs and comments, manage leads
              in a built-in CRM, and schedule posts — all from a single dashboard.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
            <ul className="text-muted-foreground leading-relaxed list-disc list-inside space-y-2">
              <li>You must comply with Meta's and Instagram's Terms of Service and Community Guidelines</li>
              <li>You are responsible for all content sent through automations you configure</li>
              <li>You must not use our platform to send spam or misleading messages</li>
              <li>You must keep your account credentials secure and confidential</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">4. Instagram Platform Policy Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our service operates through Meta's official Instagram Graph API.
              You agree to use our platform only in ways that are compliant with
              Meta's Platform Terms and Developer Policies. We reserve the right to
              suspend accounts that violate these policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All platform content, features, and functionality (including but not
              limited to text, graphics, logos, and software) are the exclusive
              property of InstaBot and are protected by applicable intellectual
              property laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              InstaBot shall not be liable for any indirect, incidental, or consequential
              damages arising from your use of the service, including any disruptions
              caused by Meta or Instagram platform changes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your account at any time
              if you violate these Terms. You may also close your account at any
              time from your dashboard settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms from time to time. We will notify you of
              significant changes by email or through an in-app notice. Continued
              use of the service after changes constitutes your acceptance of the
              new terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For any questions regarding these Terms, contact us at:{" "}
              <a href="mailto:piyush89986@gmail.com" className="text-primary underline">
                piyush89986@gmail.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
