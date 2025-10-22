import { Quote } from 'lucide-react';
import { TranslationKey } from '../translations';

interface TestimonialsProps {
  t: (key: TranslationKey) => string;
}

export default function Testimonials({ t }: TestimonialsProps) {
  const testimonials = [
    {
      text: t('test1Text'),
      author: t('test1Author'),
      company: t('test1Company')
    },
    {
      text: t('test2Text'),
      author: t('test2Author'),
      company: t('test2Company')
    },
    {
      text: t('test3Text'),
      author: t('test3Author'),
      company: t('test3Company')
    }
  ];

  return (
    <section className="section-padding bg-dark">
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <h2 className="section-headline">{t('testimonialsHeadline')}</h2>
          <p className="section-sub">{t('testimonialsSub')}</p>
        </div>
        <div className="grid-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <Quote size={40} className="testimonial-quote" />
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="author-name">{testimonial.author}</div>
                <div className="author-company">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
