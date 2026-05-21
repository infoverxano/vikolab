import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink, Eye, ArrowUpRight } from 'lucide-react';

const projects = {
  fr: [
    { title: 'MENU', category: 'CAFÉ', image: 'https://res.cloudinary.com/dfmcfmvja/image/upload/v1777914159/IMG-20260310-WA0015.jpg_ydhprf.jpg', color: '#ffc000' },
    { title: 'Nour Café', category: 'Enseigne Lumineuse', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', color: '#8B4513' },
    { title: 'Speed Delivery', category: 'Habillage Flotte', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80', color: '#3B82F6' },
    { title: 'Luxe Motors', category: 'Cartes Premium', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80', color: '#A855F7' },
    { title: 'TechVision', category: 'Campagne Flyers', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80', color: '#10B981' },
    { title: 'Fitness Pro', category: 'Réseaux Sociaux', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80', color: '#EF4444' },
    { title: 'Fitness Pro', category: 'Réseaux Sociaux', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80', color: '#EF4444' },
  ],
  en: [
    { title: 'Al-Rashid Trading', category: 'Logo & Stationery', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80', color: '#F4F416' },
    { title: 'Nour Café', category: 'Light Sign', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', color: '#8B4513' },
    { title: 'Speed Delivery', category: 'Fleet Wrapping', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80', color: '#3B82F6' },
    { title: 'Luxe Motors', category: 'Premium Cards', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80', color: '#A855F7' },
    { title: 'TechVision', category: 'Flyer Campaign', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80', color: '#10B981' },
    { title: 'Fitness Pro', category: 'Social Media', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80', color: '#EF4444' },
  ],
  ar: [
    { title: 'شركة الراشد', category: 'شعار وأوراق', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80', color: '#F4F416' },
    { title: 'مقهى النور', category: 'لوحة مضئية', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', color: '#8B4513' },
    { title: 'سبيد دليفري', category: 'تغليف أسطول', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80', color: '#3B82F6' },
    { title: 'لوكس موتورز', category: 'بطاقات فاخرة', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80', color: '#A855F7' },
    { title: 'تيك فيجن', category: 'حملة منشورات', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80', color: '#10B981' },
    { title: 'فتنس برو', category: 'تواصل اجتماعي', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80', color: '#EF4444' },
  ]
};

export function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { lang, dir } = useLanguage();

  const content = {
    fr: { badge: 'Portfolio', title: 'Nos', titleHighlight: 'Réalisations', subtitle: 'Projets de design graphique, signalétique et communication visuelle', cta: 'Voir Tous les Projets', view: 'Voir' },
    en: { badge: 'Portfolio', title: 'Our', titleHighlight: 'Creations', subtitle: 'Graphic design, signage and visual communication projects', cta: 'View All Projects', view: 'View' },
    ar: { badge: 'أعمالنا', title: 'مشاريعنا', titleHighlight: 'المميزة', subtitle: 'مشاريع التصميم، اللافتات والتواصل البصري', cta: 'شاهد المزيد', view: 'عرض' }
  };

  const t = content[lang];

  return (
    <section id="work" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(244,244,22,0.05)_0%,transparent_50%)]" />
      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.span className="px-4 py-1.5 rounded-full border border-[#F4F416]/40 text-[#F4F416] text-sm font-medium mb-6 inline-block">{t.badge}</motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t.title} <span className="text-[#F4F416]">{t.titleHighlight}</span></h2>
            </div>
            <p className="text-gray-400 max-w-md">{t.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects[lang].map((project, index) => (
              <motion.div key={project.title} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 * index, duration: 0.5 }} className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ backgroundColor: `${project.color}30`, color: project.color }}>{project.category}</span>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#F4F416] transition-colors">{project.title}</h3>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#F4F416] text-black text-sm font-semibold rounded-full">
                      <Eye className="w-4 h-4" />{t.view}
                    </button>
                    <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><ExternalLink className="w-4 h-4 text-white" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full hover:border-[#F4F416] hover:text-[#F4F416] transition-all">{t.cta}<ArrowUpRight className="w-4 h-4" /></button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
