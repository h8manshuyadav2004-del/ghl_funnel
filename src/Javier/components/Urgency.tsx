import { AlertCircle, Clock } from 'lucide-react';
import { TranslationKey } from '../translations';
import { useState, useEffect } from 'react';

interface UrgencyProps {
  t: (key: TranslationKey) => string;
}

export default function Urgency({ t }: UrgencyProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 72,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 72);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding bg-darker">
      <div className="container">
        <div className="urgency-container animate-fade-in-up">
          <div className="urgency-header">
            <AlertCircle size={48} className="urgency-icon" />
            <h2 className="urgency-headline">{t('urgencyHeadline')}</h2>
            <p className="urgency-sub">{t('urgencySub')}</p>
            <p className="urgency-desc">{t('urgencyDesc')}</p>
          </div>

          <div className="spaces-left">
            <span className="spaces-text">{t('spacesLeft')}</span>
            <span className="spaces-number">{t('spacesNumber')}</span>
            <span className="spaces-text">{t('spacesText')}</span>
          </div>

          <div className="countdown-container">
            <Clock size={24} className="countdown-icon" />
            <p className="countdown-label">{t('countdownText')}</p>
            <div className="countdown-timer">
              <div className="countdown-item">
                <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="countdown-unit">h</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-item">
                <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="countdown-unit">m</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-item">
                <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="countdown-unit">s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
