// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'framer-motion';
// import { useRef, useState } from 'react';
// import { useLanguage } from '../contexts/LanguageContext';
// import { X, ZoomIn, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

// const projects = {
//   fr: [
//     { id: 1, title: 'MENU', category: 'CAFÉ', image: 'https://res.cloudinary.com/dfmcfmvja/image/upload/v1777972691/IMG-20260310-WA0015.jpg_nqjnje.jpg' },
//     { id: 2, title: 'Nour Café', category: 'Enseigne Lumineuse', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80' },
//     { id: 3, title: 'Speed Delivery', category: 'Habillage Flotte', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80' },
//     { id: 4, title: 'Luxe Motors', category: 'Cartes Premium', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80' },
//     { id: 5, title: 'TechVision', category: 'Campagne Flyers', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80' },
//     { id: 6, title: 'Fitness Pro', category: 'Réseaux Sociaux', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' },
//   ],
//   en: [
//     { id: 1, title: 'Al-Rashid Trading', category: 'Logo & Stationery', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80' },
//     { id: 2, title: 'Nour Café', category: 'Light Sign', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80' },
//     { id: 3, title: 'Speed Delivery', category: 'Fleet Wrapping', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80' },
//     { id: 4, title: 'Luxe Motors', category: 'Premium Cards', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80' },
//     { id: 5, title: 'TechVision', category: 'Flyer Campaign', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80' },
//     { id: 6, title: 'Fitness Pro', category: 'Social Media', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' },
//   ],
//   ar: [
//     { id: 1, title: 'شركة الراشد', category: 'شعار وأوراق', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80' },
//     { id: 2, title: 'مقهى النور', category: 'لوحة مضئية', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80' },
//     { id: 3, title: 'سبيد دليفري', category: 'تغليف أسطول', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80' },
//     { id: 4, title: 'لوكس موتورز', category: 'بطاقات فاخرة', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80' },
//     { id: 5, title: 'تيك فيجن', category: 'حملة منشورات', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80' },
//     { id: 6, title: 'فتنس برو', category: 'تواصل اجتماعي', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' },
//   ]
// };

// export function Work() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: '-100px' });
//   const { lang, dir } = useLanguage();
//   const [selectedImage, setSelectedImage] = useState<number | null>(null);

//   const content = {
//     fr: { 
//       badge: 'Portfolio', 
//       title: 'Nos', 
//       titleHighlight: 'Réalisations',
//       subtitle: 'Découvrez nos projets de design graphique, signalétique et communication visuelle',
//       viewProject: 'Voir le projet',
//       allProjects: 'Tous nos projets'
//     },
//     en: { 
//       badge: 'Portfolio', 
//       title: 'Our', 
//       titleHighlight: 'Work',
//       subtitle: 'Explore our graphic design, signage and visual communication projects',
//       viewProject: 'View project',
//       allProjects: 'All projects'
//     },
//     ar: { 
//       badge: 'أعمالنا', 
//       title: 'مشاريعنا', 
//       titleHighlight: 'المميزة',
//       subtitle: 'اكتشف مشاريع التصميم واللافتات والتواصل البصري',
//       viewProject: 'عرض المشروع',
//       allProjects: 'جميع المشاريع'
//     }
//   };

//   const t = content[lang];
//   const currentProjects = projects[lang];

//   const openLightbox = (index: number) => setSelectedImage(index);
//   const closeLightbox = () => setSelectedImage(null);
//   const nextImage = () => setSelectedImage(prev => prev !== null ? (prev + 1) % currentProjects.length : 0);
//   const prevImage = () => setSelectedImage(prev => prev !== null ? (prev - 1 + currentProjects.length) % currentProjects.length : 0);

//   return (
//     <section id="work" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
//       {/* Background Glow */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F4F416]/5 rounded-full blur-[150px] pointer-events-none" />
      
//       <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <motion.div
//             ref={ref}
//             initial={{ opacity: 0, y: 30 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <motion.span className="inline-block px-4 py-1.5 rounded-full border border-[#F4F416]/40 text-[#F4F416] text-sm font-medium mb-6">
//               {t.badge}
//             </motion.span>
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
//               {t.title} <span className="text-[#F4F416]">{t.titleHighlight}</span>
//             </h2>
//             <p className="text-[rgba(255,255,255,.48)] text-lg max-w-2xl mx-auto">{t.subtitle}</p>
//           </motion.div>

