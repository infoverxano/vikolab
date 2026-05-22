import { motion } from 'framer-motion';
import { Logo } from '../components/Logo';
import { ArrowUp, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { lang, dir } = useLanguage();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const content = {
    fr: {
      brand: "Agence de design graphique et impression numérique à casablanca. 27 services professionnels.",
      services: ["Impression Numérique", "Logo & Identité", "Cartes Visite", "Signalétique", "Habillage Véhicule", "Réseaux Sociaux"],
      company: ["À Propos", "Portfolio", "Contact"],
      legal: ["Confidentialité", "Conditions"],
      backToTop: "Haut", rights: "Tous droits réservés."
    },
    en: {
      brand: "Graphic design and digital printing agency in casablanca. 27 professional services.",
      services: ["Digital Printing", "Logo & Identity", "Business Cards", "Signage", "Vehicle Wrap", "Social Media"],
      company: ["About", "Portfolio", "Contact"],
      legal: ["Privacy", "Terms"],
      backToTop: "Top", rights: "All rights reserved."
    },
    ar: {
      brand: "وكالة تصميم وطباعة رقمية في الدار البيضاء. 27 خدمة احترافية.",
      services: ["الطباعة الرقمية", "شعار وهوية", "بطاقات", "لافتات", "تغليف سيارات", "تواصل"],
      company: ["من نحن", "أعمالنا", "تواصل"],
      legal: ["الخصوصية", "الشروط"],
      backToTop: "أعلى", rights: "جميع الحقوق محفوظة."
    }
  };

  const t = content[lang];

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-1">
              <Logo size="sm" className="mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed">{t.brand}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">{lang === 'fr' ? 'Services' : lang === 'en' ? 'Services' : 'خدمات'}</h4>
              <ul className="space-y-2">{t.services.map((item, i) => (<li key={i}><a href="#services" className="text-gray-400 hover:text-[#F4F416] transition-colors text-sm">{item}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">{lang === 'fr' ? 'Entreprise' : lang === 'en' ? 'Company' : 'شركتنا'}</h4>
              <ul className="space-y-2">{t.company.map((item, i) => (<li key={i}><a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-[#F4F416] transition-colors text-sm">{item}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">{lang === 'fr' ? 'Légal' : lang === 'en' ? 'Legal' : 'قانوني'}</h4>
              <ul className="space-y-2">{t.legal.map((item, i) => (<li key={i}><a href="#" className="text-gray-400 hover:text-[#F4F416] transition-colors text-sm">{item}</a></li>))}</ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm flex items-center gap-1">
              © 2024 Vikolab. {lang === 'fr' ? 'Fait avec' : lang === 'en' ? 'Made with' : 'بالحب من'} <Heart className="w-4 h-4 text-[#F4F416] fill-[#F4F416]" /> — {t.rights}
            </p>
            <motion.button onClick={scrollToTop} className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#F4F416] transition-colors" whileHover={{ y: -2 }}>
              {t.backToTop}<ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
