'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, ChevronRight, Heart, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Footer(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setIsSubscribed(true);
        setEmail('');
      }, 500);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-charcoal-900 to-black text-white pt-20 pb-8 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 z-10"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold-800 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-black to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="font-serif text-3xl font-bold tracking-wider mb-6 group relative">
              <span className="text-white group-hover:text-gold-400 transition-colors duration-500">LUXURY</span>
              <span className="text-gold-500 ml-1">CARS</span>
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-700"></div>
            </div>
            
            <p className="text-white/70 mb-8 leading-relaxed">
              Votre partenaire de confiance pour la location de voitures de luxe au Maroc depuis 2010. Nous offrons une expérience premium à chaque client, avec une flotte exceptionnelle et un service irréprochable.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <FooterSocialLink href="#" icon={<Facebook size={18} />} label="Facebook" />
              <FooterSocialLink href="#" icon={<Instagram size={18} />} label="Instagram" />
              <FooterSocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
            </div>
            
            {/* Newsletter Subscription */}
            <div className="mt-10 bg-charcoal-800/50 p-5 rounded-lg border border-charcoal-700">
              <h3 className="text-lg font-bold text-white mb-3">Restez informé</h3>
              <p className="text-white/70 text-sm mb-4">
                Recevez nos offres spéciales et actualités
              </p>
              
              {isSubscribed ? (
                <div className="flex items-center text-green-400 bg-green-900/30 p-3 rounded-md">
                  <Heart size={18} className="mr-2" />
                  <span className="text-sm">Merci pour votre inscription!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 py-2 px-3 bg-charcoal-700/50 border border-charcoal-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gold-500 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gold-500 hover:bg-gold-600 text-white py-2 px-4 rounded-r-md transition-colors duration-300"
                  >
                    <ChevronRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
          
          {/* Navigation Column */}
          <div className="lg:col-span-2">
            <FooterHeading text="Navigation" />
            <ul className="space-y-3">
              <FooterNavLink href="/" text="Accueil" />
              <FooterNavLink href="/vehicules" text="Nos véhicules" />
              <FooterNavLink href="/reservation" text="Réservation" />
              <FooterNavLink href="/contact" text="Contact" />
              <FooterNavLink href="/about" text="À propos" />
              <FooterNavLink href="/faq" text="FAQ" />
            </ul>
          </div>
          
          {/* Categories Column */}
          <div className="lg:col-span-2">
            <FooterHeading text="Catégories" />
            <ul className="space-y-3">
              <FooterNavLink href="/vehicules?category=suv" text="SUV" />
              <FooterNavLink href="/vehicules?category=berline" text="Berline" />
              <FooterNavLink href="/vehicules?category=citadine" text="Citadine" />
              <FooterNavLink href="/vehicules?category=coupe" text="Coupé" />
              <FooterNavLink href="/vehicules?category=cabriolet" text="Cabriolet" />
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="lg:col-span-4">
            <FooterHeading text="Contact" />
            <ul className="space-y-4">
              <FooterContactItem
                icon={<MapPin className="text-gold-400" size={18} />}
                label="Adresse"
              >
                123 Avenue Mohammed V<br />
                Marrakech, Maroc
              </FooterContactItem>
              
              <FooterContactItem
                icon={<Phone className="text-gold-400" size={18} />}
                label="Téléphone"
                link="tel:+212600000000"
              >
                +212 6 00 00 00 00
              </FooterContactItem>
              
              <FooterContactItem
                icon={<Mail className="text-gold-400" size={18} />}
                label="Email"
                link="mailto:contact@luxurycar.ma"
              >
                contact@luxurycar.ma
              </FooterContactItem>
              
              <FooterContactItem
                icon={<Clock className="text-gold-400" size={18} />}
                label="Horaires"
              >
                Lun-Sam: 8h - 20h<br />
                Dim: 10h - 16h
              </FooterContactItem>
            </ul>
            
            {/* Map Embed (Optional) */}
            <div className="mt-6 bg-charcoal-800 rounded-lg overflow-hidden h-32 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/50 text-sm">Carte interactive</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-charcoal-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row md:items-center mb-6 md:mb-0">
            <p className="text-white/50 text-sm mb-2 md:mb-0 md:mr-4">
              © {new Date().getFullYear()} Luxury Car Rental Morocco. Tous droits réservés.
            </p>
            
            <div className="flex items-center text-white/30 text-xs">
              <Shield size={14} className="mr-1" />
              <span>Paiements sécurisés</span>
            </div>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-white/50 hover:text-gold-400 text-sm transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-gold-400 text-sm transition-colors">
              Conditions d'utilisation
            </Link>
            <Link href="/cookies" className="text-white/50 hover:text-gold-400 text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
        
        {/* Back to Top Button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-charcoal-800 hover:bg-gold-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-gold group"
            aria-label="Retour en haut"
          >
            <svg 
              className="w-5 h-5 transform rotate-180 group-hover:-translate-y-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

// Footer Heading Component
function FooterHeading({ text }: { text: string }): JSX.Element {
  return (
    <h3 className="text-lg font-bold mb-6 text-gold-400 relative inline-block after:content-[''] after:absolute after:w-12 after:h-0.5 after:bg-gold-500 after:bottom-[-10px] after:left-0">
      {text}
    </h3>
  );
}

// Footer Navigation Link Component
function FooterNavLink({ href, text }: { href: string; text: string }): JSX.Element {
  return (
    <li>
      <Link 
        href={href} 
        className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:pl-2 inline-flex items-center group"
      >
        <span className="w-0 h-0.5 bg-gold-500 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
        {text}
      </Link>
    </li>
  );
}

// Footer Social Link Component
function FooterSocialLink({ 
  href, 
  icon, 
  label 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string 
}): JSX.Element {
  return (
    <a 
      href={href} 
      className="h-10 w-10 rounded-full bg-charcoal-800 hover:bg-gold-600 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-gold-500/20 group relative overflow-hidden"
      aria-label={label}
    >
      <span className="relative z-10 transition-colors duration-300">{icon}</span>
      <span className="absolute inset-0 bg-gradient-to-tr from-gold-600 to-gold-400 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
    </a>
  );
}

// Footer Contact Item Component
function FooterContactItem({ 
  icon, 
  children, 
  label,
  link = undefined
}: { 
  icon: React.ReactNode; 
  children: React.ReactNode; 
  label: string;
  link?: string;
}): JSX.Element {
  const content = (
    <>
      <span className="flex-shrink-0 mr-3 mt-1 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <div>
        <span className="text-xs uppercase tracking-wider text-white/40 mb-1 block">{label}</span>
        <span className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
          {children}
        </span>
      </div>
    </>
  );

  if (link) {
    return (
      <li className="flex items-start group">
        <a href={link} className="flex items-start hover:text-gold-400 transition-colors duration-300">
          {content}
        </a>
      </li>
    );
  }
  
  return (
    <li className="flex items-start group">
      {content}
    </li>
  );
}