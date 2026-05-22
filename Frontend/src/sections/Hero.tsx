import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, MapPin, ChevronRight, Printer, Palette, FileText, Image as ImageIcon, Store } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const floatingIcons = [
  { Icon: Printer, delay: 0, x: -20, y: -30 },
  { Icon: Palette, delay: 0.5, x: 20, y: -20 },
  { Icon: FileText, delay: 1, x: -15, y: 30 },
  { Icon: ImageIcon, delay: 1.5, x: 25, y: 20 },
  { Icon: Store, delay: 2, x: 0, y: -40 },
];

export function Hero() {
  const { lang, dir } = useLanguage();
  const isRTL = dir === 'rtl';
  
  const handleScrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const content = {
    fr: {
      badge: "Agence de Design & Impression Numérique à Riyad",
      title1: "DESIGN",
      title2: "SANS",
      title3: "LIMITES",
      description: "Création logo, impression numérique, carte visite, signalétique, habillage voiture à Riyad. 27 services de design & imprimerie professionnels. Devis gratuit 24h !",
      cta1: "Voir Nos Services",
      cta2: "Devis Gratuit",
      location: "casablanca, hay mohammadi",
      scroll: "Explorer",
      stats: [
        { value: "27+", label: "Services" },
        { value: "500+", label: "Projets" },
        { value: "300+", label: "Clients" },
      ]
    },
    en: {
      badge: "Graphic Design & Digital Printing Agency in Riyadh",
      title1: "DESIGN",
      title2: "WITHOUT",
      title3: "LIMITS",
      description: "Logo creation, digital printing, business cards, signage, vehicle wrapping in Riyadh. 27 professional design & printing services. Free quote in 24h!",
      cta1: "Our Services",
      cta2: "Free Quote",
      location: "Riyadh, Saudi Arabia",
      scroll: "Explore",
      stats: [
        { value: "27+", label: "Services" },
        { value: "500+", label: "Projects" },
        { value: "300+", label: "Clients" },
      ]
    },
    ar: {
      badge: "وكالة تصميم وطباعة رقمية في الدار البيضاء",
      title1: "تصميم",
      title2: "بدون",
      title3: "حدود",
      description: "تصميم شعار، طباعة رقمية، بطاقات أعمال، لافتات، تغليف سيارات في الرياض. 27 خدمة احترافية. عرض سعر مجاني خلال 24 ساعة!",
      cta1: "استكشف خدماتنا",
      cta2: "عرض سعر مجاني",
      location: "االحي المحمدي، الدار البيضاء",
      scroll: "استكشف",
      stats: [
        { value: "27+", label: "خدمة" },
        { value: "500+", label: "مشروع" },
        { value: "300+", label: "عميل" },
      ]
    }
  };

  const t = content[lang];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ 
            backgroundImage: 'url(https://res.cloudinary.com/dfmcfmvja/image/upload/v1777898646/ChatGPT_Image_4_mai_2026_12_46_37_1_m70oz0.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,244,22,0.1),transparent_70%)]" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute top-1/2 left-1/2"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              x: [x * 10, x * 15, x * 10],
              y: [y * 10, y * 15, y * 10],
            }}
            transition={{ 
              duration: 5,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-[#F4F416]/60" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#F4F416]/30 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-[#F4F416]" />
            <span className="text-sm font-medium text-[#F4F416]">{t.badge}</span>
          </motion.div>

          {/* Title */}
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-white leading-[0.9]"
            >
              {t.title1}
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-[#F4F416] leading-[0.9]"
            >
              {t.title2}
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9]"
              style={{ WebkitTextStroke: '2px rgba(244,244,22,0.9)', color: 'transparent' }}
            >
              {t.title3}
            </motion.h1>
          </div>

          {/* Location */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.55 }}
            className="flex items-center justify-center gap-2 text-[rgba(255,255,255,.48)] mb-6 text-sm"
          >
            <MapPin className="w-4 h-4 text-[#F4F416]" />
            <span>{t.location}</span>
          </motion.div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6 }}
            className="text-[rgba(255,255,255,.48)] text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t.description}
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
          >
            <motion.a 
              href="#services" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F4F416] text-black font-bold rounded-full hover:bg-white transition-all duration-300 shadow-lg shadow-[#F4F416]/25"
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
            >
              {t.cta1}
              <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            </motion.a>
            <motion.a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:border-[#F4F416]/50 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
            >
              {t.cta2}
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-8 sm:gap-12"
          >
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-[#F4F416]">{stat.value}</p>
                <p className="text-sm text-[rgba(255,255,255,.48)] mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button 
        onClick={handleScrollToServices} 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-[#F4F416] transition-colors"
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 1 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">{t.scroll}</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-2.5 bg-current rounded-full" />
        </motion.div>
      </motion.button>
    </section>
  );
}
