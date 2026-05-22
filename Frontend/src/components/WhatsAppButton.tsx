import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function WhatsAppButton() {
  const { lang } = useLanguage();
  const phoneNumber = '+212610090067';
  const messages = {
    fr: "Bonjour, je souhaite obtenir un devis pour un projet de design graphique et impression numérique.",
    en: "Hello, I would like to get a quote for a graphic design and digital printing project.",
    ar: "مرحباً، أريد الحصول على عرض سعر لمشروع تصميم وطباعة رقمية."
  };
  const labels = {
    fr: 'WhatsApp',
    en: 'WhatsApp',
    ar: 'واتساب'
  };
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messages[lang])}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-full shadow-lg shadow-[#25D366]/30 transition-all duration-300"
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 2 }}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
      </div>
      <span className="hidden sm:inline text-sm">{labels[lang]}</span>
    </motion.a>
  );
}
