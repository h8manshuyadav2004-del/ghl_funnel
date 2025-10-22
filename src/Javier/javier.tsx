import { useState, useEffect } from 'react';
import { translations, Language, TranslationKey } from './translations';
import Navigation from './components/Navigation';
import LanguageToggle from './components/LanguageToggle';
import Hero from './components/Hero';
import Stats from './components/Stats';
import AboutUs from './components/AboutUs';
import Problem from './components/Problem';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Urgency from './components/Urgency';
import FAQ from './components/FAQ';
import Guarantee from './components/Guarantee';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './javier_index.css'

function Javier() {
  const [language, setLanguage] = useState<Language>('es');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const t = (key: TranslationKey): string => {
    return translations[language][key];
  };

  const toggleLanguage = () => {
    setIsTransitioning(true);
    document.body.style.opacity = '0.7';

    setTimeout(() => {
      const newLang: Language = language === 'es' ? 'en' : 'es';
      setLanguage(newLang);
      localStorage.setItem('lang', newLang);
      document.body.style.opacity = '1';
      setIsTransitioning(false);
    }, 150);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlanSelect = (plan: string) => {
    console.log('Selected plan:', plan);
    scrollToForm();
  };

  return (
    <div className="app" style={{ transition: 'opacity 0.15s ease' }}>
      <Navigation t={t} currentLanguage={language} />
      <LanguageToggle currentLanguage={language} onToggle={toggleLanguage} />

      <Hero t={t} onCtaClick={scrollToForm} />
      <Stats t={t} />
      <AboutUs t={t} />
      <Problem t={t} />
      <Benefits t={t} />
      <Testimonials t={t} />
      <Process t={t} />
      <Pricing t={t} onSelectPlan={handlePlanSelect} />
      <Urgency t={t} />
      <FAQ t={t} />
      <Guarantee t={t} />
      <div id="contact-form">
        <ContactForm t={t} />
      </div>
      <Footer t={t} />
    </div>
  );
}

export default Javier;
