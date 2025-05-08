import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Navigation from '@/components/ui/Navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Luxury Car Rental Morocco | Location de Voitures de Luxe',
  description: 'Découvrez notre flotte exclusive de véhicules de luxe disponibles à la location au Maroc. Des voitures haut de gamme pour une expérience de conduite unique.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans text-charcoal-800 bg-white">
        <Navigation />
        
        {children}
        
        <footer className="bg-charcoal-900 text-white pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
              <div>
                <div className="font-serif text-2xl font-bold tracking-wider mb-6">
                  <span className="text-white">LUXURY</span>
                  <span className="text-gold-500 ml-1">CARS</span>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Votre partenaire de confiance pour la location de voitures de luxe au Maroc depuis 2010. Nous offrons une expérience premium à chaque client.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="h-10 w-10 rounded-full bg-charcoal-800 hover:bg-gold-600 flex items-center justify-center transition-colors">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-charcoal-800 hover:bg-gold-600 flex items-center justify-center transition-colors">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-charcoal-800 hover:bg-gold-600 flex items-center justify-center transition-colors">
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-6 text-gold-400">Navigation</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-white/70 hover:text-gold-400 transition-colors">
                      Accueil
                    </Link>
                  </li>
                  <li>
                    <Link href="/vehicules" className="text-white/70 hover:text-gold-400 transition-colors">
                      Nos véhicules
                    </Link>
                  </li>
                  <li>
                    <Link href="/reservation" className="text-white/70 hover:text-gold-400 transition-colors">
                      Réservation
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-white/70 hover:text-gold-400 transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-white/70 hover:text-gold-400 transition-colors">
                      À propos
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-white/70 hover:text-gold-400 transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-6 text-gold-400">Catégories</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/vehicules?category=suv" className="text-white/70 hover:text-gold-400 transition-colors">
                      SUV
                    </Link>
                  </li>
                  <li>
                    <Link href="/vehicules?category=berline" className="text-white/70 hover:text-gold-400 transition-colors">
                      Berline
                    </Link>
                  </li>
                  <li>
                    <Link href="/vehicules?category=citadine" className="text-white/70 hover:text-gold-400 transition-colors">
                      Citadine
                    </Link>
                  </li>
                  <li>
                    <Link href="/vehicules?category=coupe" className="text-white/70 hover:text-gold-400 transition-colors">
                      Coupé
                    </Link>
                  </li>
                  <li>
                    <Link href="/vehicules?category=cabriolet" className="text-white/70 hover:text-gold-400 transition-colors">
                      Cabriolet
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-6 text-gold-400">Contact</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="text-gold-400 mr-3 mt-1 flex-shrink-0" size={18} />
                    <span className="text-white/70">
                      123 Avenue Mohammed V<br />
                      Marrakech, Maroc
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="text-gold-400 mr-3 flex-shrink-0" size={18} />
                    <a href="tel:+212600000000" className="text-white/70 hover:text-gold-400 transition-colors">
                      +212 6 00 00 00 00
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Mail className="text-gold-400 mr-3 flex-shrink-0" size={18} />
                    <a href="mailto:contact@luxurycar.ma" className="text-white/70 hover:text-gold-400 transition-colors">
                      contact@luxurycar.ma
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Clock className="text-gold-400 mr-3 flex-shrink-0" size={18} />
                    <span className="text-white/70">
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
        </footer>
      </body>
    </html>
  );
}