import { Check, Sparkles } from 'lucide-react';
import { TranslationKey } from '../translations';

interface PricingProps {
  t: (key: TranslationKey) => string;
  onSelectPlan: (plan: string) => void;
}

export default function Pricing({ t, onSelectPlan }: PricingProps) {
  const plans = [
    {
      name: 'basic',
      title: t('basicTitle'),
      price: t('basicPrice'),
      features: [
        t('basicFeat1'),
        t('basicFeat2'),
        t('basicFeat3'),
        t('basicFeat4'),
        t('basicFeat5')
      ],
      cta: t('basicCta'),
      popular: false
    },
    {
      name: 'premium',
      title: t('premiumTitle'),
      price: t('premiumPrice'),
      badge: t('premiumBadge'),
      features: [
        t('premiumFeat1'),
        t('premiumFeat2'),
        t('premiumFeat3'),
        t('premiumFeat4'),
        t('premiumFeat5'),
        t('premiumFeat6')
      ],
      cta: t('premiumCta'),
      popular: true
    },
    {
      name: 'elite',
      title: t('eliteTitle'),
      price: t('elitePrice'),
      features: [
        t('eliteFeat1'),
        t('eliteFeat2'),
        t('eliteFeat3'),
        t('eliteFeat4'),
        t('eliteFeat5'),
        t('eliteFeat6')
      ],
      cta: t('eliteCta'),
      popular: false
    }
  ];

  return (
    <section className="section-padding bg-dark">
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <h2 className="section-headline">{t('pricingHeadline')}</h2>
          <p className="section-sub">{t('pricingSub')}</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''} animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="pricing-badge">
                  <Sparkles size={14} />
                  <span>{plan.badge}</span>
                </div>
              )}
              <h3 className="pricing-title">{plan.title}</h3>
              <div className="pricing-price">{plan.price}</div>
              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <Check size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSelectPlan(plan.name)}
                className={plan.popular ? 'btn-primary btn-full' : 'btn-secondary btn-full'}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
