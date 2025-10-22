import { TrendingUp, DollarSign, Zap, Clock } from 'lucide-react';
import { TranslationKey } from '../translations';

interface BenefitsProps {
  t: (key: TranslationKey) => string;
}

export default function Benefits({ t }: BenefitsProps) {
  const benefits = [
    {
      icon: TrendingUp,
      title: t('benefit1Title'),
      description: t('benefit1Desc'),
      gradient: 'from-blue-500 to-cyan-500',
      image: 'https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03e1384c6bb0479d9010d.jpeg'
    },
    {
      icon: DollarSign,
      title: t('benefit2Title'),
      description: t('benefit2Desc'),
      gradient: 'from-green-500 to-emerald-500',
      image: 'https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03e0c2a5954dbc1e9af88.jpeg'
    },
    {
      icon: Zap,
      title: t('benefit3Title'),
      description: t('benefit3Desc'),
      gradient: 'from-orange-500 to-amber-500',
      image: 'https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03e0a84c6bb6a05d8ff69.jpeg'
    },
    {
      icon: Clock,
      title: t('benefit4Title'),
      description: t('benefit4Desc'),
      gradient: 'from-purple-500 to-pink-500',
      image: 'https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03e082a5954d3c5e9af03.jpeg'
    }
  ];

  return (
    <section className="section-padding bg-darker">
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <h2 className="section-headline">{t('benefitsHeadline')}</h2>
          <p className="section-sub">{t('benefitsSub')}</p>
        </div>
        <div className="grid-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-image-container">
                <img src={benefit.image} alt={benefit.title} className="card-image" />
              </div>
              <div className={`benefit-icon bg-gradient-to-br ${benefit.gradient}`}>
                <benefit.icon size={28} />
              </div>
              <h3 className="card-title">{benefit.title}</h3>
              <p className="card-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