//           {/* Uniform Cards Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {currentProjects.map((project, index) => (
//               <motion.div
//                 key={project.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//                 className="group cursor-pointer"
//                 onClick={() => openLightbox(index)}
//               >
//                 {/* Card Container - Same width and height for all */}
//                 <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#F4F416]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#F4F416]/10">
//                   {/* Image */}
//                   <img
//                     src={project.image}
//                     alt={project.title}
//                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
                  
//                   {/* Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />
                  
//                   {/* Content */}
//                   <div className="absolute inset-0 p-6 flex flex-col justify-end">
//                     <motion.span 
//                       className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold bg-[#F4F416] text-black mb-3"
//                       initial={{ opacity: 0, y: 10 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.2 }}
//                     >
//                       {project.category}
//                     </motion.span>
//                     <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F4F416] transition-colors">
//                       {project.title}
//                     </h3>
                    
//                     {/* View Button */}
//                     <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
//                       <span className="text-sm text-white/80">{t.viewProject}</span>
//                       <div className="w-8 h-8 rounded-full bg-[#F4F416] flex items-center justify-center">
//                         <ZoomIn className="w-4 h-4 text-black" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Border Effect */}
//                   <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#F4F416]/50 transition-colors duration-500 pointer-events-none" />
                  
//                   {/* Shine Effect */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
//                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* View All Button */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={isInView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.8 }}
//             className="text-center mt-12"
//           >
//             <button className="inline-flex items-center gap-2 px-8 py-4 border border-[#F4F416]/50 text-[#F4F416] font-semibold rounded-full hover:bg-[#F4F416] hover:text-black transition-all duration-300 group">
//               {t.allProjects}
//               <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Lightbox */}
//       <AnimatePresence>
//         {selectedImage !== null && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
//             onClick={closeLightbox}
//           >
//             {/* Close Button */}
//             <button
//               onClick={closeLightbox}
//               className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F4F416] hover:text-black transition-all z-50"
//             >
//               <X className="w-6 h-6" />
//             </button>

//             {/* Navigation */}
//             <button
//               onClick={(e) => { e.stopPropagation(); prevImage(); }}
//               className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F4F416] hover:text-black transition-all"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>
//             <button
//               onClick={(e) => { e.stopPropagation(); nextImage(); }}
//               className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F4F416] hover:text-black transition-all"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>

//             {/* Image Container - Original Size */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="relative mx-6"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={currentProjects[selectedImage].image}
//                 alt={currentProjects[selectedImage].title}
//                 className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
//                 style={{ imageRendering: 'auto' }}
//               />
              
//               {/* Image Info */}
//               <div className="absolute -bottom-16 left-0 right-0 text-center">
//                 <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#F4F416] text-black mb-2">
//                   {currentProjects[selectedImage].category}
//                 </span>
//                 <h3 className="text-xl font-bold text-white">
//                   {currentProjects[selectedImage].title}
//                 </h3>
//               </div>
//             </motion.div>

//             {/* Thumbnails */}
//             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
//               {currentProjects.map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); }}
//                   className={`w-2 h-2 rounded-full transition-all ${
//                     idx === selectedImage ? 'bg-[#F4F416] w-8' : 'bg-white/30 hover:bg-white/50'
//                   }`}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }



import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, ZoomIn, ChevronLeft, ChevronRight, ExternalLink, ImageIcon } from 'lucide-react';
import api from '../api/axios';

