import { ArrowRight, Play } from 'lucide-react';
import { TranslationKey } from '../translations';

interface HeroProps {
  t: (key: TranslationKey) => string;
  onCtaClick: () => void;
}

export default function Hero({ t, onCtaClick }: HeroProps) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-background-overlay"></div>
      <div className="container">
        <div className="hero-content-wrapper">
          <div className="hero-content animate-fade-in-up">
            <h1 className="hero-headline">
              {t('heroHeadline')}
            </h1>
            <p className="hero-sub">
              {t('heroSub')}
            </p>
            <p className="hero-description">
              {t('heroDescription')}
            </p>
            <div className="hero-cta-group">
              <button onClick={onCtaClick} className="btn-primary btn-large">
                <Play size={20} />
                <span>{t('heroCta')}</span>
              </button>
              <button onClick={onCtaClick} className="btn-secondary btn-large">
                <span>{t('heroCtaSecondary')}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="hero-video-container animate-fade-in-up">
            <video
              className="hero-video"
              src="https://res.cloudinary.com/dovihvbst/video/upload/v1761134476/Javier_fINAL_r5ra4q.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
