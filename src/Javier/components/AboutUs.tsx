import { Target, Users, Award, Zap } from 'lucide-react';
import { TranslationKey } from '../translations';

interface AboutUsProps {
  t: (key: TranslationKey) => string;
}

export default function AboutUs({ t }: AboutUsProps) {
  const features = [
    {
      icon: Target,
      title: t('aboutFeature1Title'),
      description: t('aboutFeature1Desc')
    },
    {
      icon: Users,
      title: t('aboutFeature2Title'),
      description: t('aboutFeature2Desc')
    },
    {
      icon: Award,
      title: t('aboutFeature3Title'),
      description: t('aboutFeature3Desc')
    },
    {
      icon: Zap,
      title: t('aboutFeature4Title'),
      description: t('aboutFeature4Desc')
    }
  ];

  return (
    <section id="about" className="section-padding bg-dark about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-side animate-slide-in-left">
            <img
              src="https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03e1d3474f727e7e7604c.jpeg"
              alt={t('aboutHeadline')}
              className="about-main-image"
            />
          </div>
          <div className="about-content-side animate-fade-in-up">
            <h2 className="section-headline text-left">{t('aboutHeadline')}</h2>
            <p className="about-description">{t('aboutDescription')}</p>
            <div className="about-features">
              {features.map((feature, index) => (
                <div key={index} className="about-feature-item">
                  <div className="about-feature-icon">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h4 className="about-feature-title">{feature.title}</h4>
                    <p className="about-feature-desc">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
