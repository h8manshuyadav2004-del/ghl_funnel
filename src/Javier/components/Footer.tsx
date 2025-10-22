import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { TranslationKey } from '../translations';

interface FooterProps {
  t: (key: TranslationKey) => string;
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03e49767b861cbf73a5ce.jpeg"
                alt="AJ Group Online Logo"
                className="footer-logo-img"
              />
            </div>
            <p className="footer-tagline">{t('footerTagline')}</p>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">{t('footerFollowUs')}</h4>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Contacto</h4>
            <div className="footer-contact">
              <a href={`mailto:${t('footerEmail')}`} className="contact-item">
                <Mail size={16} />
                <span>{t('footerEmail')}</span>
              </a>
              <a href={`tel:${t('footerPhone').replace(/\s/g, '')}`} className="contact-item">
                <Phone size={16} />
                <span>{t('footerPhone')}</span>
              </a>
              <div className="contact-item">
                <MapPin size={16} />
                <span>{t('footerAddress')}</span>
              </div>
            </div>
          </div>

          <div className="footer-links">
            <a href="#privacy">{t('footerPrivacy')}</a>
            <span className="footer-separator">•</span>
            <a href="#terms">{t('footerTerms')}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t('footerRights')}</p>
        </div>
      </div>
    </footer>
  );
}
