// import { motion } from 'framer-motion';
// import { useInView } from 'framer-motion';
// import { useRef, useState } from 'react';
// import { useLanguage } from '../contexts/LanguageContext';
// import { 
//   CreditCard, Palette, FileText, Image, Layout, Store, Car, Share2, Monitor,
//   Sticker, Signpost, ScrollText, Tag, Building2, Menu, Ticket, Percent, Megaphone, Video, ShoppingBag, Printer
// } from 'lucide-react';

// interface Service {
//   icon: React.ElementType;
//   title: string;
//   titleEn: string;
//   titleAr: string;
//   desc: string;
//   descEn: string;
//   descAr: string;
// }

// const services: Service[] = [
//   {
//     icon: Printer, title: "Impression Numérique", titleEn: "Digital Printing", titleAr: "الطباعة الرقمية",
//     desc: "Impression haute qualité sur tous supports papier et synthétique", descEn: "High quality printing on all paper and synthetic media", descAr: "طباعة عالية الجودة على جميع الأوراق الورقية والاصطناعية"
//   },
//   {
//     icon: CreditCard, title: "Cartes Visite", titleEn: "Business Cards", titleAr: "بطاقات أعمال",
//     desc: "Premium avec finitions luxe (dorure, relief, vernis)", descEn: "Premium with luxury finishes (gold foil, embossing, spot UV)", descAr: "فاخرة بتشطيبات فاخرة (طلاء، بروز، فارنيش)"
//   },
//   {
//     icon: Palette, title: "Création Logo", titleEn: "Logo Design", titleAr: "تصميم شعار",
//     desc: "Logo unique et professionnel sur mesure", descEn: "Unique and professional custom logo", descAr: "شعار فريد واحترافي مخصص"
//   },
//   {
//     icon: ScrollText, title: "Identité Visuelle", titleEn: "Visual Identity", titleAr: "الهوية البصرية",
//     desc: "Charte graphique complète avec guidelines", descEn: "Complete brand guidelines and identity system", descAr: "دليل هوية بصرية كامل مع الإرشادات"
//   },
//   {
//     icon: FileText, title: "Flyers", titleEn: "Flyers", titleAr: "نشرات",
//     desc: "Flyers publicitaires A5, A6, DL haute qualité", descEn: "High quality A5, A6, DL promotional flyers", descAr: "نشرات إعلانية A5، A6، DL جودة عالية"
//   },
//   {
//     icon: Layout, title: "Dépliants", titleEn: "Brochures", titleAr: "كتيبات",
//     desc: "Brochures pliées 2, 3 volets", descEn: "2 or 3 fold brochures", descAr: "كتيبات مطوية عدد 2 أو 3"
//   },
//   {
//     icon: Image, title: "Affiches", titleEn: "Posters", titleAr: "ملصقات",
//     desc: "Affiches A3, A2, A1, A0 impression HD", descEn: "A3, A2, A1, A0 HD printing posters", descAr: "ملصقات A3، A2، A1، A0 طباعة عالية"
//   },
//   {
//     icon: ShoppingBag, title: "Bannières", titleEn: "Banners", titleAr: "بانرات",
//     desc: "Bannières en tous formats", descEn: "Banners in all formats", descAr: "بانرات بجميع الأحجام"
//   },
//   {
//     icon: ScrollText, title: "Bâches", titleEn: "Banners Outdoor", titleAr: "بانرات خارجية",
//     desc: "Bâches PVC, mesh pour extérieur", descEn: "PVC banners, mesh for outdoor", descAr: "بانرات PVC، mesh للاستخدام الخارجي"
//   },
//   {
//     icon: Sticker, title: "Vinyles", titleEn: "Vinyl", titleAr: "فينيل",
//     desc: "Vinyles adhésifs de qualité premium", descEn: "Premium quality adhesive vinyl", descAr: "فينيل لاصق جودة فاخرة"
//   },
//   {
//     icon: Store, title: "One Way", titleEn: "One Way Vision", titleAr: "ون واي",
//     desc: "One way pour vitrines et véhicules", descEn: "One way for windows and vehicles", descAr: "فينيل ون واي للواجهات والسيارات"
//   },
//   {
//     icon: Tag, title: "Stickers", titleEn: "Stickers", titleAr: "ملصقات",
//     desc: "Stickers découpés, autocollants vinyl", descEn: "Cut stickers, vinyl decals", descAr: "ملصقات مقطوعة، استيكرات فينيل"
//   },
//   {
//     icon: Signpost, title: "Panneaux", titleEn: "Sign Boards", titleAr: "لوحات",
//     desc: "Panneaux alvéolaire, PVC expansé", descEn: "Aluminum composite, PVC boards", descAr: "لوحات ألمونيوم، PVC"
//   },
//   {
//     icon: ScrollText, title: "Roll-up", titleEn: "Roll-up Stands", titleAr: "رول أب",
//     desc: "Roll-up portable 85x200cm, 100x200cm", descEn: "Portable roll-up 85x200cm, 100x200cm", descAr: "ستاندات رول أب متنقلة 85x200، 100x200"
//   },
//   {
//     icon: Building2, title: "Kakemonos", titleEn: "X-Banners", titleAr: "كاكيمونو",
//     desc: "Kakemono X-banner, L-banner", descEn: "X-banner, L-banner displays", descAr: "كاكيمونو X-banner، L-banner"
//   },
//   {
//     icon: Menu, title: "Menus", titleEn: "Restaurant Menus", titleAr: "قوائم",
//     desc: "Menus plastifiés, en cuir, design moderne", descEn: "Laminated, leather, modern design menus", descAr: "قوائم مجعدلة، جلدية، تصميم عصري"
//   },
//   {
//     icon: Tag, title: "Étiquettes", titleEn: "Price Tags", titleAr: "أسعار",
//     desc: "Étiquettes adhésives pour produits", descEn: "Adhesive labels for products", descAr: "ملصقات لاصقة للمنتجات"
//   },
//   {
//     icon: Percent, title: "Promotions", titleEn: "Promos", titleAr: "عروض",
//     desc: "Soldes, promotions, offres spéciales", descEn: "Sales, promotions, special offers", descAr: "تخفيضات، عروض، تنزيلات خاصة"
//   },
//   {
//     icon: Store, title: "Enseignes", titleEn: "Store Signs", titleAr: "لوحات متاجر",
//     desc: "Enseignes lumineuses LED, néon, caisson", descEn: "LED signs, neon, light boxes", descAr: "لوحات مضئية LED، نيون، صندوق"
//   },
//   {
//     icon: Signpost, title: "Signalétique int.", titleEn: "Indoor Signs", titleAr: "لافتات داخلية",
//     desc: "Panneaux directionnels, plaques de porte", descEn: "Directional signs, door plates", descAr: "لوحات إرشادية، لواح الأبواب"
//   },
//   {
//     icon: Building2, title: "Signalétique ext.", titleEn: "Outdoor Signs", titleAr: "لافتات خارجية",
//     desc: "Totems, drapeaux, pylônes", descEn: "Totems, flags, pylons", descAr: "توتمات، أعلام، أبراج"
//   },
//   {
//     icon: Share2, title: "Posts Social", titleEn: "Social Posts", titleAr: "منشورات",
//     desc: "Posts Instagram, Facebook professionnels", descEn: "Professional Instagram, Facebook posts", descAr: "منشورات احترافية للإنستغرام والفيسبوك"
//   },
//   {
//     icon: Image, title: "Stories", titleEn: "Stories", titleAr: "ستوريات",
//     desc: "Stories animées et statiques", descEn: "Animated and static stories", descAr: "ستوريات متحركة وثابتة"
//   },
//   {
//     icon: Monitor, title: "Web Banners", titleEn: "Web Banners", titleAr: "بانرات ويب",
//     desc: "Bannières site web, Google Ads", descEn: "Website banners, Google Ads", descAr: "بانرات مواقع، إعلانات جوجل"
//   },
//   {
//     icon: Video, title: "YouTube Thumbs", titleEn: "YouTube Thumbnails", titleAr: "صور يوتيوب",
//     desc: "Thumbnails accrocheurs pour vidéos", descEn: "Eye-catching video thumbnails", descAr: "صور جاذبة للفيديوهات"
//   },
//   {
//     icon: Megaphone, title: "Ads Design", titleEn: "Ad Designs", titleAr: "تصميم إعلانات",
//     desc: "Campagnes ads Facebook, Instagram, Google", descEn: "Facebook, Instagram, Google ad campaigns", descAr: "حملات إعلانية فيسبوك، إنستغرام، جوجل"
//   },
//   {
//     icon: Car, title: "Covering Auto", titleEn: "Car Wrapping", titleAr: "تغليف سيارات",
//     desc: "Covering total ou partiel, lettrage", descEn: "Full or partial wrapping, lettering", descAr: "تغليف كامل أو جزئي، كتابة على المركبات"
//   },
//   {
//     icon: Store, title: "Vitrines", titleEn: "Window Display", titleAr: "تغليف واجهات",
//     desc: "Décoration vitrine magasin, covering", descEn: "Store window decoration, wrapping", descAr: "تزيين واجهات المتاجر، تغليف"
//   }
// ];

