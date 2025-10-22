import { Search, Code, Rocket } from 'lucide-react';
import { TranslationKey } from '../translations';

interface ProcessProps {
  t: (key: TranslationKey) => string;
}

export default function Process({ t }: ProcessProps) {
  const steps = [
    {
      icon: Search,
      title: t('process1Title'),
      description: t('process1Desc'),
      number: '01',
      image: 'https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03e0684c6bbb613d8ff0f.jpeg'
    },
    {
      icon: Code,
      title: t('process2Title'),
      description: t('process2Desc'),
      number: '02',
      image: 'https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03e013474f77670e75d22.jpeg'
    },
    {
      icon: Rocket,
      title: t('process3Title'),
      description: t('process3Desc'),
      number: '03',
      image: 'https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03dfecf034a01ea5f9959.jpeg'
    }
  ];

  return (
    <section className="section-padding bg-darker">
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <h2 className="section-headline">{t('processHeadline')}</h2>
          <p className="section-sub">{t('processSub')}</p>
        </div>
        <div className="process-grid">
          {steps.map((step, index) => (
            <div key={index} className="process-card animate-slide-in-left" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="process-number">{step.number}</div>
              <div className="card-image-container">
                <img src={step.image} alt={step.title} className="card-image" />
              </div>
              <div className="process-icon">
                <step.icon size={32} />
              </div>
              <h3 className="card-title">{step.title}</h3>
              <p className="card-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
