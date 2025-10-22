import { Plus, Minus } from 'lucide-react';
import { TranslationKey } from '../translations';
import { useState } from 'react';

interface FAQProps {
  t: (key: TranslationKey) => string;
}

export default function FAQ({ t }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t('faq1Q'),
      answer: t('faq1A')
    },
    {
      question: t('faq2Q'),
      answer: t('faq2A')
    },
    {
      question: t('faq3Q'),
      answer: t('faq3A')
    },
    {
      question: t('faq4Q'),
      answer: t('faq4A')
    }
  ];

  return (
    <section className="section-padding bg-dark">
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <h2 className="section-headline">{t('faqHeadline')}</h2>
          <p className="section-sub">{t('faqSub')}</p>
        </div>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'faq-item-open' : ''} animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
              </button>
              <div className={`faq-answer ${openIndex === index ? 'faq-answer-open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
