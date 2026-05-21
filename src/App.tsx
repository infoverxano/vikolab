import { LanguageProvider } from './contexts/LanguageContext';
import { Navigation } from './components/Navigation';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { Work } from './sections/Work';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const { dir } = useLanguage();
  
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden" dir={dir}>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

// Need to import useLanguage here
import { useLanguage } from './contexts/LanguageContext';

export default App;
