import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Award, Users, Briefcase, Clock, Star, CheckCircle, Zap, Target, Heart } from 'lucide-react';

const stats = {
  fr: [
    { icon: Briefcase, value: '500+', label: 'Projets Livrés' },
    { icon: Users, value: '300+', label: 'Clients Satisfaits' },
    { icon: Award, value: '8+', label: 'Années Expérience' },
    { icon: Clock, value: '24h', label: 'Délai Réponse' }
  ],
  en: [
    { icon: Briefcase, value: '500+', label: 'Projects Delivered' },
    { icon: Users, value: '300+', label: 'Happy Clients' },
    { icon: Award, value: '8+', label: 'Years Experience' },
    { icon: Clock, value: '24h', label: 'Response Time' }
  ],
  ar: [
    { icon: Briefcase, value: '500+', label: 'مشروع منجز' },
    { icon: Users, value: '300+', label: 'عميل راضٍ' },
    { icon: Award, value: '8+', label: 'سنوات خبرة' },
    { icon: Clock, value: '24h', label: 'وقت الرد' }
  ]
};

const features = {
  fr: [
    { icon: Zap, title: 'Livraison Rapide', desc: 'Délais respectés, même pour les projets urgents' },
    { icon: Target, title: 'Qualité Premium', desc: 'Matériaux et impressions haute définition' },
    { icon: Heart, title: 'Service Sur-Mesure', desc: 'Chaque projet est unique et personnalisé' },
    { icon: Award, title: 'Prix Compétitifs', desc: 'Meilleur rapport qualité-prix à Riyad' }
  ],
  en: [
    { icon: Zap, title: 'Fast Delivery', desc: 'Deadlines met, even for urgent projects' },
    { icon: Target, title: 'Premium Quality', desc: 'High definition materials and printing' },
    { icon: Heart, title: 'Custom Service', desc: 'Every project is unique and personalized' },
    { icon: Award, title: 'Competitive Prices', desc: 'Best value for money in Riyadh' }
  ],
  ar: [
    { icon: Zap, title: 'تسليم سريع', desc: 'مواعيد محترمة حتى للمشاريع العاجلة' },
    { icon: Target, title: 'جودة فاخرة', desc: 'مواد وطباعة بدقة عالية' },
    { icon: Heart, title: 'خدمة مخصصة', desc: 'كل مشروع فريد ومتناسب' },
    { icon: Award, title: 'أسعار تنافسية', desc: 'أفضل علاقة سعر/جودة في الرياض' }
  ]
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { lang, dir } = useLanguage();

  const content = {
    fr: {
      badge: 'À Propos', title: 'Votre Partenaire', titleHighlight: 'Design de Confiance',
      desc: "Vikolab est votre agence de design graphique et impression numérique de référence à Riyad. Nous accompagnons entreprises et entrepreneurs avec des solutions visuelles impactantes.",
      // whyTitle: 'Pourquoi Choisir Vikolab?',
      // testimonial: "Travail exceptionnel ! L'équipe a parfaitement compris nos besoins et livré une identité visuelle qui nous démarque vraiment.",
      // author: 'Mohammed Al-Farsi', role: 'CEO, TechVision KSA'
    },
    en: {
      badge: 'About Us', title: 'Your Trusted', titleHighlight: 'Design Partner',
      desc: "Vikolab is your reference graphic design and digital printing agency in Riyadh. We support businesses and entrepreneurs with impactful visual solutions.",
      // whyTitle: 'Why Choose Vikolab?',
      // testimonial: "Exceptional work! The team perfectly understood our needs and delivered a visual identity that truly sets us apart.",
      // author: 'Mohammed Al-Farsi', role: 'CEO, TechVision KSA'
    },
    ar: {
      badge: 'من نحن', title: 'شريكك الموثوق', titleHighlight: 'في التصميم',
      desc: "فيكولاب هي وكالتك المرجعية للتصميم الجرافيكي والطباعة الرقمية في الرياض. ندعم الشركات ورواد الأعمال بحلول بصرية مؤثرة.",
      // whyTitle: 'لماذا تختار فيكولاب؟',
      // testimonial: "عمل رائع! أحسنت الفريق بمعرفة احتياجاتنا بشكل مثالي وقدمت هوية بصرية تميزنا بالفعل.",
      // author: 'محمد الفارسي', role: 'المدير التنفيذي، تيك فيجن KSA'
    }
  };

  const t = content[lang];

  return (
    <section id="about" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(244,244,22,0.05)_0%,transparent_50%)]" />
      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full border border-[#F4F416]/40 text-[#F4F416] text-sm font-medium mb-6 inline-block">{t.badge}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.title} <span className="text-[#F4F416]">{t.titleHighlight}</span></h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">{t.desc}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {stats[lang].map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 * index }} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center group hover:border-[#F4F416]/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#F4F416]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#F4F416]/20 transition-colors"><stat.icon className="w-6 h-6 text-[#F4F416]" /></div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features[lang].map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + 0.1 * index }} className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-[#F4F416]/30 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-[#F4F416]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><feature.icon className="w-5 h-5 text-[#F4F416]" /></div>
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#F4F416]/10 via-transparent to-[#F4F416]/5 border border-[#F4F416]/20">
            <h3 className="text-xl font-bold text-white mb-8 text-center">{t.whyTitle}</h3>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" alt="Client" className="w-20 h-20 rounded-full object-cover border-2 border-[#F4F416]" />
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-[#F4F416] fill-[#F4F416]" />)}
                </div>
                <p className="text-xl text-white leading-relaxed mb-4">"{t.testimonial}"</p>
                <p className="font-bold text-white">{t.author}</p>
                <p className="text-gray-400 text-sm">{t.role}</p>
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
