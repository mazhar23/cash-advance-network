import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Star, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const usefulLinks = [
    { name: "Home", href: "/" },
    { name: "Verification", href: "/apply" },
    { name: "Services", href: "/services" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Ad Disclosure", href: "/ad-dislosure" },
    { name: "About Us", href: "/about-us" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <img src="/aaa-1.png" alt="Advance America" className="h-12 w-auto mb-4" />
            <p className="text-background/70 mb-6 max-w-sm">
              cashadvanceamerica.online online loan platform offers installment loans to middle-income consumers, who may have bad credit or no credit and require personal loans, loans for bad credit, or no credit check loans.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold text-background mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="font-semibold text-background mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="" className="text-background/70 hover:text-background transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="" className="text-background/70 hover:text-background transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="" className="text-background/70 hover:text-background transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="" className="text-background/70 hover:text-background transition-colors">
                <Star className="h-6 w-6" />
              </a>
              <a href="" className="text-background/70 hover:text-background transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Map and Contact */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d96778.51111329654!2d-74.002549!3d40.710785!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1591615664513!5m2!1sen!2sus"
              width="100%"
              height="220"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="flex items-center">
            <div>
              <h4 className="font-semibold text-background mb-2">Contact Us:</h4>
              <p className="text-background/70">support@cashadvanceamerica.online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-xs text-background/50 leading-relaxed space-y-4">
            <p>
              CashAdvance America Online ("CashAdvance America Online" or "we" or "our") owns and operates the website located at cashadvanceamerica.online (the "Site"). CashAdvance America Online provides and maintains this site for your information, conditioned on your acceptance, without modification, of the terms, conditions and notices contained in this Terms of Use.
            </p>
            <p>
              <strong>Legal Disclaimer:</strong> The purpose of this website is to connect potential borrowers with the lenders and financial service providers that advertise on this website. The operator of this website is neither a lender nor a broker and does not make any credit decisions. This website merely takes information from consumers and forwards it to lenders and third parties who may be able to provide the types of loans that may meet the consumers needs. For those consumers who do not qualify for a Personal Loan, we will refer you to alternative lenders and providers. This website shall not be considered an offer or solicitation for a loan. There is no guarantee that you will be approved for any type of loan. We do not charge you for the service we provide and are not a representative or agent of any lender or third party provider. We are compensated by lenders and third parties. The time it takes for money to transfer to your account will vary by lender and also depend on your individual financial institution. You may be required to fax information to your lender in order to receive a loan. This service and lenders are not available in all states. If you have any question regarding the details of your loan, you should contact your lender directly. Personal loans and other types of loans should not be considered a long term financial solution. They are means to provide short term financing to solve immediate financial needs. Lenders and third party providers may perform a credit check with one or more credit agencies. These credit checks can have an impact on your credit score. By submitting your request, you are authorizing the lenders and third party providers to independently verify the information you submitted and your credit worthiness. Nothing on this website shall constitute an offer or solicitation for a loan.
            </p>
            <p>
              <strong>Availability:</strong> Residents of some states in the U.S. may not qualify for a bad credit loan as a result of certain lender requirements. The Website does not guarantee that completing a loan request form will result in you being offered a loan product by a lender, or you being offered a product with rates or terms as desired.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-xs text-background/50">
            Copyright © 2026 Advance America. All Rights Reserved.
          </p>
          <p className="text-xs text-background/50 mt-2">
            Powered by Advance America Online
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;