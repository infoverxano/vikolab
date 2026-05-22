import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, MapPin, Phone, Send, Instagram, Twitter, Linkedin, CheckCircle, ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/viko.lab?igsh=d2hwZ3ZrbTE5YzNw' },
  { icon: Twitter, href: 'https://twitter.com/vikolab' },
  // { icon: Linkedin, href: 'https://linkedin.com/company/vikolab' }
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { lang, dir } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = {
    fr: {
      badge: "Contact", title: "Discutons de votre", titleHighlight: "Projet",
      desc: "Besoin d'un devis ? Contactez-nous maintenant. Réponse sous 24h garantie !",
      infoTitle: "Nos Coordonnées", formTitle: "Envoyez-nous un message", formSubtitle: "Remplissez le formulaire ci-dessous",
      name: "Nom complet", email: "Email", phone: "Téléphone", service: "Service souhaité", message: "Votre message",
      submit: "Envoyer", sent: "Message envoyé !",
      services: ["Impression Numérique", "Logo & Identité", "Cartes Visite", "Flyers & Brochures", "Signalétique", "Habillage Véhicule", "Réseaux Sociaux", "Autre"],
      cta: "Ou appelez-nous", ctaBtn: "Appeler"
    },
    en: {
      badge: "Contact", title: "Let's Discuss Your", titleHighlight: "Project",
      desc: "Need a quote? Contact us now. Guaranteed response within 24h!",
      infoTitle: "Our Contact", formTitle: "Send us a Message", formSubtitle: "Fill out the form below",
      name: "Full Name", email: "Email", phone: "Phone", service: "Service Needed", message: "Your Message",
      submit: "Send", sent: "Message Sent!",
      services: ["Digital Printing", "Logo & Identity", "Business Cards", "Flyers & Brochures", "Signage", "Vehicle Wrap", "Social Media", "Other"],
      cta: "Or call us directly", ctaBtn: "Call Now"
    },
    ar: {
      badge: "تواصل", title: "لنتحدث عن", titleHighlight: "مشروعك",
      desc: "بحاجة إلى عرض أسعار؟ اتصل بنا الآن. إجابة خلال 24 ساعة!",
      infoTitle: "معلوماتنا", formTitle: "راسلنا رسالة", formSubtitle: "املأ النموذج أدناه",
      name: "الاسم الكامل", email: "البريد", phone: "الجوال", service: "الخدمة المطلوبة", message: "الرسالة",
      submit: "إرسال", sent: "تم الإرسال!",
      services: ["الطباعة الرقمية", "شعار وهوية", "بطاقات", "منشورات", "لافتات", "تغليف سيارات", "تواصل", "أخرى"],
      cta: "أو اتصل بنا مباشرة", ctaBtn: "اتصل الآن"
    }
  };

  const t = content[lang];

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setIsSubmitted(true); setTimeout(() => setIsSubmitted(false), 3000); };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { setFormState(prev => ({ ...prev, [e.target.name]: e.target.value })); };

  return (
    <section id="contact" className="py-24 bg-[#111111] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,244,22,0.08)_0%,transparent_60%)]" />
      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full border border-[#F4F416]/40 text-[#F4F416] text-sm font-medium mb-6 inline-block">{t.badge}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.title} <span className="text-[#F4F416]">{t.titleHighlight}</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.desc}</p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">{t.infoTitle}</h3>
                <div className="space-y-4">
                  {[ { icon: Mail, label: 'Email', value: 'info.vikolab@gmail.com', href: 'mailto:info.vikolab@gmail.com' }, { icon: Phone, label: t.phone, value: '+212610090067', href: 'tel:+212610090067' }, { icon: MapPin, label: 'Location', value: 'casablanca, hay mohammadi' } ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/[0.08] transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-[#F4F416]/10 flex items-center justify-center"><item.icon className="w-5 h-5 text-[#F4F416]" /></div>
                      <div>
                        <p className="text-sm text-gray-400">{item.label}</p>
                        {item.href ? <a href={item.href} className="text-white hover:text-[#F4F416] transition-colors">{item.value}</a> : <p className="text-white">{item.value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex gap-3">
                  {socialLinks.map((social, i) => (<motion.a key={i} href={social.href} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#F4F416] hover:border-[#F4F416] transition-all" whileHover={{ scale: 1.1, y: -2 }}><social.icon className="w-5 h-5" /></motion.a>))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#F4F416] text-black">
                <p className="text-black/70 mb-4">{t.cta}</p>
                <a href="tel:+966XXXXXXXXX" className="w-full py-3 bg-black text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-black/80 transition-colors">{t.ctaBtn}<ArrowUpRight className="w-4 h-4" /></a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }} className="lg:col-span-3">
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-2">{t.formTitle}</h3>
                <p className="text-gray-400 mb-8">{t.formSubtitle}</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <input type="text" name="name" value={formState.name} onChange={handleChange} required placeholder={t.name} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#F4F416] focus:outline-none transition-colors" />
                    <input type="email" name="email" value={formState.email} onChange={handleChange} required placeholder={t.email} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#F4F416] focus:outline-none transition-colors" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <input type="tel" name="phone" value={formState.phone} onChange={handleChange} placeholder={t.phone} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#F4F416] focus:outline-none transition-colors" />
                    <select name="service" value={formState.service} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#F4F416] focus:outline-none transition-colors appearance-none">
                      <option value="" className="bg-[#111111]">{t.service}</option>
                      {t.services.map((s, i) => <option key={i} value={s} className="bg-[#111111]">{s}</option>)}
                    </select>
                  </div>
                  <textarea name="message" value={formState.message} onChange={handleChange} required rows={4} placeholder={t.message} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#F4F416] focus:outline-none transition-colors resize-none" />
                  <motion.button type="submit" disabled={isSubmitted} className="w-full py-4 bg-[#F4F416] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-70" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    {isSubmitted ? <><CheckCircle className="w-5 h-5" />{t.sent}</> : <><Send className="w-5 h-5" />{t.submit}</>}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
