import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown, Printer, CreditCard, Palette, FileText, Image, Store, Car, Share2, Signpost } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  fr: { services: 'Services', work: 'Portfolio', about: 'À Propos', contact: 'Contact', cta: 'Devis Gratuit' },
  en: { services: 'Services', work: 'Portfolio', about: 'About', contact: 'Contact', cta: 'Free Quote' },
  ar: { services: 'الخدمات', work: 'أعمالنا', about: 'من نحن', contact: 'تواصل', cta: 'عرض مجاني' }
};

const languageNames = {
  fr: 'FR',
  en: 'EN',
  ar: 'AR'
};

// Services for dropdown
const servicesMenu = {
  fr: [
    { icon: Printer, label: 'Impression Numérique', href: '#services' },
    { icon: CreditCard, label: 'Cartes Visite', href: '#services' },
    { icon: Palette, label: 'Création Logo', href: '#services' },
    { icon: FileText, label: 'Flyers & Dépliants', href: '#services' },
    { icon: Image, label: 'Affiches & Bannières', href: '#services' },
    { icon: Store, label: 'Signalétique', href: '#services' },
    { icon: Car, label: 'Habillage Véhicule', href: '#services' },
    { icon: Share2, label: 'Réseaux Sociaux', href: '#services' },
  ],
  en: [
    { icon: Printer, label: 'Digital Printing', href: '#services' },
    { icon: CreditCard, label: 'Business Cards', href: '#services' },
    { icon: Palette, label: 'Logo Design', href: '#services' },
    { icon: FileText, label: 'Flyers & Brochures', href: '#services' },
    { icon: Image, label: 'Posters & Banners', href: '#services' },
    { icon: Store, label: 'Signage', href: '#services' },
    { icon: Car, label: 'Vehicle Wrap', href: '#services' },
    { icon: Share2, label: 'Social Media', href: '#services' },
  ],
  ar: [
    { icon: Printer, label: 'الطباعة الرقمية', href: '#services' },
    { icon: CreditCard, label: 'بطاقات أعمال', href: '#services' },
    { icon: Palette, label: 'تصميم شعار', href: '#services' },
    { icon: FileText, label: 'نشرات وكتيبات', href: '#services' },
    { icon: Image, label: 'ملصقات وبانرات', href: '#services' },
    { icon: Store, label: 'لافتات وإشارات', href: '#services' },
    { icon: Car, label: 'تغليف سيارات', href: '#services' },
    { icon: Share2, label: 'تواصل اجتماعي', href: '#services' },
  ]
};

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const { lang, setLang, dir } = useLanguage();
  const servicesRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];
  const isRTL = dir === 'rtl';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setShowServicesDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setShowServicesDropdown(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLangChange = (newLang: 'fr' | 'en' | 'ar') => {
    setLang(newLang);
    setShowLangDropdown(false);
  };

  const navItems = [
    { key: 'work', href: '#work' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' }
  ];

  const currentServices = servicesMenu[lang];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-20">
            <Logo size="sm" />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {/* Services Dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors group py-2"
                >
                  {t.services}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showServicesDropdown ? 'rotate-180' : ''}`} />
                  <span className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-0 h-0.5 bg-[#F4F416] transition-all duration-300 group-hover:w-full`} />
                </button>

                {/* Services Dropdown Menu */}
                <AnimatePresence>
                  {showServicesDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} w-72 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl`}
                    >
                      <div className="p-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                          {lang === 'fr' ? 'Nos Services' : lang === 'en' ? 'Our Services' : 'خدماتنا'}
                        </h3>
                        <div className="grid grid-cols-1 gap-1">
                          {currentServices.map((service, index) => (
                            <motion.button
                              key={index}
                              onClick={() => handleNavClick(service.href)}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#F4F416]/10 flex items-center justify-center group-hover:bg-[#F4F416]/20 transition-colors">
                                <service.icon className="w-4 h-4 text-[#F4F416]" />
                              </div>
                              <span>{service.label}</span>
                            </motion.button>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <button
                            onClick={() => handleNavClick('#services')}
                            className="w-full py-2 text-center text-sm text-[#F4F416] hover:text-white transition-colors"
                          >
                            {lang === 'fr' ? 'Voir tous les services →' : lang === 'en' ? 'View all services →' : 'عرض الخدمات ←'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navItems.map((item) => (
                <motion.button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="relative text-sm font-medium text-gray-400 hover:text-white transition-colors group py-2"
                >
                  {t[item.key as keyof typeof t]}
                  <span className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-0 h-0.5 bg-[#F4F416] transition-all duration-300 group-hover:w-full`} />
                </motion.button>
              ))}
              
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  <Globe className="w-4 h-4 text-[#F4F416]" />
                  <span className="text-sm font-semibold text-white">{languageNames[lang]}</span>
                  <svg className={`w-3 h-3 text-gray-400 transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {showLangDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} w-40 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-xl`}
                    >
                      {(['fr', 'en', 'ar'] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => handleLangChange(l)}
                          className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between hover:bg-white/5 ${
                            lang === l ? 'text-[#F4F416] bg-[#F4F416]/10' : 'text-white'
                          }`}
                        >
                          <span>{languageNames[l]}</span>
                          {lang === l && (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                onClick={() => handleNavClick('#contact')}
                className="px-5 py-2.5 bg-[#F4F416] text-black font-semibold text-sm rounded-full hover:bg-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.cta}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <div className="flex gap-1 bg-white/5 p-1 rounded-full border border-white/10">
                {(['fr', 'en', 'ar'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      lang === l ? 'bg-[#F4F416] text-black' : 'text-white'
                    }`}
                  >
                    {languageNames[l]}
                  </button>
                ))}
              </div>
              <button
                className="text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 100 : -100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-24"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {/* Mobile Services */}
              <div className="w-full px-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">
                  {t.services}
                </h3>
                <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                  {currentServices.slice(0, 6).map((service, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavClick(service.href)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 text-left text-sm text-gray-300 hover:bg-white/10 transition-colors"
                    >
                      <service.icon className="w-4 h-4 text-[#F4F416]" />
                      <span className="truncate">{service.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="w-full h-px bg-white/10 max-w-xs" />
              
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="text-2xl font-bold text-white hover:text-[#F4F416] transition-colors"
                >
                  {t[item.key as keyof typeof t]}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#contact')}
                className="mt-4 px-8 py-3 bg-[#F4F416] text-black font-bold rounded-full"
              >
                {t.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close dropdowns */}
      {(showLangDropdown || showServicesDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowLangDropdown(false);
            setShowServicesDropdown(false);
          }}
        />
      )}
    </>
  );
}
