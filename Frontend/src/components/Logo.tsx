import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 'md', className = '', showText = true }: LogoProps) {
  const { lang } = useLanguage();
  const sizes = { sm: { image: 36 }, md: { image: 44 }, lg: { image: 72 }, xl: { image: 120 } };
  const { image } = sizes[size];

  return (
    <motion.a href="#" className={`flex items-center gap-3 ${className}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.02 }}>
      <motion.img src="/uploads/upload_1.jpeg" alt="Vikolab" width={image} height={image} className="object-contain rounded-lg" />
      {showText && (
        <span className={`font-black tracking-tight text-white ${size === 'xl' ? 'text-3xl' : size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'}`}>
          {lang === 'ar' ? (<span className="text-[#F4F416]">في كو لاب</span>) : (<span className="text-[#F4F416]">VIKOLAB</span>)}
        </span>
      )}
    </motion.a>
  );
}
