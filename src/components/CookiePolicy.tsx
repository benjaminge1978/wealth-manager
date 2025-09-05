import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function CookiePolicy() {
  const lastUpdated = "5 September 2025";
  const companyName = "Netfin Wealth Management";
  const companyEmail = "privacy@netfin.co.uk";

  const cookieCategories = [
    {
      category: "Strictly Necessary Cookies",
      purpose: "These cookies are essential for the website to function and cannot be switched off in our systems.",
      badge: "Essential",
      badgeVariant: "default" as const,
      examples: [
        {
          name: "Session Cookies",
          purpose: "Maintain user session and navigation state",
          duration: "Session only",
          thirdParty: "No"
        }
      ]
    },
    {
      category: "Analytics Cookies", 
      purpose: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      badge: "Optional",
      badgeVariant: "secondary" as const,
      examples: [
        {
          name: "FAQ Analytics (localStorage)",
          purpose: "Track which FAQ sections are most viewed to improve content",
          duration: "Persistent (local storage only)",
          thirdParty: "No"
        },
        {
          name: "Google Analytics (when enabled)",
          purpose: "Website traffic analysis and user behavior insights",
          duration: "2 years",
          thirdParty: "Yes - Google"
        }
      ]
    },
    {
      category: "Functional Cookies",
      purpose: "These cookies enable enhanced functionality and personalization.",
      badge: "Optional", 
      badgeVariant: "secondary" as const,
      examples: [
        {
          name: "Email Capture Data (localStorage)",
          purpose: "Store guide download requests for improved user experience", 
          duration: "Persistent (local storage only)",
          thirdParty: "No"
        },
        {
          name: "Cookie Consent Preferences",
          purpose: "Remember your cookie consent choices",
          duration: "1 year",
          thirdParty: "No"
        }
      ]
    },
    {
      category: "Third-Party Service Cookies",
      purpose: "Cookies set by external services we use to provide functionality.",
      badge: "Optional",
      badgeVariant: "outline" as const,
      examples: [
        {
          name: "Sanity CMS",
          purpose: "Content management system for dynamic content delivery",
          duration: "As per Sanity's policy",
          thirdParty: "Yes - Sanity.io"
        },
        {
          name: "Google Fonts",
          purpose: "Load custom fonts for website typography",
          duration: "As per Google's policy", 
          thirdParty: "Yes - Google"
        },
        {
          name: "ConvertKit (when enabled)",
          purpose: "Email marketing and lead capture functionality",
          duration: "As per ConvertKit's policy",
          thirdParty: "Yes - ConvertKit"
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-medium">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This Cookie Policy explains how {companyName} uses cookies and similar technologies 
              when you visit our website. It tells you what cookies are, how we use them, and 
              how you can control them.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-8">
              <section>
                <h2 className="text-2xl font-medium mb-4">What are cookies?</h2>
                <p className="text-muted-foreground mb-4">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
                  when you visit a website. They are widely used to make websites work, or work more 
                  efficiently, as well as to provide information to the owners of the site.
                </p>
                <p className="text-muted-foreground">
                  Cookies set by the website owner (in this case, {companyName}) are called "first-party cookies". 
                  Cookies set by parties other than the website owner are called "third-party cookies".
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium mb-4">Why do we use cookies?</h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies for several reasons:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>To ensure our website functions properly and securely</li>
                  <li>To improve your browsing experience and website performance</li>
                  <li>To understand how you use our website so we can improve it</li>
                  <li>To remember your preferences and settings</li>
                  <li>To provide content and features that are relevant to you</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-medium mb-6">Types of cookies we use</h2>
                <div className="space-y-6">
                  {cookieCategories.map((category, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{category.category}</CardTitle>
                          <Badge variant={category.badgeVariant}>{category.badge}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{category.purpose}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 font-medium">Cookie Name</th>
                                <th className="text-left py-2 font-medium">Purpose</th>
                                <th className="text-left py-2 font-medium">Duration</th>
                                <th className="text-left py-2 font-medium">Third Party</th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.examples.map((example, exampleIndex) => (
                                <tr key={exampleIndex} className="border-b last:border-b-0">
                                  <td className="py-2 font-medium">{example.name}</td>
                                  <td className="py-2 text-muted-foreground">{example.purpose}</td>
                                  <td className="py-2 text-muted-foreground">{example.duration}</td>
                                  <td className="py-2 text-muted-foreground">{example.thirdParty}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-medium mb-4">Local Storage and Session Storage</h2>
                <p className="text-muted-foreground mb-4">
                  In addition to cookies, we also use browser storage technologies like Local Storage 
                  and Session Storage to enhance your experience:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>FAQ Analytics:</strong> We store which FAQ sections you view to help us improve our content (stored locally only)</li>
                  <li><strong>Email Capture Data:</strong> We temporarily store your guide download requests to improve the user experience</li>
                  <li><strong>Form Data:</strong> We may temporarily store form inputs to prevent data loss</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-medium mb-4">Third-party cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Some cookies on our website are set by third-party services:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Sanity CMS:</strong> Provides content management functionality</li>
                  <li><strong>Google Fonts:</strong> Loads custom fonts for better typography</li>
                  <li><strong>ConvertKit:</strong> Handles email marketing and lead capture (when enabled)</li>
                  <li><strong>Social Media Platforms:</strong> When you use our social sharing buttons, the respective platforms may set cookies</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  These third parties have their own privacy policies. We recommend reviewing their 
                  policies to understand how they use cookies and your data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium mb-4">How to control cookies</h2>
                <p className="text-muted-foreground mb-4">
                  You have several options to control or limit how we and our partners use cookies:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Cookie Consent Manager</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      You can manage your cookie preferences using our consent banner or by clicking the 
                      "Cookie Settings" link in our website footer.
                    </p>
                    <button 
                      className="text-primary hover:underline text-sm font-medium"
                      onClick={() => {
                        // Redirect to homepage with hash to trigger cookie settings
                        window.location.href = '/?cookies=settings';
                      }}
                    >
                      Open Cookie Settings
                    </button>
                  </div>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Browser Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      You can set your browser to refuse all or some browser cookies, or to alert you 
                      when cookies are being sent. Please note that disabling cookies may affect the 
                      functionality of our website.
                    </p>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Opt-out Links</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      You can opt out of interest-based advertising through these industry tools:
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• <a href="https://www.youronlinechoices.com/uk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Your Online Choices (UK)</a></li>
                      <li>• <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out</a></li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-medium mb-4">Updates to this Cookie Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect changes to the cookies 
                  we use or for other operational, legal, or regulatory reasons. Please revisit this 
                  Cookie Policy regularly to stay informed about our use of cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-medium mb-4">Contact us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm"><strong>Email:</strong> {companyEmail}</p>
                  <p className="text-sm"><strong>Address:</strong> 123 Financial District, Suite 500, London, EC2N 1AB</p>
                  <p className="text-sm"><strong>Phone:</strong> 020 7123 4567</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}