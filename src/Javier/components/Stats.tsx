import { TrendingUp, Users, Globe, Award } from 'lucide-react';
import { TranslationKey } from '../translations';

interface StatsProps {
  t: (key: TranslationKey) => string;
}

export default function Stats({ t }: StatsProps) {
  const stats = [
    {
      icon: Users,
      number: '500+',
      label: t('statsClients'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      number: '42%',
      label: t('statsSalesIncrease'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      number: '15',
      label: t('statsCountries'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      number: '350%',
      label: t('statsROI'),
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="stat-card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`stat-icon bg-gradient-to-br ${stat.color}`}>
                  <Icon size={32} />
                </div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
