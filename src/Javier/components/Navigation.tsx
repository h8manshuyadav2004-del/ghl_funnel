import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { TranslationKey } from '../translations';

interface NavigationProps {
  t: (key: TranslationKey) => string;
  currentLanguage: string;
}

export default function Navigation({ t, currentLanguage }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { key: 'navHome', href: '#home' },
    { key: 'navAbout', href: '#about' },
    { key: 'navBenefits', href: '#benefits' },
    { key: 'navProcess', href: '#process' },
    { key: 'navPricing', href: '#pricing' },
    { key: 'navContact', href: '#contact-form' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'navigation-scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }} className="nav-logo">
            <img
              src="https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03e49767b861cbf73a5ce.jpeg"
              alt="AJ Group Online"
              className="nav-logo-img"
            />
          </a>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`nav-menu ${isMobileMenuOpen ? 'nav-menu-open' : ''}`}>
            {menuItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="nav-link"
              >
                {t(item.key as TranslationKey)}
              </a>
            ))}
            <a
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact-form');
              }}
              className="nav-cta"
            >
              {t('navCtaButton')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
