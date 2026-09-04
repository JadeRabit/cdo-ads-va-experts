'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Services', href: '#services' },
  { name: 'How It Works', href: '#funnel' },
  { name: 'Digital Products', href: '/products' },
  { name: 'Testimonials', href: '#testimonials' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-normal',
        scrolled
          ? 'bg-navy/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" aria-label="CDO Ads & VA Experts Home">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold">
              <span className="text-navy font-display font-bold text-lg">C</span>
            </div>
            <span className="hidden font-display font-bold text-xl sm:block">CDO Ads & VA Experts</span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-body-sm font-medium text-foreground-muted transition-colors hover:text-gold"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="#booking" className="text-body-sm font-medium text-foreground-muted hover:text-gold transition-colors">
              Book Free Consultation
            </Link>
            <Button size="sm" asChild>
              <Link href="#booking" className="w-full">
                Claim ₱1,000 OFF
              </Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-navy-light transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-normal ease-in-out',
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="py-4 space-y-4 border-t border-border">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-body font-medium text-foreground-muted hover:text-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3 border-t border-border">
              <Link
                href="#booking"
                className="block py-2 text-body font-medium text-foreground-muted hover:text-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Free Consultation
              </Link>
              <Button className="w-full" asChild>
                <Link href="#booking" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  Claim ₱1,000 OFF
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}