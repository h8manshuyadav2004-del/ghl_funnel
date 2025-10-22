import { Shield, CheckCircle } from 'lucide-react';
import { TranslationKey } from '../translations';

interface GuaranteeProps {
  t: (key: TranslationKey) => string;
}

export default function Guarantee({ t }: GuaranteeProps) {
  return (
    <section className="section-padding bg-darker">
      <div className="container">
        <div className="guarantee-container animate-fade-in-up">
          <div className="guarantee-image-wrapper">
            <img
              src="https://assets.cdn.filesafe.space/qNJ8OVURKM3CHIW641CJ/media/68e03dfd2a595483ebe9ae53.jpeg"
              alt="30-Day Guarantee"
              className="guarantee-image"
            />
          </div>
          <div className="guarantee-icon">
            <Shield size={64} />
          </div>
          <h2 className="guarantee-headline">{t('guaranteeHeadline')}</h2>
          <p className="guarantee-text">{t('guaranteeText')}</p>
          <div className="guarantee-badge">
            <CheckCircle size={24} />
            <span>100%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
