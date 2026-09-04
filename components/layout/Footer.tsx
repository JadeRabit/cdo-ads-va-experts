import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/cdoadsvaexperts', icon: Facebook, ariaLabel: 'Follow us on Facebook' },
  { name: 'Instagram', href: 'https://instagram.com/cdoadsvaexperts', icon: Instagram, ariaLabel: 'Follow us on Instagram' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/cdoadsvaexperts', icon: Linkedin, ariaLabel: 'Connect on LinkedIn' },
];

const contactInfo = [
  { icon: MapPin, text: 'Cagayan de Oro City, Philippines', label: 'Office' },
  { icon: Mail, text: 'hello@cdoadsvaexperts.com', label: 'Email', href: 'mailto:hello@cdoadsvaexperts.com' },
  { icon: Phone, text: '+63 XX XXX XXXX', label: 'Phone', href: 'tel:+63XXXXXXXXXX' },
  { icon: Clock, text: 'Mon–Fri, 9:00 AM – 6:00 PM (PHT)', label: 'Hours' },
];

const footerLinks = {
  Services: [
    { name: 'Facebook Ads Management', href: '#services' },
    { name: 'Social Media Management', href: '#services' },
    { name: 'Virtual Assistant Services', href: '#services' },
    { name: 'Digital Products', href: '/products' },
  ],
  Company: [
    { name: 'About Us', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ],
  Resources: [
    { name: 'Free Templates', href: '/products?category=free' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '#booking' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark border-t border-border" role="contentinfo">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2" aria-label="CDO Ads & VA Experts Home">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold">
                <span className="text-navy font-display font-bold text-xl">C</span>
              </div>
              <span className="font-display font-bold text-2xl">CDO Ads & VA Experts</span>
            </Link>
            <p className="text-body text-foreground-muted max-w-xs">
              Your Ads Don&apos;t Need More Clicks. They Need Better Next Steps.
              Expert Facebook Ads Management, Social Media Management, Virtual Assistant Services, and Digital Products.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-light text-foreground-muted transition-all duration-fast hover:bg-gold hover:text-navy hover:shadow-gold"
                  aria-label={social.ariaLabel}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <dl className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-light text-gold shrink-0">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-caption text-foreground-muted">{item.label}</dt>
                    <dd className="text-body-sm">
                      {item.href ? (
                        <a href={item.href} className="text-foreground hover:text-gold transition-colors">
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-foreground-muted">{item.text}</span>
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <nav className="space-y-6" aria-label="Services">
            <h3 className="font-semibold text-foreground">Services</h3>
            <ul className="space-y-3">
              {footerLinks.Services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-body-sm text-foreground-muted hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="space-y-6" aria-label="Company">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-body-sm text-foreground-muted hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="space-y-6" aria-label="Resources">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.Resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-body-sm text-foreground-muted hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <p className="text-body-sm text-foreground-muted">
              © {currentYear} CDO Ads & VA Experts. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-end space-x-6">
              <Link href="/privacy" className="text-body-sm text-foreground-muted hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-body-sm text-foreground-muted hover:text-gold transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-body-sm text-foreground-muted hover:text-gold transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}