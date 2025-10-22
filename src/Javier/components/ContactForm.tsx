import { Send } from 'lucide-react';
import { TranslationKey } from '../translations';
import { useState, FormEvent } from 'react';

interface ContactFormProps {
  t: (key: TranslationKey) => string;
}

export default function ContactForm({ t }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        industry: ''
      });
    }, 3000);
  };

  return (
    <section className="section-padding bg-dark">
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <h2 className="section-headline">{t('formHeadline')}</h2>
          <p className="section-sub">{t('formSub')}</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="contact-form animate-fade-in-up">
            <div className="form-row">
              <input
                type="text"
                placeholder={t('formName')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
              />
              <input
                type="email"
                placeholder={t('formEmail')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <div className="form-row">
              <input
                type="tel"
                placeholder={t('formPhone')}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="form-input"
              />
              <input
                type="text"
                placeholder={t('formCompany')}
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <input
              type="text"
              placeholder={t('formIndustry')}
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              required
              className="form-input"
            />
            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className="btn-primary btn-full btn-large"
            >
              {submitted ? (
                <>✓ {t('formCta').replace(/Solicitar|Request/, submitted ? 'Enviado' : 'Sent')}</>
              ) : isSubmitting ? (
                '...'
              ) : (
                <>
                  <span>{t('formCta')}</span>
                  <Send size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