// export function Services() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: '-100px' });
//   const { lang, dir } = useLanguage();
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   const content = {
//     fr: { badge: "Nos Prestations", title: "Services de", titleHighlight: "Design & Print", subtitle: "27 services professionnels incluant impression numérique haute qualité", cta: "Demander un Devis" },
//     en: { badge: "Our Services", title: "Design &", titleHighlight: "Printing Services", subtitle: "27 professional services including high-quality digital printing", cta: "Get a Quote" },
//     ar: { badge: "خدماتنا", title: "خدمات", titleHighlight: "التصميم والطباعة", subtitle: "27 خدمة احترافية بما في ذلك الطباعة الرقمية العالية", cta: "اطلب عرض سعر" }
//   };

//   const t = content[lang];

//   const getTitle = (s: Service) => lang === 'fr' ? s.title : lang === 'en' ? s.titleEn : s.titleAr;
//   const getDesc = (s: Service) => lang === 'fr' ? s.desc : lang === 'en' ? s.descEn : s.descAr;

//   return (
//     <section id="services" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
//       <div className="absolute top-0 left-0 w-full h-full">
//         <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#F4F416]/5 rounded-full blur-[100px]" />
//         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F4F416]/3 rounded-full blur-[80px]" />
//       </div>

//       <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
//         <div className="max-w-7xl mx-auto">
//           <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
//             <motion.span className="inline-block px-4 py-1.5 rounded-full border border-[#F4F416]/40 text-[#F4F416] text-sm font-medium tracking-wide mb-6">
//               {t.badge}
//             </motion.span>
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t.title} <span className="text-[#F4F416]">{t.titleHighlight}</span></h2>
//             <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
//           </motion.div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//             {services.map((service, index) => (
//               <motion.div
//                 key={service.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: 0.02 * index, duration: 0.4 }}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//                 className="group relative"
//               >
//                 <div className={`relative p-5 rounded-2xl h-full bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-[#F4F416]/50 transition-all duration-500 ${hoveredIndex === index ? 'scale-[1.02] shadow-2xl shadow-[#F4F416]/10' : ''}`}>
//                   <div className="w-12 h-12 rounded-xl bg-[#F4F416]/10 flex items-center justify-center mb-4 group-hover:bg-[#F4F416]/20 group-hover:scale-110 transition-all duration-300">
//                     <service.icon className="w-6 h-6 text-[#F4F416]" />
//                   </div>
//                   <h3 className="font-bold text-white text-sm mb-2 group-hover:text-[#F4F416] transition-colors duration-300 leading-tight">{getTitle(service)}</h3>
//                   <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{getDesc(service)}</p>
//                   <div className={`absolute bottom-0 left-0 h-0.5 bg-[#F4F416] transition-all duration-300 rounded-full ${hoveredIndex === index ? 'w-full' : 'w-0'}`} />
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="text-center mt-16">
//             <motion.a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 bg-[#F4F416] text-black font-bold rounded-full hover:bg-white transition-all duration-300 shadow-lg shadow-[#F4F416]/25 hover:shadow-xl hover:shadow-white/20" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
//               {t.cta}
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
//             </motion.a>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }



