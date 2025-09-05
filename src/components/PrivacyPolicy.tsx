import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function PrivacyPolicy() {
  const lastUpdated = "3 September 2025";
  const companyName = "Netfin Wealth Management";
  const companyEmail = "finance@netfin.co.uk";
  const companyPhone = "020 7123 4567";
  const companyAddress = "123 Financial District, Suite 500, London, EC2N 1AB";

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-medium">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>

          <Card>
            <CardContent className="prose prose-gray max-w-none pt-6">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-medium mb-4">1. Introduction</h2>
                  <p className="text-muted-foreground mb-4">
                    {companyName} ("we", "us", or "our") is committed to protecting and respecting your privacy. This privacy policy explains how we collect, use, and protect your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                  </p>
                  <p className="text-muted-foreground">
                    For the purpose of data protection law, the data controller is {companyName}, registered at {companyAddress}.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">2. Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">We may collect and process the following personal data:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Identity Data:</strong> First name, last name, title</li>
                    <li><strong>Contact Data:</strong> Email address, telephone numbers, postal address</li>
                    <li><strong>Financial Data:</strong> Information about your financial situation, investment goals, and risk tolerance</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, time zone settings, operating system</li>
                    <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
                    <li><strong>Marketing Data:</strong> Your preferences in receiving marketing from us</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">3. Legal Basis for Processing</h2>
                  <p className="text-muted-foreground mb-4">We process your personal data on the following legal grounds:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Contract:</strong> Processing necessary for the performance of our services</li>
                    <li><strong>Legal Obligation:</strong> Processing necessary to comply with legal requirements (e.g., anti-money laundering regulations)</li>
                    <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate interests (e.g., business development, fraud prevention)</li>
                    <li><strong>Consent:</strong> Where you have given clear consent for us to process your personal data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">4. How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">We use your personal data for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>To provide financial advisory and wealth management services</li>
                    <li>To verify your identity and conduct due diligence checks</li>
                    <li>To communicate with you about our services</li>
                    <li>To comply with legal and regulatory requirements</li>
                    <li>To improve our website and services</li>
                    <li>To send marketing communications (with your consent)</li>
                    <li>To prevent fraud and maintain security</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">5. Data Sharing and Disclosure</h2>
                  <p className="text-muted-foreground mb-4">We may share your personal data with:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Service Providers:</strong> Third parties who provide services on our behalf (e.g., IT support, professional advisors)</li>
                    <li><strong>Financial Institutions:</strong> Banks, investment platforms, and insurance companies as necessary to provide our services</li>
                    <li><strong>Regulatory Bodies:</strong> FCA, HMRC, and other regulatory authorities as required by law</li>
                    <li><strong>Professional Advisors:</strong> Lawyers, accountants, and auditors</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    We require all third parties to respect the security of your personal data and treat it in accordance with the law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">6. International Transfers</h2>
                  <p className="text-muted-foreground">
                    We do not transfer your personal data outside the UK or European Economic Area (EEA) unless adequate safeguards are in place, such as Standard Contractual Clauses approved by the Information Commissioner's Office (ICO).
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">7. Data Security</h2>
                  <p className="text-muted-foreground">
                    We have implemented appropriate technical and organisational measures to protect your personal data against unauthorised or unlawful processing, accidental loss, destruction, or damage. These measures include encryption, access controls, regular security assessments, and staff training.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">8. Data Retention</h2>
                  <p className="text-muted-foreground mb-4">
                    We retain your personal data only for as long as necessary to fulfil the purposes for which we collected it, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Client records: 6 years after the end of our relationship (as required by FCA regulations)</li>
                    <li>Financial records: 7 years (as required by HMRC)</li>
                    <li>Marketing data: Until you withdraw consent or object to processing</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">9. Your Rights</h2>
                  <p className="text-muted-foreground mb-4">Under UK GDPR, you have the following rights:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Right to Rectification:</strong> Request correction of inaccurate personal data</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your personal data in certain circumstances</li>
                    <li><strong>Right to Restrict Processing:</strong> Request limitation of processing in certain circumstances</li>
                    <li><strong>Right to Data Portability:</strong> Receive your personal data in a structured, commonly used format</li>
                    <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing</li>
                    <li><strong>Rights Related to Automated Decision-Making:</strong> Not to be subject to solely automated decisions</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    To exercise any of these rights, please contact us at {companyEmail}.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">10. Cookies and Similar Technologies</h2>
                  <p className="text-muted-foreground mb-4">
                    Our website uses cookies and similar technologies to enhance your browsing experience, 
                    analyze website traffic, and provide personalized content. We obtain your consent before 
                    setting any non-essential cookies in accordance with UK GDPR and PECR regulations.
                  </p>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">Cookie Management</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      You have full control over which cookies we use. You can:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Manage your preferences through our cookie consent banner</li>
                      <li>• Change your settings anytime using the "Cookie Settings" link in our footer</li>
                      <li>• Withdraw consent for non-essential cookies at any time</li>
                      <li>• Request deletion of all stored cookie data</li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    <strong>Types of cookies we use:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                    <li><strong>Strictly Necessary:</strong> Essential for website functionality (always active)</li>
                    <li><strong>Analytics:</strong> Help us understand website usage and improve our services</li>
                    <li><strong>Functional:</strong> Enable enhanced features and personalization</li>
                    <li><strong>Third-Party:</strong> Set by external services we use (e.g., Sanity CMS, Google Fonts)</li>
                  </ul>

                  <p className="text-muted-foreground">
                    For detailed information about specific cookies, purposes, and retention periods, 
                    please see our comprehensive{' '}
                    <a href="/cookies" className="text-primary hover:underline font-medium">
                      Cookie Policy
                    </a>.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">11. Marketing Communications</h2>
                  <p className="text-muted-foreground">
                    We will only send you marketing communications if you have opted in to receive them. You can opt out at any time by clicking the "unsubscribe" link in any marketing email or by contacting us directly.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">12. Children's Privacy</h2>
                  <p className="text-muted-foreground">
                    Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal data from children under 18. If we become aware that we have collected personal data from a child under 18, we will take steps to delete such information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">13. Changes to This Policy</h2>
                  <p className="text-muted-foreground">
                    We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we protect your information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">14. Complaints</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any concerns about how we handle your personal data, please contact us first so we can try to resolve your concern. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO):
                  </p>
                  <div className="bg-secondary/30 p-4 rounded-lg text-muted-foreground">
                    <p className="mb-2">Information Commissioner's Office</p>
                    <p className="mb-2">Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</p>
                    <p className="mb-2">Telephone: 0303 123 1113</p>
                    <p>Website: www.ico.org.uk</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">15. Contact Information</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this privacy policy or our data practices, please contact our Data Protection Officer:
                  </p>
                  <div className="bg-secondary/30 p-4 rounded-lg text-muted-foreground">
                    <p className="mb-2"><strong>{companyName}</strong></p>
                    <p className="mb-2">Data Protection Officer</p>
                    <p className="mb-2">Email: {companyEmail}</p>
                    <p className="mb-2">Phone: {companyPhone}</p>
                    <p>Address: {companyAddress}</p>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}