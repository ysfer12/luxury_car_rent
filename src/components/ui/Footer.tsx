'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gradient-to-b from-charcoal-900 to-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          <div>
            <div className="font-serif text-2xl font-bold tracking-wider mb-6 group">
              <span className="text-white group-hover:text-gold-400 transition-colors duration-300">LUXURY</span>
              <span className="text-gold-500 ml-1">CARS</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Votre partenaire de confiance pour la location de voitures de luxe au Maroc depuis 2010. Nous offrons une expérience premium à chaque client.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-charcoal-800 hover:bg-gold-600 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-gold"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-charcoal-800 hover:bg-gold-600 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-gold"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-charcoal-800 hover:bg-gold-600 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-gold"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-gold-400 relative inline-block after:content-[''] after:absolute after:w-12 after:h-0.5 after:bg-gold-500 after:bottom-[-10px] after:left-0">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:pl-2 inline-block">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/vehicules" className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:pl-2 inline-block">
                  Nos véhicules
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:pl-2 inline-block">
                  Réservation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:pl-2 inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:pl-2 inline-block">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:pl-2 inline-block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-gold-400 relative inline-block after:content-[''] after:absolute after:w-12 after:h-0.5 after:bg-gold-500 after:bottom-[-10px] after:left-0">
              Catégories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/vehicules?category=suv" className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:pl-2 inline-block">
                  SUV
                </Link>
              </li>
              <li>
                <Link href="/vehicules?category=berline" className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:pl-2 inline-block">
                  Berline
                </Link>
              </li>
              <li>
                <Link href="/vehicules?category=citadine" className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:pl-2 inline-block">
                  Citadine
                </Link>
              </li>
              <li>
                <Link href="/vehicules?category=coupe" className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:pl-2 inline-block">
                  Coupé
                </Link>
              </li>
              <li>
                <Link href="/vehicules?category=cabriolet" className="text-white/70 hover:text-gold-400 transition-colors duration-300 hover:pl-2 inline-block">
                  Cabriolet
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-gold-400 relative inline-block after:content-[''] after:absolute after:w-12 after:h-0.5 after:bg-gold-500 after:bottom-[-10px] after:left-0">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="text-gold-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={18} />
                <span className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  123 Avenue Mohammed V<br />
                  Marrakech, Maroc
                </span>
              </li>
              <li className="flex items-center group">
                <Phone className="text-gold-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={18} />
                <a href="tel:+212600000000" className="text-white/70 hover:text-gold-400 transition-colors duration-300">
                  +212 6 00 00 00 00
                </a>
              </li>
              <li className="flex items-center group">
                <Mail className="text-gold-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={18} />
                <a href="mailto:contact@luxurycar.ma" className="text-white/70 hover:text-gold-400 transition-colors duration-300">
                  contact@luxurycar.ma
                </a>
              </li>
              <li className="flex items-start group">
                <Clock className="text-gold-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={18} />
                <span className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  Lun-Sam: 8h - 20h<br />
                  Dim: 10h - 16h
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-charcoal-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Luxury Car Rental Morocco. Tous droits réservés.
          </p>
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
      </div>
      
      {/* Add gradient line at the top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600"></div>
    </footer>
  );
}