import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

import {
  CreditCard,
  Palette,
  FileText,
  Image,
  Layout,
  Store,
  Car,
  Share2,
  Monitor,
  Sticker,
  Signpost,
  ScrollText,
  Tag,
  Building2,
  Menu,
  Percent,
  Megaphone,
  Video,
  ShoppingBag,
  Printer,
} from "lucide-react";
import api from '../api/axios';
const iconMap = {
  CreditCard,
  Palette,
  FileText,
  Image,
  Layout,
  Store,
  Car,
  Share2,
  Monitor,
  Sticker,
  Signpost,
  ScrollText,
  Tag,
  Building2,
  Menu,
  Percent,
  Megaphone,
  Video,
  ShoppingBag,
  Printer,
};

export function Services() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const { lang } = useLanguage();

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services')
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const content = {
    fr: {
      badge: "Nos Prestations",
      title: "Services de",
      titleHighlight: "Design & Print",
      subtitle:
        "Services professionnels incluant impression numérique haute qualité",
      cta: "Demander un Devis",
    },

    en: {
      badge: "Our Services",
      title: "Design &",
      titleHighlight: "Printing Services",
      subtitle:
        "Professional services including high-quality digital printing",
      cta: "Get a Quote",
    },

    ar: {
      badge: "خدماتنا",
      title: "خدمات",
      titleHighlight: "التصميم والطباعة",
      subtitle:
        "خدمات احترافية تشمل الطباعة الرقمية عالية الجودة",
      cta: "اطلب عرض سعر",
    },
  };

  const t = content[lang];

  const getTitle = (service) => {
    if (lang === "ar") {
      return service.nameAr || service.name;
    }

    return service.name;
  };

  const getDesc = (service) => {
    if (lang === "ar") {
      return service.descriptionAr || service.description;
    }

    return service.description;
  };

  return (
    <section
      id="services"
      className="py-24 bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#F4F416]/5 rounded-full blur-[100px]" />

        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F4F416]/3 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full border border-[#F4F416]/40 text-[#F4F416] text-sm font-medium tracking-wide mb-6"
            >
              {t.badge}
            </motion.span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              {t.title}{" "}
              <span className="text-[#F4F416]">
                {t.titleHighlight}
              </span>
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>

          {/* SERVICES */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

            {loading
              ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] animate-pulse"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 mb-4" />

                  <div className="h-4 bg-white/10 rounded mb-2" />

                  <div className="h-3 bg-white/5 rounded w-3/4" />
                </div>
              ))
              : services.map((service, index) => {
                const Icon =
                  iconMap[service.icon] || Printer;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      isInView
                        ? { opacity: 1, y: 0 }
                        : {}
                    }
                    transition={{
                      delay: index * 0.05,
                      duration: 0.4,
                    }}
                    onMouseEnter={() =>
                      setHoveredIndex(index)
                    }
                    onMouseLeave={() =>
                      setHoveredIndex(null)
                    }
                    className="group relative"
                  >
                    <div
                      className={`relative p-5 rounded-2xl h-full bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-[#F4F416]/50 transition-all duration-500 ${hoveredIndex === index
                          ? "scale-[1.02] shadow-2xl shadow-[#F4F416]/10"
                          : ""
                        }`}
                    >
                      {/* ICON */}
                      <div className="w-12 h-12 rounded-xl bg-[#F4F416]/10 flex items-center justify-center mb-4 group-hover:bg-[#F4F416]/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-6 h-6 text-[#F4F416]" />
                      </div>

                      {/* TITLE */}
                      <h3 className="font-bold text-white text-sm mb-2 group-hover:text-[#F4F416] transition-colors duration-300 leading-tight">
                        {getTitle(service)}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {getDesc(service)}
                      </p>

                      {/* LINE */}
                      <div
                        className={`absolute bottom-0 left-0 h-0.5 bg-[#F4F416] transition-all duration-300 rounded-full ${hoveredIndex === index
                            ? "w-full"
                            : "w-0"
                          }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
          </div>

          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#F4F416] text-black font-bold rounded-full hover:bg-white transition-all duration-300 shadow-lg shadow-[#F4F416]/25"
              whileHover={{
                scale: 1.03,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              {t.cta}

              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}