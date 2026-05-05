import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-primary-foreground/80">
                Last updated: January 1, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <div className="bg-card border border-border rounded-xl p-8 md:p-12 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
                  <p className="text-muted-foreground">
                    Cash Advance America Online ("we," "our," or "us") is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                    when you visit our website cashadvanceamerica.online and use our loan matching services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Personal Information</h3>
                  <p className="text-muted-foreground mb-4">
                    When you apply for a loan through our service, we collect:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Full name, date of birth, and Social Security Number</li>
                    <li>Contact information (email, phone number, address)</li>
                    <li>Employment and income information</li>
                    <li>Bank account details</li>
                    <li>Driver's license or state ID information</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-foreground mb-2 mt-6">Automatically Collected Information</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>IP address and device information</li>
                    <li>Browser type and operating system</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website addresses</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">We use your information to:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Match you with potential lenders in our network</li>
                    <li>Process and evaluate your loan application</li>
                    <li>Verify your identity and prevent fraud</li>
                    <li>Communicate with you about your application</li>
                    <li>Improve our services and user experience</li>
                    <li>Comply with legal and regulatory requirements</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Information Sharing</h2>
                  <p className="text-muted-foreground mb-4">We may share your information with:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li><strong>Lending Partners:</strong> To evaluate and process your loan application</li>
                    <li><strong>Service Providers:</strong> Who help us operate our business</li>
                    <li><strong>Credit Bureaus:</strong> For credit checks and reporting</li>
                    <li><strong>Legal Authorities:</strong> When required by law</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    <strong>We never sell your personal information to third parties for marketing purposes.</strong>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures including 256-bit SSL encryption 
                    to protect your personal information. However, no method of transmission over the 
                    Internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
                  <p className="text-muted-foreground mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Access your personal information</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your information</li>
                    <li>Opt out of marketing communications</li>
                    <li>File a complaint with regulatory authorities</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Cookies</h2>
                  <p className="text-muted-foreground">
                    We use cookies and similar technologies to enhance your experience, analyze site usage, 
                    and assist in our marketing efforts. You can control cookies through your browser settings, 
                    but disabling cookies may limit your ability to use some features of our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Children's Privacy</h2>
                  <p className="text-muted-foreground">
                    Our services are not intended for individuals under 18 years of age. We do not knowingly 
                    collect personal information from children.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy from time to time. We will notify you of any changes 
                    by posting the new policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have questions about this Privacy Policy, please contact us at:<br />
                    Email: privacy@cashadvanceamerica.online
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;