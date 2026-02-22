import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Accessibility as AccessibilityIcon, Eye, Ear, MousePointer, Keyboard } from "lucide-react";

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Accessibility Statement
              </h1>
              <p className="text-primary-foreground/80">
                Our commitment to making our services accessible to everyone
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <AccessibilityIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment</h2>
                      <p className="text-muted-foreground">
                        Cash Advance Network Online is committed to ensuring digital accessibility for people with 
                        disabilities. We are continually improving the user experience for everyone and 
                        applying the relevant accessibility standards to ensure we provide equal access to
                        all users.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Accessibility Features</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Eye className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Visual Accessibility</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• High contrast color schemes</li>
                          <li>• Resizable text without loss of functionality</li>
                          <li>• Alt text for all images</li>
                          <li>• Clear visual focus indicators</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Keyboard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Keyboard Navigation</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Full keyboard accessibility</li>
                          <li>• Skip navigation links</li>
                          <li>• Logical tab order</li>
                          <li>• No keyboard traps</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Ear className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Screen Reader Support</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• ARIA labels and landmarks</li>
                          <li>• Descriptive link text</li>
                          <li>• Form labels and instructions</li>
                          <li>• Error identification</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <MousePointer className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Motor Accessibility</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Large clickable areas</li>
                          <li>• No time limits on interactions</li>
                          <li>• Minimal motion design</li>
                          <li>• Touch-friendly interface</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Conformance Status</h2>
                  <p className="text-muted-foreground mb-4">
                    We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. 
                    These guidelines explain how to make web content more accessible for people with 
                    disabilities and more user-friendly for everyone.
                  </p>
                  <p className="text-muted-foreground">
                    We regularly test our website using automated accessibility tools and manual testing 
                    to identify and address accessibility issues.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Compatible Technologies</h2>
                  <p className="text-muted-foreground mb-4">
                    Our website is designed to be compatible with the following assistive technologies:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
                    <li>• Screen magnification software</li>
                    <li>• Speech recognition software</li>
                    <li>• Keyboard-only navigation</li>
                    <li>• Modern web browsers (Chrome, Firefox, Safari, Edge)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Known Limitations</h2>
                  <p className="text-muted-foreground mb-4">
                    While we strive to ensure accessibility, some limitations may exist:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Some third-party content may not be fully accessible</li>
                    <li>• Some PDF documents may have limited accessibility features</li>
                    <li>• Legacy content is being updated on an ongoing basis</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    We are actively working to address these limitations and improve accessibility across 
                    all aspects of our website.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Alternative Access</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have difficulty accessing any part of our website, we offer alternative methods 
                    to access our services:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Email:</strong> Send your inquiry to accessibility@cashadvancenetwork.com</li>
                    <li>• <strong>TTY:</strong> TTY users can reach us through your state's relay service</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Feedback</h2>
                  <p className="text-muted-foreground mb-4">
                    We welcome your feedback on the accessibility of our website. If you encounter 
                    accessibility barriers or have suggestions for improvement, please contact us:
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-muted-foreground">
                      <strong>Email:</strong> accessibility@cashadvancenetwork.com<br />
                      <strong>Response Time:</strong> We aim to respond within 2 business days
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Accessibility;
