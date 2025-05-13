'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone, ChevronRight } from 'lucide-react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="font-serif text-2xl font-bold tracking-wider relative">
              <span className={`${scrolled ? 'text-black' : 'text-white'} transition-colors duration-300`}>LUXURY</span>
              <span className="text-gold-500 ml-1">CARS</span>
              <div className="absolute h-0.5 w-0 bg-gold-500 bottom-0 left-0 group-hover:w-full transition-all duration-500"></div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink href="/" label="Accueil" scrolled={scrolled} />
            <NavLink href="/vehicules" label="Nos Véhicules" scrolled={scrolled} />
            
            {/* Dropdown Menu */}
            <div className="relative group">
              <button
                className={`flex items-center px-4 py-2 rounded-md ${
                  scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                } transition-all duration-300 font-medium group-hover:scale-105`}
              >
                Catégories 
                <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-60 bg-white/98 backdrop-blur-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-xl border border-gray-100">
                <DropdownLink href="/vehicules?category=suv" label="SUV" />
                <DropdownLink href="/vehicules?category=berline" label="Berline" />
                <DropdownLink href="/vehicules?category=citadine" label="Citadine" />
                <DropdownLink href="/vehicules?category=coupe" label="Coupé" />
                <DropdownLink href="/vehicules?category=cabriolet" label="Cabriolet" />
              </div>
            </div>
            
            <NavLink href="/reservation" label="Réservation" scrolled={scrolled} />
            <NavLink href="/contact" label="Contact" scrolled={scrolled} />
          </div>

          {/* Contact and Reservation */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+212600000000"
              className={`flex items-center px-4 py-2 rounded-md ${
                scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              } transition-all duration-300 font-medium group`}
            >
              <Phone size={18} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative overflow-hidden inline-block">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">+212 6 00 00 00 00</span>
                <span className="absolute top-0 left-0 inline-block transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-gold-500">+212 6 00 00 00 00</span>
              </span>
            </a>
            
            <Link
              href="/reservation"
              className="ml-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-2 px-6 rounded-md transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:shadow-gold-500/20 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                Réserver
                <ChevronRight size={18} className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-gold-700 to-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-full ${
              scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            } focus:outline-none transition-all duration-300 active:scale-90 hover:scale-105`}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu - Full Screen Overlay */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={() => setIsOpen(false)}>
            <div 
              className="h-full max-w-sm ml-auto bg-white/95 p-6 shadow-2xl animate-slideInRight overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Mobile Logo */}
              <div className="flex justify-between items-center mb-8">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <div className="font-serif text-2xl font-bold tracking-wider">
                    <span className="text-black">LUXURY</span>
                    <span className="text-gold-500 ml-1">CARS</span>
                  </div>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Menu Items */}
              <div className="space-y-1">
                <MobileNavLink href="/" label="Accueil" onClick={() => setIsOpen(false)} />
                <MobileNavLink href="/vehicules" label="Nos Véhicules" onClick={() => setIsOpen(false)} />
                
                {/* Mobile Category Accordion */}
                <MobileAccordion label="Catégories" items={[
                  { href: "/vehicules?category=suv", label: "SUV" },
                  { href: "/vehicules?category=berline", label: "Berline" },
                  { href: "/vehicules?category=citadine", label: "Citadine" },
                  { href: "/vehicules?category=coupe", label: "Coupé" },
                  { href: "/vehicules?category=cabriolet", label: "Cabriolet" }
                ]} onItemClick={() => setIsOpen(false)} />
                
                <MobileNavLink href="/reservation" label="Réservation" onClick={() => setIsOpen(false)} />
                <MobileNavLink href="/contact" label="Contact" onClick={() => setIsOpen(false)} />
              </div>
              
              {/* Mobile Contact */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <a
                  href="tel:+212600000000"
                  className="flex items-center py-3 px-4 rounded-md text-gray-800 hover:bg-gold-50 hover:text-gold-800 transition-colors"
                >
                  <Phone size={18} className="mr-3 text-gold-500" />
                  +212 6 00 00 00 00
                </a>
                
                <Link
                  href="/reservation"
                  className="block mt-6 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-3 px-4 rounded-md text-center font-medium shadow-md hover:shadow-lg transition-all duration-300 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center justify-center">
                    Réserver maintenant
                    <ChevronRight size={18} className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Desktop Nav Link Component
function NavLink({ href, label, scrolled }: { href: string; label: string; scrolled: boolean }): JSX.Element {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md ${
        scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
      } transition-all duration-300 font-medium hover:scale-105 relative group overflow-hidden`}
    >
      {label}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
  );
}

// Dropdown Link Component
function DropdownLink({ href, label }: { href: string; label: string }): JSX.Element {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-gray-800 hover:bg-gold-50 hover:text-gold-800 transition-colors group flex items-center"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      {label}
    </Link>
  );
}

// Mobile Nav Link Component
function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }): JSX.Element {
  return (
    <Link
      href={href}
      className="flex items-center justify-between py-3 px-4 rounded-md text-gray-800 hover:bg-gold-50 hover:text-gold-800 transition-colors"
      onClick={onClick}
    >
      <span>{label}</span>
      <ChevronRight size={16} className="text-gold-500" />
    </Link>
  );
}

// Mobile Accordion Component
function MobileAccordion({ 
  label, 
  items, 
  onItemClick 
}: { 
  label: string; 
  items: { href: string; label: string }[]; 
  onItemClick: () => void 
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between py-3 px-4 rounded-md text-gray-800 hover:bg-gold-50 hover:text-gold-800 transition-colors w-full"
      >
        <span>{label}</span>
        <ChevronDown 
          size={16} 
          className={`text-gold-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="ml-4 pl-2 border-l-2 border-gold-200 mt-1 mb-1 space-y-1 animate-fadeIn">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center py-2 px-4 rounded-md text-gray-700 hover:bg-gold-50 hover:text-gold-800 transition-colors"
              onClick={onItemClick}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-2"></span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}