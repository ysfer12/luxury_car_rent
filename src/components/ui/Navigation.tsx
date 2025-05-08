'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

export default function Navigation(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="font-serif text-2xl font-bold tracking-wider">
              <span className={scrolled ? 'text-black' : 'text-white'}>LUXURY</span>
              <span className="text-gold-500 ml-1">CARS</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-md ${
                scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              } transition-colors font-medium`}
            >
              Accueil
            </Link>
            <Link
              href="/vehicules"
              className={`px-4 py-2 rounded-md ${
                scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              } transition-colors font-medium`}
            >
              Nos Véhicules
            </Link>
            <div className="relative group">
              <button
                className={`flex items-center px-4 py-2 rounded-md ${
                  scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                } transition-colors font-medium`}
              >
                Catégories <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-60 bg-white/95 backdrop-blur-md shadow-xl rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="/vehicules?category=suv"
                  className="block px-4 py-2 text-gray-800 hover:bg-gold-50 hover:text-gold-800 transition-colors"
                >
                  SUV
                </Link>
                <Link
                  href="/vehicules?category=berline"
                  className="block px-4 py-2 text-gray-800 hover:bg-gold-50 hover:text-gold-800 transition-colors"
                >
                  Berline
                </Link>
                <Link
                  href="/vehicules?category=citadine"
                  className="block px-4 py-2 text-gray-800 hover:bg-gold-50 hover:text-gold-800 transition-colors"
                >
                  Citadine
                </Link>
                <Link
                  href="/vehicules?category=coupe"
                  className="block px-4 py-2 text-gray-800 hover:bg-gold-50 hover:text-gold-800 transition-colors"
                >
                  Coupé
                </Link>
                <Link
                  href="/vehicules?category=cabriolet"
                  className="block px-4 py-2 text-gray-800 hover:bg-gold-50 hover:text-gold-800 transition-colors"
                >
                  Cabriolet
                </Link>
              </div>
            </div>
            <Link
              href="/reservation"
              className={`px-4 py-2 rounded-md ${
                scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              } transition-colors font-medium`}
            >
              Réservation
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-md ${
                scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              } transition-colors font-medium`}
            >
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center">
            <a
              href="tel:+212600000000"
              className={`flex items-center px-4 py-2 rounded-md ${
                scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              } transition-colors font-medium`}
            >
              <Phone size={18} className="mr-2" />
              +212 6 00 00 00 00
            </a>
            <Link
              href="/reservation"
              className="ml-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-2 px-6 rounded-md transition-all font-medium shadow-md hover:shadow-lg"
            >
              Réserver
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-md ${
              scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            } focus:outline-none`}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-4">
            <Link
              href="/"
              className="block py-2 px-4 rounded-md text-gray-800 hover:bg-gold-50 hover:text-gold-800"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/vehicules"
              className="block py-2 px-4 rounded-md text-gray-800 hover:bg-gold-50 hover:text-gold-800"
              onClick={() => setIsOpen(false)}
            >
              Nos Véhicules
            </Link>
            <div className="py-2 px-4">
              <div className="block text-gray-800 font-medium mb-1">Catégories</div>
              <div className="pl-4 space-y-1">
                <Link
                  href="/vehicules?category=suv"
                  className="block py-1 px-3 rounded-md text-gray-700 hover:bg-gold-50 hover:text-gold-800"
                  onClick={() => setIsOpen(false)}
                >
                  SUV
                </Link>
                <Link
                  href="/vehicules?category=berline"
                  className="block py-1 px-3 rounded-md text-gray-700 hover:bg-gold-50 hover:text-gold-800"
                  onClick={() => setIsOpen(false)}
                >
                  Berline
                </Link>
                <Link
                  href="/vehicules?category=citadine"
                  className="block py-1 px-3 rounded-md text-gray-700 hover:bg-gold-50 hover:text-gold-800"
                  onClick={() => setIsOpen(false)}
                >
                  Citadine
                </Link>
                <Link
                  href="/vehicules?category=coupe"
                  className="block py-1 px-3 rounded-md text-gray-700 hover:bg-gold-50 hover:text-gold-800"
                  onClick={() => setIsOpen(false)}
                >
                  Coupé
                </Link>
                <Link
                  href="/vehicules?category=cabriolet"
                  className="block py-1 px-3 rounded-md text-gray-700 hover:bg-gold-50 hover:text-gold-800"
                  onClick={() => setIsOpen(false)}
                >
                  Cabriolet
                </Link>
              </div>
            </div>
            <Link
              href="/reservation"
              className="block py-2 px-4 rounded-md text-gray-800 hover:bg-gold-50 hover:text-gold-800"
              onClick={() => setIsOpen(false)}
            >
              Réservation
            </Link>
            <Link
              href="/contact"
              className="block py-2 px-4 rounded-md text-gray-800 hover:bg-gold-50 hover:text-gold-800"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <a
                href="tel:+212600000000"
                className="block py-2 px-4 rounded-md text-gray-800 hover:bg-gold-50 hover:text-gold-800 flex items-center"
              >
                <Phone size={18} className="mr-2" />
                +212 6 00 00 00 00
              </a>
              <Link
                href="/reservation"
                className="block mt-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-3 px-4 rounded-md text-center font-medium shadow-md hover:shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Réserver
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}