'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { vehicles, categories } from '@/data/vehicles';
import ReservationForm from '@/components/ui/ReservationForm';
import { 
  ArrowLeft, ArrowRight, Calendar, Users, Fuel, Gauge, Shield, 
  Zap, Check, MapPin, Star, ChevronRight, Share2, Heart, 
  ArrowUpRight, Phone, ChevronDown, Maximize2, Minimize2, 
  Clock, Coffee, Award, Info
} from 'lucide-react';
import { Vehicle } from '@/data/vehicles';

interface VehicleDetailsParams {
  params: {
    id: string;
  };
}

export default function VehicleDetails({ params }: VehicleDetailsParams): JSX.Element {
  const vehicle = vehicles.find((v) => v.id === params.id);
  
  if (!vehicle) {
    notFound();
  }
  
  const [activeImage, setActiveImage] = useState<number>(0);
  const [showReservation, setShowReservation] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('description');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isGalleryExpanded, setIsGalleryExpanded] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll for navigation
  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Trigger fade-in animations after mount
  useEffect(() => {
    setFadeIn(true);
    
    // Simulate image loading
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle image navigation
  const nextImage = (): void => {
    setActiveImage((prev) => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
    setImageLoaded(false);
    
    // Simulate image loading
    setTimeout(() => {
      setImageLoaded(true);
    }, 300);
  };
  
  const prevImage = (): void => {
    setActiveImage((prev) => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
    setImageLoaded(false);
    
    // Simulate image loading
    setTimeout(() => {
      setImageLoaded(true);
    }, 300);
  };
  
  // Handle scrolling to reservation form
  const scrollToReservation = (): void => {
    setShowReservation(true);
    setTimeout(() => {
      const form = document.getElementById('reservation-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Find similar vehicles
  const similarVehicles = vehicles
    .filter((v) => v.category === vehicle.category && v.id !== vehicle.id)
    .slice(0, 3);

  return (
    <>
      {/* Custom Navigation Bar - matches the regular header but with shadow on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-white py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="font-serif text-2xl font-bold tracking-wider relative">
                <span className="text-gray-800 transition-colors duration-300">LUXURY</span>
                <span className="text-gold-500 ml-1">CARS</span>
                <div className="absolute h-0.5 w-0 bg-gold-500 bottom-0 left-0 group-hover:w-full transition-all duration-500"></div>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className="px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 transition-all duration-300 font-medium hover:scale-105"
              >
                Accueil
              </Link>
              <Link
                href="/vehicules"
                className="px-4 py-2 rounded-md text-gold-600 hover:bg-gray-100 transition-all duration-300 font-medium hover:scale-105"
              >
                Nos Véhicules
              </Link>
              <div className="relative group">
                <button
                  className="flex items-center px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 transition-all duration-300 font-medium group-hover:scale-105"
                >
                  Catégories <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 shadow-xl border border-gray-100">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/vehicules?category=${category.id}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gold-50 hover:text-gold-800 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/reservation"
                className="px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 transition-all duration-300 font-medium hover:scale-105"
              >
                Réservation
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 transition-all duration-300 font-medium hover:scale-105"
              >
                Contact
              </Link>
            </div>
          
            {/* Action Buttons */}
            <div className="hidden lg:flex items-center">
              <a
                href="tel:+212600000000"
                className="flex items-center px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 transition-all duration-300 font-medium group"
              >
                <Phone size={18} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                +212 6 00 00 00 00
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
            
            {/* Mobile Menu Button would go here */}
          </nav>
        </div>
      </header>
    
      <main className="pt-28 pb-20 bg-gradient-to-b from-gray-50 to-white text-gray-800 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div 
            className="mb-8 transition-all duration-1000"
            style={{ 
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            <nav className="flex">
              <ol className="flex items-center space-x-1 text-sm">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gold-600 transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400 mx-1">/</span>
                </li>
                <li>
                  <Link href="/vehicules" className="text-gray-500 hover:text-gold-600 transition-colors">
                    Véhicules
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400 mx-1">/</span>
                </li>
                <li>
                  <span className="text-gold-600 font-medium">{vehicle.name}</span>
                </li>
              </ol>
            </nav>
          </div>
          
          {/* Main Content */}
          <div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-1000"
            style={{ 
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Vehicle Images - Take up 3/5 of the width on desktop */}
              <div 
                ref={galleryRef}
                className={`${isGalleryExpanded ? 'lg:col-span-5' : 'lg:col-span-3'} relative transition-all duration-500`}
              >
                <div className={`relative ${isGalleryExpanded ? 'h-[70vh]' : 'h-80 sm:h-96 md:h-[600px]'}`}>
                  {/* Loading Overlay */}
                  <div 
                    className={`absolute inset-0 bg-gray-100 z-20 flex items-center justify-center transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full border-4 border-gold-500 border-t-transparent animate-spin"></div>
                  </div>
                  
                  <Image
                    src={vehicle.images[activeImage] || '/images/placeholder-car.jpg'}
                    alt={vehicle.name}
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                    className={`transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  
                  {/* Image Navigation Controls */}
                  {vehicle.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-gold-500 text-gray-800 hover:text-white p-3 rounded-full z-10 transition-all duration-300 hover:scale-110 shadow-lg"
                        aria-label="Image précédente"
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-gold-500 text-gray-800 hover:text-white p-3 rounded-full z-10 transition-all duration-300 hover:scale-110 shadow-lg"
                        aria-label="Image suivante"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </>
                  )}
                  
                  {/* Toggle Gallery Size */}
                  <button
                    onClick={() => setIsGalleryExpanded(!isGalleryExpanded)}
                    className="absolute top-4 left-4 bg-white/80 hover:bg-gold-500 text-gray-800 hover:text-white p-2 rounded-lg z-10 transition-all duration-300 hover:scale-105 shadow-md"
                    aria-label={isGalleryExpanded ? "Réduire la galerie" : "Agrandir la galerie"}
                  >
                    {isGalleryExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </button>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-gold-600 to-gold-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
                    {vehicle.year}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-16 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    {categories.find(cat => cat.id === vehicle.category)?.name || vehicle.category}
                  </div>
                  
                  {/* Bottom Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Actions Bar */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                    <button 
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`p-2.5 rounded-full transition-all duration-300 ${
                        isFavorite 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white'
                      } shadow-md hover:shadow-lg`}
                      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                    >
                      <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                    <button 
                      className="p-2.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
                      aria-label="Partager"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
                
                {/* Thumbnail Navigation */}
                {vehicle.images.length > 1 && !isGalleryExpanded && (
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex justify-center">
                    <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                      {vehicle.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImage(index)}
                          className={`relative w-16 h-12 rounded-md overflow-hidden transition-all duration-300 ${
                            activeImage === index 
                              ? 'ring-2 ring-gold-500 ring-offset-1 ring-offset-white/20 scale-105' 
                              : 'opacity-70 hover:opacity-100'
                          }`}
                          aria-label={`Voir l'image ${index + 1}`}
                        >
                          <Image
                            src={image}
                            alt={`${vehicle.name} - Vue ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Vehicle Details - Take up 2/5 of the width on desktop */}
              {!isGalleryExpanded && (
                <div className="lg:col-span-2 p-6 lg:p-10 flex flex-col h-full bg-white shadow-inner">
                  <div className="flex flex-col flex-grow">
                    {/* Vehicle Title and Rating */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <h1 className="font-serif text-3xl lg:text-4xl font-bold text-gray-800 mb-2 md:mb-0">{vehicle.name}</h1>
                      <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={16} 
                            fill={star < 5 ? "#EAB308" : "none"}
                            className={star < 5 ? "text-gold-500" : "text-gray-300"} 
                          />
                        ))}
                        <span className="ml-2 text-gray-500 text-sm">(4.8)</span>
                      </div>
                    </div>
                    
                    {/* Vehicle Specs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                      <div className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-all duration-300 hover:bg-white hover:border-gold-200 border border-gray-100">
                        <Calendar size={22} className="text-gold-500 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Année</p>
                        <p className="font-medium text-gray-800">{vehicle.year}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-all duration-300 hover:bg-white hover:border-gold-200 border border-gray-100">
                        <Fuel size={22} className="text-gold-500 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Carburant</p>
                        <p className="font-medium text-gray-800">{vehicle.features[0]}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-all duration-300 hover:bg-white hover:border-gold-200 border border-gray-100">
                        <Zap size={22} className="text-gold-500 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Puissance</p>
                        <p className="font-medium text-gray-800">{vehicle.features[1]}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-all duration-300 hover:bg-white hover:border-gold-200 border border-gray-100">
                        <Gauge size={22} className="text-gold-500 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Transmission</p>
                        <p className="font-medium text-gray-800">Automatique</p>
                      </div>
                    </div>
                    
                    {/* Premium Feature Badge */}
                    <div className="flex items-center gap-2 mb-6 bg-gold-50 p-3 rounded-lg border border-gold-100">
                      <div className="bg-gold-500 rounded-md p-1.5 text-white">
                        <Award size={16} />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">Véhicule Premium</p>
                        <p className="text-gray-500 text-xs">Tous nos véhicules sont entretenus selon les normes constructeur</p>
                      </div>
                    </div>
                    
                    {/* Tabs */}
                    <div className="mb-6">
                      <div className="border-b border-gray-200">
                        <nav className="flex -mb-px space-x-8">
                          <button
                            onClick={() => setActiveTab('description')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-300 ${
                              activeTab === 'description'
                                ? 'border-gold-500 text-gold-600'
                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                            }`}
                          >
                            Description
                          </button>
                          <button
                            onClick={() => setActiveTab('features')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-300 ${
                              activeTab === 'features'
                                ? 'border-gold-500 text-gold-600'
                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                            }`}
                          >
                            Caractéristiques
                          </button>
                          <button
                            onClick={() => setActiveTab('terms')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-300 ${
                              activeTab === 'terms'
                                ? 'border-gold-500 text-gold-600'
                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                            }`}
                          >
                            Conditions
                          </button>
                        </nav>
                      </div>
                      
                      <div className="py-6">
                        {activeTab === 'description' && (
                          <div className="animate-fadeIn">
                            <p className="text-gray-700 mb-4 leading-relaxed">
                              {vehicle.description}
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                              Profitez d'une expérience de conduite incomparable au Maroc avec ce véhicule d'exception. 
                              Que ce soit pour un voyage d'affaires, des vacances en famille ou une escapade romantique, 
                              cette voiture vous garantit confort, sécurité et élégance.
                            </p>
                          </div>
                        )}
                        
                        {activeTab === 'features' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 animate-fadeIn">
                            {vehicle.features.map((feature, index) => (
                              <div key={index} className="flex items-center group">
                                <div className="p-1 rounded-full bg-gold-100 mr-3 flex-shrink-0 group-hover:bg-gold-200 transition-colors duration-300">
                                  <Check size={14} className="text-gold-600" />
                                </div>
                                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{feature}</span>
                              </div>
                            ))}
                            <div className="flex items-center group">
                              <div className="p-1 rounded-full bg-gold-100 mr-3 flex-shrink-0 group-hover:bg-gold-200 transition-colors duration-300">
                                <Check size={14} className="text-gold-600" />
                              </div>
                              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Climatisation</span>
                            </div>
                            <div className="flex items-center group">
                              <div className="p-1 rounded-full bg-gold-100 mr-3 flex-shrink-0 group-hover:bg-gold-200 transition-colors duration-300">
                                <Check size={14} className="text-gold-600" />
                              </div>
                              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Bluetooth</span>
                            </div>
                            <div className="flex items-center group">
                              <div className="p-1 rounded-full bg-gold-100 mr-3 flex-shrink-0 group-hover:bg-gold-200 transition-colors duration-300">
                                <Check size={14} className="text-gold-600" />
                              </div>
                              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">GPS</span>
                            </div>
                            <div className="flex items-center group">
                              <div className="p-1 rounded-full bg-gold-100 mr-3 flex-shrink-0 group-hover:bg-gold-200 transition-colors duration-300">
                                <Check size={14} className="text-gold-600" />
                              </div>
                              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">Régulateur de vitesse</span>
                            </div>
                          </div>
                        )}
                        
                        {activeTab === 'terms' && (
                          <div className="animate-fadeIn">
                            <div className="bg-gray-50 p-5 rounded-xl mb-5 border border-gray-200 shadow-sm">
                              <div className="flex items-start mb-4">
                                <MapPin size={18} className="text-gold-500 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium text-gray-800 mb-1">Lieu de prise en charge</h4>
                                  <p className="text-gray-600 text-sm">
                                    Aéroport de Marrakech Menara, Aéroport de Casablanca, hôtel ou adresse de votre choix
                                  </p>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-800 mb-2">Documents requis</h4>
                                <ul className="text-gray-600 text-sm space-y-2">
                                  <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2 flex-shrink-0"></span>
                                    Permis de conduire valide (permis international pour les non-résidents)
                                  </li>
                                  <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2 flex-shrink-0"></span>
                                    Pièce d'identité ou passeport
                                  </li>
                                  <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2 flex-shrink-0"></span>
                                    Carte de crédit au nom du conducteur principal
                                  </li>
                                </ul>
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
                              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                                <Shield size={16} className="mr-2 text-gold-500" />
                                Inclus dans le prix
                              </h4>
                              <ul className="text-gray-600 text-sm space-y-2">
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2 flex-shrink-0"></span>
                                  Kilométrage illimité
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2 flex-shrink-0"></span>
                                  Assurance tous risques
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2 flex-shrink-0"></span>
                                  Assistance 24/7
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2 flex-shrink-0"></span>
                                  Livraison et reprise du véhicule
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="mt-auto">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 pt-6 border-t border-gray-200">
                      <div className="mb-4 sm:mb-0">
                        <span className="text-gray-500 text-sm font-medium">Prix à partir de</span>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-gold-600">{vehicle.price}</span>
                          <span className="text-lg text-gray-600 ml-1 font-normal">MAD/jour</span>
                        </div>
                        <span className="text-xs text-gray-500">Tous taxes incluses</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={scrollToReservation}
                          className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 flex items-center justify-center font-medium group relative overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center">
                            Réserver ce véhicule
                            <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                          <span className="absolute inset-0 bg-gradient-to-r from-gold-700 to-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-lg"></span>
                        </button>
                        <Link
                          href="/contact"
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-center transition-colors font-medium flex items-center justify-center group border border-gray-200"
                        >
                          Nous contacter
                          <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Safety and Trust Badges */}
          <div 
            className="mt-8 bg-white rounded-2xl shadow-lg p-6 flex flex-wrap justify-around items-center gap-6 border border-gray-100 transition-all duration-1000 delay-200"
            style={{ 
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="flex items-center gap-4 group">
              <div className="flex-shrink-0 h-14 w-14 bg-gold-50 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-gold-100">
                <Shield className="text-gold-500" size={24} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1 group-hover:text-gold-600 transition-colors">Assurance complète</h4>
                <p className="text-gray-600 text-sm">Couverture tous risques incluse</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="flex-shrink-0 h-14 w-14 bg-gold-50 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-gold-100">
                <Calendar className="text-gold-500" size={24} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1 group-hover:text-gold-600 transition-colors">Annulation flexible</h4>
                <p className="text-gray-600 text-sm">Sans frais jusqu'à 48h avant</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="flex-shrink-0 h-14 w-14 bg-gold-50 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-gold-100">
                <Users className="text-gold-500" size={24} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1 group-hover:text-gold-600 transition-colors">Service personnalisé</h4>
                <p className="text-gray-600 text-sm">Assistance 24/7 pendant votre location</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="flex-shrink-0 h-14 w-14 bg-gold-50 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-gold-100">
                <MapPin className="text-gold-500" size={24} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1 group-hover:text-gold-600 transition-colors">Livraison partout</h4>
                <p className="text-gray-600 text-sm">À l'adresse de votre choix au Maroc</p>
              </div>
            </div>
          </div>
          
          {/* Available Locations */}
          <div 
            className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-1000 delay-300"
            style={{ 
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Disponible dans ces villes</h3>
                <p className="text-gray-600">Notre service de livraison est disponible dans les principales villes du Maroc</p>
              </div>
              <Link
                href="/contact"
                className="text-gold-600 hover:text-gold-700 font-medium flex items-center text-sm group"
              >
                Demander une autre ville
                <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 hover:bg-white hover:border-gold-200 border border-gray-100 group">
                <MapPin size={20} className="text-gold-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-gray-800">Marrakech</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 hover:bg-white hover:border-gold-200 border border-gray-100 group">
                <MapPin size={20} className="text-gold-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-gray-800">Casablanca</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 hover:bg-white hover:border-gold-200 border border-gray-100 group">
                <MapPin size={20} className="text-gold-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-gray-800">Rabat</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 hover:bg-white hover:border-gold-200 border border-gray-100 group">
                <MapPin size={20} className="text-gold-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-gray-800">Tanger</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 hover:bg-white hover:border-gold-200 border border-gray-100 group">
                <MapPin size={20} className="text-gold-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-gray-800">Agadir</p>
              </div>
            </div>
          </div>
          
          {/* Why Choose Us */}
          <div 
            className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-1000 delay-400"
            style={{ 
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Pourquoi choisir Luxury Cars ?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-gold-100 mr-4 flex-shrink-0">
                      <Check size={16} className="text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Qualité premium</h4>
                      <p className="text-gray-600 text-sm">Tous nos véhicules sont récents, parfaitement entretenus et nettoyés avant chaque location</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-gold-100 mr-4 flex-shrink-0">
                      <Clock size={16} className="text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Service rapide</h4>
                      <p className="text-gray-600 text-sm">Réservation simple et rapide, livraison et reprise à l'heure convenue</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-gold-100 mr-4 flex-shrink-0">
                      <Coffee size={16} className="text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Expérience sans stress</h4>
                      <p className="text-gray-600 text-sm">Documentation simplifiée, assistance 24/7 et aucun frais caché</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-80 md:h-auto bg-gray-100">
                <Image
                  src="/images/why-choose-us.jpg"
                  alt="Notre service client"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg max-w-xs text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <p className="text-gold-600 font-medium">Plus de 10 ans d'expérience</p>
                    <p className="text-gray-700 text-sm">Au service de la location de voitures de luxe au Maroc</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reservation Form */}
          {showReservation && (
            <div 
              id="reservation-form" 
              className="mt-12 bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-gray-100 transition-all duration-1000"
              style={{ 
                opacity: fadeIn ? 1 : 0,
                transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className="mb-8 text-center">
                <span className="inline-block px-4 py-1 rounded-full bg-gold-100 text-gold-600 text-sm font-medium mb-4">
                  Prêt à prendre la route ?
                </span>
                <h2 className="font-serif text-2xl font-bold text-gray-800 mb-2">Réserver {vehicle.name}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Complétez le formulaire ci-dessous pour réserver votre véhicule. Notre équipe vous contactera rapidement pour confirmer votre réservation.
                </p>
              </div>
              <ReservationForm vehicleId={vehicle.id} />
            </div>
          )}
          
          {/* Similar Vehicles */}
          {similarVehicles.length > 0 && (
            <div 
              className="mt-16 transition-all duration-1000 delay-500"
              style={{ 
                opacity: fadeIn ? 1 : 0,
                transform: fadeIn ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-2xl font-bold text-gray-800">Véhicules similaires</h2>
                <Link 
                  href="/vehicules" 
                  className="text-gold-600 hover:text-gold-700 font-medium text-sm flex items-center group"
                >
                  Voir tous les véhicules
                  <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarVehicles.map((similarVehicle) => (
                  <div key={similarVehicle.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-1 border border-gray-100 hover:border-gold-200">
                    <div className="relative h-56 overflow-hidden">
                      <Image 
                        src={similarVehicle.images[0] || '/images/placeholder-car.jpg'} 
                        alt={similarVehicle.name} 
                        fill
                        style={{ objectFit: 'cover' }}
                        className="group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Quick View Button */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <Link
                          href={`/vehicules/${similarVehicle.id}`}
                          className="bg-white text-gold-600 hover:text-gold-700 hover:bg-gold-50 py-2 px-4 rounded-full text-sm font-medium shadow-md flex items-center gap-1 transition-colors"
                        >
                          <Info size={14} />
                          Voir les détails
                          <ArrowUpRight size={14} className="ml-1" />
                        </Link>
                      </div>
                      
                      {/* Year Badge */}
                      <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        {similarVehicle.year}
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                        {categories.find(cat => cat.id === similarVehicle.category)?.name || similarVehicle.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-serif text-xl font-bold text-gray-800 group-hover:text-gold-600 transition-colors duration-300">{similarVehicle.name}</h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-4">
                        <div className="flex items-center gap-1 group/spec">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-hover/spec:bg-gold-100 transition-colors">
                            <Calendar size={14} className="text-gold-500" />
                          </div>
                          <span className="text-xs group-hover/spec:text-gold-600 transition-colors duration-300">{similarVehicle.year}</span>
                        </div>
                        <div className="flex items-center gap-1 group/spec">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-hover/spec:bg-gold-100 transition-colors">
                            <Gauge size={14} className="text-gold-500" />
                          </div>
                          <span className="text-xs group-hover/spec:text-gold-600 transition-colors duration-300">{similarVehicle.features[0]}</span>
                        </div>
                        <div className="flex items-center gap-1 group/spec">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-hover/spec:bg-gold-100 transition-colors">
                            <Users size={14} className="text-gold-500" />
                          </div>
                          <span className="text-xs group-hover/spec:text-gold-600 transition-colors duration-300">5 places</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-gray-500 text-xs uppercase tracking-wider">À partir de</span>
                            <div className="flex items-baseline">
                              <span className="text-xl font-bold text-gold-600">{similarVehicle.price}</span>
                              <span className="text-gold-500 text-sm font-normal ml-1">MAD</span>
                              <span className="text-xs font-normal text-gray-500 ml-1">/jour</span>
                            </div>
                          </div>
                          
                          <Link
                            href={`/vehicules/${similarVehicle.id}`}
                            className="bg-gold-500 hover:bg-gold-600 text-white py-2 px-4 rounded-full transition-all duration-300 shadow-sm hover:shadow-md font-medium flex items-center gap-1 group/btn"
                          >
                            Détails
                            <ArrowRight size={16} className="ml-0.5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl z-50 border border-gray-200 hover:scale-110 ${
          scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-gold-500"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
      
      {/* CSS for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
}