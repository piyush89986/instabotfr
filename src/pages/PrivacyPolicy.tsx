export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: June 25, 2025</p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              InstaBot ("we", "our", or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and share information
              about you when you use our services, including our website and AI Instagram
              automation platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <ul className="text-muted-foreground leading-relaxed list-disc list-inside space-y-2">
              <li>Account information (name, email address, company name)</li>
              <li>Instagram account data you explicitly connect to our platform (via Meta OAuth)</li>
              <li>Messages and comments from your connected Instagram account for automation purposes</li>
              <li>Usage data and analytics to improve our service</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <ul className="text-muted-foreground leading-relaxed list-disc list-inside space-y-2">
              <li>To provide and operate our AI automation services</li>
              <li>To process Instagram messages and comments on your behalf</li>
              <li>To generate automated AI responses using OpenAI</li>
              <li>To send you important account-related notifications</li>
              <li>To improve and personalize your experience</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">4. Instagram Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              We access your Instagram account data solely to provide the automation
              features you configure. We do not sell your Instagram data to third
              parties. You can disconnect your Instagram account at any time from
              your dashboard, which will revoke our access.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">5. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your personal data. We share data only with:
            </p>
            <ul className="text-muted-foreground leading-relaxed list-disc list-inside space-y-2 mt-2">
              <li>OpenAI – to generate AI responses to messages</li>
              <li>Meta (Instagram) – to send automated replies on your behalf</li>
              <li>Infrastructure providers (MongoDB, Redis, Render) – to store and process your data securely</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your data for as long as your account is active. You may
              request deletion of your account and associated data at any time by
              contacting us at the email below.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, correct, or delete your personal data.
              You can also withdraw consent for Instagram data access at any time
              through your Instagram account settings or our platform dashboard.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:{" "}
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