export function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { lang, dir } = useLanguage();

  // ── data ──────────────────────────────────────────────────────────────────
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/portfolios')
      .then((res) => setPortfolios(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ── lightbox state ────────────────────────────────────────────────────────
  // selectedPortfolio = the portfolio object whose gallery we're viewing
  // lightboxIndex     = current image index inside that gallery
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (portfolio) => {
    // gallery = all images: cover first (if exists), then gallery array
    setSelectedPortfolio(portfolio);
    setLightboxIndex(0);
  };

  const closeLightbox = () => {
    setSelectedPortfolio(null);
    setLightboxIndex(0);
  };

  const lightboxImages = selectedPortfolio
    ? [
        ...(selectedPortfolio.image ? [selectedPortfolio.image] : []),
        ...(selectedPortfolio.gallery || []),
      ]
    : [];

  const nextImage = () =>
    setLightboxIndex((i) => (i + 1) % lightboxImages.length);
  const prevImage = () =>
    setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);

  // ── i18n ──────────────────────────────────────────────────────────────────
  const content = {
    fr: {
      badge: 'Portfolio',
      title: 'Nos',
      titleHighlight: 'Réalisations',
      subtitle: 'Découvrez nos projets de design graphique, signalétique et communication visuelle',
      viewProject: 'Voir le projet',
      allProjects: 'Tous nos projets',
    },
    en: {
      badge: 'Portfolio',
      title: 'Our',
      titleHighlight: 'Work',
      subtitle: 'Explore our graphic design, signage and visual communication projects',
      viewProject: 'View project',
      allProjects: 'All projects',
    },
    ar: {
      badge: 'أعمالنا',
      title: 'مشاريعنا',
      titleHighlight: 'المميزة',
      subtitle: 'اكتشف مشاريع التصميم واللافتات والتواصل البصري',
      viewProject: 'عرض المشروع',
      allProjects: 'جميع المشاريع',
    },
  };

  const t = content[lang] ?? content.fr;

  // ── helpers ───────────────────────────────────────────────────────────────
  const getName = (p) =>
    lang === 'ar' ? p.nameAr || p.name : lang === 'fr' ? p.name : p.name;

  const getCategory = (p) =>
    lang === 'ar' ? p.categoryAr || p.category : p.category;

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <section id="work" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F4F416]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span className="inline-block px-4 py-1.5 rounded-full border border-[#F4F416]/40 text-[#F4F416] text-sm font-medium mb-6">
              {t.badge}
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.title} <span className="text-[#F4F416]">{t.titleHighlight}</span>
            </h2>
            <p className="text-[rgba(255,255,255,.48)] text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-2xl bg-white/5 animate-pulse border border-white/10"
                />
              ))}
            </div>
          )}

          {/* Grid */}
          {!loading && portfolios.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(project)}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#F4F416]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#F4F416]/10">

                    {/* Image or fallback */}
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={getName(project)}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-white/10" />
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      {getCategory(project) && (
                        <motion.span
                          className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold bg-[#F4F416] text-black mb-3"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {getCategory(project)}
                        </motion.span>
                      )}

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F4F416] transition-colors">
                        {getName(project)}
                      </h3>

                      {/* View button */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-sm text-white/80">{t.viewProject}</span>
                        <div className="w-8 h-8 rounded-full bg-[#F4F416] flex items-center justify-center">
                          <ZoomIn className="w-4 h-4 text-black" />
                        </div>
                      </div>

                      {/* gallery count badge */}
                      {project.gallery?.length > 0 && (
                        <span className="absolute top-4 right-4 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-[10px] font-semibold text-white/70">
                          +{project.gallery.length}
                        </span>
                      )}
                    </div>

                    {/* Hover border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#F4F416]/50 transition-colors duration-500 pointer-events-none" />

                    {/* Shine */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && portfolios.length === 0 && (
            <div className="text-center py-20 text-white/20 text-sm">
              No projects yet.
            </div>
          )}

          {/* View All */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <button className="inline-flex items-center gap-2 px-8 py-4 border border-[#F4F416]/50 text-[#F4F416] font-semibold rounded-full hover:bg-[#F4F416] hover:text-black transition-all duration-300 group">
              {t.allProjects}
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {selectedPortfolio !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F4F416] hover:text-black transition-all z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            {lightboxImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F4F416] hover:text-black transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next */}
            {lightboxImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F4F416] hover:text-black transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImages[lightboxIndex]}
                alt={getName(selectedPortfolio)}
                className="max-w-[90vw] max-h-[75vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
              />

              {/* Info */}
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                {getCategory(selectedPortfolio) && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#F4F416] text-black mb-2">
                    {getCategory(selectedPortfolio)}
                  </span>
                )}
                <h3 className="text-xl font-bold text-white">
                  {getName(selectedPortfolio)}
                </h3>
              </div>
            </motion.div>

            {/* Thumbnail dots / strip */}
            {lightboxImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 items-center">
                {lightboxImages.length <= 8
                  ? /* thumbnail strip for small galleries */
                    lightboxImages.map((src, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                        className={`rounded-lg overflow-hidden border-2 transition-all ${
                          idx === lightboxIndex
                            ? 'border-[#F4F416] w-12 h-12 scale-110'
                            : 'border-white/20 w-9 h-9 opacity-50 hover:opacity-80'
                        }`}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))
                  : /* dot indicators for large galleries */
                    lightboxImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                        className={`rounded-full transition-all ${
                          idx === lightboxIndex
                            ? 'bg-[#F4F416] w-8 h-2'
                            : 'bg-white/30 w-2 h-2 hover:bg-white/50'
                        }`}
                      />
                    ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}