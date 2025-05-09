'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { vehicles } from '@/data/vehicles';
import ReservationForm from '@/components/ui/ReservationForm';
import { ArrowLeft, ArrowRight, Calendar, Users, Fuel, Gauge, Shield, Zap, Check, MapPin, Star, ChevronRight, Share2, Heart } from 'lucide-react';
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
  
  // Handle image navigation
  const nextImage = (): void => {
    setActiveImage((prev) => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = (): void => {
    setActiveImage((prev) => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
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
    <main className="pt-28 pb-20 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex">
            <ol className="flex items-center space-x-1 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <span className="text-gray-600 mx-1">/</span>
              </li>
              <li>
                <Link href="/vehicules" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Véhicules
                </Link>
              </li>
              <li>
                <span className="text-gray-600 mx-1">/</span>
              </li>
              <li>
                <span className="text-gold-400 font-medium">{vehicle.name}</span>
              </li>
            </ol>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Vehicle Images - Take up 3/5 of the width on desktop */}
            <div className={`${isGalleryExpanded ? 'lg:col-span-5' : 'lg:col-span-3'} relative transition-all duration-500`}>
              <div className={`relative ${isGalleryExpanded ? 'h-[70vh]' : 'h-80 sm:h-96 md:h-[600px]'}`}>
                <Image
                  src={vehicle.images[activeImage] || '/images/placeholder-car.jpg'}
                  alt={vehicle.name}
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700"
                />
                
                {/* Image Navigation Controls */}
                {vehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-gold-600 text-white p-3 rounded-full z-10 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                      aria-label="Image précédente"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-gold-600 text-white p-3 rounded-full z-10 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                      aria-label="Image suivante"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </>
                )}
                
                {/* Toggle Gallery Size */}
                <button
                  onClick={() => setIsGalleryExpanded(!isGalleryExpanded)}
                  className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm hover:bg-gold-600 text-white p-2 rounded-md z-10 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                  aria-label={isGalleryExpanded ? "Réduire la galerie" : "Agrandir la galerie"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {isGalleryExpanded ? (
                      <>
                        <polyline points="4 14 10 14 10 20"></polyline>
                        <polyline points="20 10 14 10 14 4"></polyline>
                        <line x1="14" y1="10" x2="21" y2="3"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </>
                    ) : (
                      <>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </>
                    )}
                  </svg>
                </button>
                
                {/* Year Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-gold-600 to-gold-500 text-black px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
                  {vehicle.year}
                </div>
                
                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 to-transparent"></div>
                
                {/* Actions Bar */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2.5 rounded-full transition-all duration-300 ${
                      isFavorite 
                        ? 'bg-red-500 text-white' 
                        : 'bg-black/30 backdrop-blur-sm text-white hover:bg-black/50'
                    }`}
                    aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                  >
                    <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                  <button 
                    className="p-2.5 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300"
                    aria-label="Partager"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              
              {/* Thumbnail Navigation */}
              {vehicle.images.length > 1 && !isGalleryExpanded && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex justify-center">
                  <div className="flex gap-2 bg-black/40 backdrop-blur-sm p-3 rounded-lg">
                    {vehicle.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative w-16 h-12 rounded-md overflow-hidden transition-all duration-300 ${
                          activeImage === index 
                            ? 'ring-2 ring-gold-500 ring-offset-1 ring-offset-black/20 scale-105' 
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
              <div className="lg:col-span-2 p-6 lg:p-10 flex flex-col h-full bg-gray-900 border-l border-gray-800">
                <div className="flex flex-col flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h1 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-0">{vehicle.name}</h1>
                    <div className="flex items-center text-gold-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={18} 
                          fill="currentColor" 
                          className={star < 5 ? "" : "text-gray-600"} 
                        />
                      ))}
                      <span className="ml-2 text-gray-400 text-sm">(4.8)</span>
                    </div>
                  </div>
                  
                  {/* Vehicle Specs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-800 p-4 rounded-lg text-center shadow-sm hover:shadow transition-all duration-300 hover:bg-gray-700 border border-gray-700">
                      <Calendar size={22} className="text-gold-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400">Année</p>
                      <p className="font-medium text-white">{vehicle.year}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg text-center shadow-sm hover:shadow transition-all duration-300 hover:bg-gray-700 border border-gray-700">
                      <Fuel size={22} className="text-gold-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400">Carburant</p>
                      <p className="font-medium text-white">{vehicle.features[0]}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg text-center shadow-sm hover:shadow transition-all duration-300 hover:bg-gray-700 border border-gray-700">
                      <Zap size={22} className="text-gold-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400">Puissance</p>
                      <p className="font-medium text-white">{vehicle.features[1]}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg text-center shadow-sm hover:shadow transition-all duration-300 hover:bg-gray-700 border border-gray-700">
                      <Gauge size={22} className="text-gold-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400">Transmission</p>
                      <p className="font-medium text-white">Automatique</p>
                    </div>
                  </div>
                  
                  {/* Tabs */}
                  <div className="mb-6">
                    <div className="border-b border-gray-800">
                      <nav className="flex -mb-px space-x-8">
                        <button
                          onClick={() => setActiveTab('description')}
                          className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-300 ${
                            activeTab === 'description'
                              ? 'border-gold-500 text-gold-400'
                              : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                          }`}
                        >
                          Description
                        </button>
                        <button
                          onClick={() => setActiveTab('features')}
                          className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-300 ${
                            activeTab === 'features'
                              ? 'border-gold-500 text-gold-400'
                              : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                          }`}
                        >
                          Caractéristiques
                        </button>
                        <button
                          onClick={() => setActiveTab('terms')}
                          className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-300 ${
                            activeTab === 'terms'
                              ? 'border-gold-500 text-gold-400'
                              : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                          }`}
                        >
                          Conditions
                        </button>
                      </nav>
                    </div>
                    
                    <div className="py-6">
                      {activeTab === 'description' && (
                        <div className="animate-fadeIn">
                          <p className="text-gray-300 mb-4 leading-relaxed">
                            {vehicle.description}
                          </p>
                          <p className="text-gray-300 leading-relaxed">
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
                              <Check size={18} className="text-gold-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                              <span className="text-gray-300 group-hover:text-white transition-colors duration-200">{feature}</span>
                            </div>
                          ))}
                          <div className="flex items-center group">
                            <Check size={18} className="text-gold-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-gray-300 group-hover:text-white transition-colors duration-200">Climatisation</span>
                          </div>
                          <div className="flex items-center group">
                            <Check size={18} className="text-gold-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-gray-300 group-hover:text-white transition-colors duration-200">Bluetooth</span>
                          </div>
                          <div className="flex items-center group">
                            <Check size={18} className="text-gold-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-gray-300 group-hover:text-white transition-colors duration-200">GPS</span>
                          </div>
                          <div className="flex items-center group">
                            <Check size={18} className="text-gold-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-gray-300 group-hover:text-white transition-colors duration-200">Régulateur de vitesse</span>
                          </div>
                          <div className="flex items-center group">
                            <Check size={18} className="text-gold-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-gray-300 group-hover:text-white transition-colors duration-200">Capteurs de stationnement</span>
                          </div>
                          <div className="flex items-center group">
                            <Check size={18} className="text-gold-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-gray-300 group-hover:text-white transition-colors duration-200">Système audio premium</span>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'terms' && (
                        <div className="animate-fadeIn">
                          <div className="bg-gray-800 p-5 rounded-lg mb-5 border border-gray-700 shadow-sm">
                            <div className="flex items-start mb-4">
                              <MapPin size={18} className="text-gold-400 mr-3 mt-1 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-white mb-1">Lieu de prise en charge</h4>
                                <p className="text-gray-300 text-sm">
                                  Aéroport de Marrakech Menara, Aéroport de Casablanca, hôtel ou adresse de votre choix
                                </p>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <h4 className="font-medium text-white mb-2">Documents requis</h4>
                              <ul className="text-gray-300 text-sm space-y-2">
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
                          
                          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 shadow-sm">
                            <h4 className="font-medium text-white mb-2 flex items-center">
                              <Shield size={16} className="mr-2 text-gold-400" />
                              Inclus dans le prix
                            </h4>
                            <ul className="text-gray-300 text-sm space-y-2">
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
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 pt-6 border-t border-gray-800">
                    <div className="mb-4 sm:mb-0">
                      <span className="text-gray-400 text-sm font-medium">Prix à partir de</span>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gold-400">{vehicle.price}</span>
                        <span className="text-lg text-gray-300 ml-1 font-normal">MAD/jour</span>
                      </div>
                      <span className="text-xs text-gray-500">Tous taxes incluses</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={scrollToReservation}
                        className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-black py-3 px-6 rounded-md transition-all duration-300 shadow-gold hover:shadow-xl hover:scale-105 flex items-center justify-center font-medium"
                      >
                        Réserver ce véhicule
                      </button>
                      <Link
                        href="/contact"
                        className="bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white py-3 px-6 rounded-md text-center transition-colors font-medium flex items-center justify-center group"
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
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl shadow-sm p-6 flex flex-wrap justify-around items-center gap-6">
          <div className="flex flex-col items-center text-center">
            <Shield className="text-gold-400 mb-3" size={24} />
            <h4 className="font-medium text-white mb-1">Assurance complète</h4>
            <p className="text-gray-400 text-sm">Couverture tous risques incluse</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Calendar className="text-gold-400 mb-3" size={24} />
            <h4 className="font-medium text-white mb-1">Annulation flexible</h4>
            <p className="text-gray-400 text-sm">Sans frais jusqu'à 48h avant</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users className="text-gold-400 mb-3" size={24} />
            <h4 className="font-medium text-white mb-1">Service personnalisé</h4>
            <p className="text-gray-400 text-sm">Assistance 24/7 pendant votre location</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <MapPin className="text-gold-400 mb-3" size={24} />
            <h4 className="font-medium text-white mb-1">Livraison partout</h4>
            <p className="text-gray-400 text-sm">À l'adresse de votre choix au Maroc</p>
          </div>
        </div>
        
        {/* Reservation Form */}
        {showReservation && (
          <div id="reservation-form" className="mt-12 bg-gray-900 rounded-xl shadow-sm p-6 sm:p-10 animate-fadeIn border border-gray-800">
            <div className="mb-8 text-center">
              <h2 className="font-serif text-2xl font-bold text-white mb-2">Réserver {vehicle.name}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Complétez le formulaire ci-dessous pour réserver votre véhicule. Notre équipe vous contactera rapidement pour confirmer votre réservation.
              </p>
            </div>
            <ReservationForm vehicleId={vehicle.id} />
          </div>
        )}
        
        {/* Similar Vehicles */}
        {similarVehicles.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-2xl font-bold text-white">Véhicules similaires</h2>
              <Link 
                href="/vehicules" 
                className="text-gold-400 hover:text-gold-500 font-medium text-sm flex items-center group"
              >
                Voir tous les véhicules
                <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarVehicles.map((similarVehicle) => (
                <div key={similarVehicle.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:translate-y-[-5px] border border-gray-800">
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src={similarVehicle.images[0] || '/images/placeholder-car.jpg'} 
                      alt={similarVehicle.name} 
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-gold-500 text-black px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      {similarVehicle.year}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-medium text-sm line-clamp-2">
                        {similarVehicle.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-400 transition-colors duration-300">{similarVehicle.name}</h3>
                    </div>
                    
                    <div className="flex items-center gap-4 text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} className="text-gold-400" />
                        <span className="text-xs text-gray-400">{similarVehicle.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Gauge size={16} className="text-gold-400" />
                        <span className="text-xs text-gray-400">{similarVehicle.features[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} className="text-gold-400" />
                        <span className="text-xs text-gray-400">5 places</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-800 pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-gray-500 text-xs">À partir de</span>
                          <p className="text-xl font-bold text-gold-400">{similarVehicle.price} MAD<span className="text-sm font-normal">/jour</span></p>
                        </div>
                        <Link
                          href={`/vehicules/${similarVehicle.id}`}
                          className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-black py-2 px-4 rounded-md transition-all duration-300 shadow-sm hover:shadow flex items-center gap-2 text-sm font-medium"
                        >
                          Détails <ArrowRight size={16} />
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
  );
}