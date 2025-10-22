import { PhoneOff, Clock, TrendingDown } from 'lucide-react';
import { TranslationKey } from '../translations';

interface ProblemProps {
  t: (key: TranslationKey) => string;
}

export default function Problem({ t }: ProblemProps) {
  const problems = [
    {
      icon: PhoneOff,
      title: t('problem1Title'),
      description: t('problem1Desc'),
      color: '#EF4444',
      image: 'https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03e1d3474f727e7e7604c.jpeg'
    },
    {
      icon: Clock,
      title: t('problem2Title'),
      description: t('problem2Desc'),
      color: '#F59E0B',
      image: 'https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03e1bbb793a2beb67990f.jpeg'
    },
    {
      icon: TrendingDown,
      title: t('problem3Title'),
      description: t('problem3Desc'),
      color: '#8B5CF6',
      image: 'https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03e1734c87c524f245f7d.jpeg'
    }
  ];

  return (
    <section className="section-padding bg-dark">
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <h2 className="section-headline">{t('problemHeadline')}</h2>
          <p className="section-sub">{t('problemSub')}</p>
        </div>
        <div className="grid-3">
          {problems.map((problem, index) => (
            <div key={index} className="problem-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-image-container">
                <img src={problem.image} alt={problem.title} className="card-image" />
              </div>
              <div className="problem-icon" style={{ backgroundColor: `${problem.color}20` }}>
                <problem.icon size={32} style={{ color: problem.color }} />
              </div>
              <h3 className="card-title">{problem.title}</h3>
              <p className="card-description">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
