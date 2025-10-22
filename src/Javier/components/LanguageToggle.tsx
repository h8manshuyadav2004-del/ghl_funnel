import { Globe } from 'lucide-react';
import { Language } from '../translations';

interface LanguageToggleProps {
  currentLanguage: Language;
  onToggle: () => void;
}

export default function LanguageToggle({ currentLanguage, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="language-toggle"
      aria-label="Toggle language"
    >
      <Globe size={16} />
      <span>{currentLanguage === 'es' ? 'ENGLISH' : 'ESPAÑOL'}</span>
    </button>
  );
}
