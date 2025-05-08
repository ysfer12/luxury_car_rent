'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { vehicles } from '@/data/vehicles';
import ReservationForm from '@/components/ui/ReservationForm';
import { ArrowLeft, ArrowRight, Calendar, Users, Fuel, Gauge, Shield, Zap, Check, MapPin, Star } from 'lucide-react';
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

  // Find similar vehicles
  const similarVehicles = vehicles
    .filter((v) => v.category === vehicle.category && v.id !== vehicle.id)
    .slice(0, 3);

  return (
    <main className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex">
            <ol className="flex items-center space-x-1 text-sm">
              <li>
                <Link href="/" className="text-charcoal-500 hover:text-gold-600 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <span className="text-charcoal-400 mx-1">/</span>
              </li>
              <li>
                <Link href="/vehicules" className="text-charcoal-500 hover:text-gold-600 transition-colors">
                  Véhicules
                </Link>
              </li>
              <li>
                <span className="text-charcoal-400 mx-1">/</span>
              </li>
              <li>
                <span className="text-charcoal-900 font-medium">{vehicle.name}</span>
              </li>
            </ol>
          </nav>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Vehicle Images */}
            <div className="relative lg:order-1">
              <div className="relative h-72 sm:h-96 md:h-[550px]">
                <Image
                  src={vehicle.images[activeImage] || '/images/placeholder-car.jpg'}
                  alt={vehicle.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="lg:rounded-tl-xl"
                />
                
                {vehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full z-10 transition-colors"
                      aria-label="Image précédente"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full z-10 transition-colors"
                      aria-label="Image suivante"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </>
                )}
                
                <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                  {vehicle.year}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              
              {vehicle.images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-center">
                  <div className="flex gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                    {vehicle.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative w-12 h-12 rounded-md overflow-hidden transition-all ${
                          activeImage === index 
                            ? 'ring-2 ring-gold-500 ring-offset-1 ring-offset-white/20' 
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
            
            {/* Vehicle Details */}
            <div className="p-6 lg:p-10 flex flex-col h-full">
              <div className="flex flex-col flex-grow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-2 md:mb-0">{vehicle.name}</h1>
                  <div className="flex items-center text-gold-500">
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" className="text-gold-200" />
                    <span className="ml-2 text-charcoal-600 text-sm">(4.8)</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Calendar size={22} className="text-gold-500 mx-auto mb-2" />
                    <p className="text-xs text-charcoal-500">Année</p>
                    <p className="font-medium text-charcoal-800">{vehicle.year}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Fuel size={22} className="text-gold-500 mx-auto mb-2" />
                    <p className="text-xs text-charcoal-500">Carburant</p>
                    <p className="font-medium text-charcoal-800">{vehicle.features[0]}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Zap size={22} className="text-gold-500 mx-auto mb-2" />
                    <p className="text-xs text-charcoal-500">Puissance</p>
                    <p className="font-medium text-charcoal-800">{vehicle.features[1]}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Gauge size={22} className="text-gold-500 mx-auto mb-2" />
                    <p className="text-xs text-charcoal-500">Transmission</p>
                    <p className="font-medium text-charcoal-800">Automatique</p>
                  </div>
                </div>
                
                {/* Tabs */}
                <div className="mb-6">
                  <div className="border-b border-gray-200">
                    <nav className="flex -mb-px space-x-6">
                      <button
                        onClick={() => setActiveTab('description')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                          activeTab === 'description'
                            ? 'border-gold-500 text-gold-600'
                            : 'border-transparent text-charcoal-500 hover:text-charcoal-700 hover:border-gray-300'
                        }`}
                      >
                        Description
                      </button>
                      <button
                        onClick={() => setActiveTab('features')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                          activeTab === 'features'
                            ? 'border-gold-500 text-gold-600'
                            : 'border-transparent text-charcoal-500 hover:text-charcoal-700 hover:border-gray-300'
                        }`}
                      >
                        Caractéristiques
                      </button>
                      <button
                        onClick={() => setActiveTab('terms')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                          activeTab === 'terms'
                            ? 'border-gold-500 text-gold-600'
                            : 'border-transparent text-charcoal-500 hover:text-charcoal-700 hover:border-gray-300'
                        }`}
                      >
                        Conditions
                      </button>
                    </nav>
                  </div>
                  
                  <div className="py-6">
                    {activeTab === 'description' && (
                      <div>
                        <p className="text-charcoal-700 mb-4 leading-relaxed">
                          {vehicle.description}
                        </p>
                        <p className="text-charcoal-700 leading-relaxed">
                          Profitez d'une expérience de conduite incomparable au Maroc avec ce véhicule d'exception. 
                          Que ce soit pour un voyage d'affaires, des vacances en famille ou une escapade romantique, 
                          cette voiture vous garantit confort, sécurité et élégance.
                        </p>
                      </div>
                    )}
                    
                    {activeTab === 'features' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                        {vehicle.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <Check size={18} className="text-gold-500 mr-3 flex-shrink-0" />
                            <span className="text-charcoal-700">{feature}</span>
                          </div>
                        ))}
                        <div className="flex items-center">
                          <Check size={18} className="text-gold-500 mr-3 flex-shrink-0" />
                          <span className="text-charcoal-700">Climatisation</span>
                        </div>
                        <div className="flex items-center">
                          <Check size={18} className="text-gold-500 mr-3 flex-shrink-0" />
                          <span className="text-charcoal-700">Bluetooth</span>
                        </div>
                        <div className="flex items-center">
                          <Check size={18} className="text-gold-500 mr-3 flex-shrink-0" />
                          <span className="text-charcoal-700">GPS</span>
                        </div>
                        <div className="flex items-center">
                          <Check size={18} className="text-gold-500 mr-3 flex-shrink-0" />
                          <span className="text-charcoal-700">Régulateur de vitesse</span>
                        </div>
                        <div className="flex items-center">
                          <Check size={18} className="text-gold-500 mr-3 flex-shrink-0" />
                          <span className="text-charcoal-700">Capteurs de stationnement</span>
                        </div>
                        <div className="flex items-center">
                          <Check size={18} className="text-gold-500 mr-3 flex-shrink-0" />
                          <span className="text-charcoal-700">Système audio premium</span>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'terms' && (
                      <div>
                        <div className="flex items-start mb-4">
                          <MapPin size={18} className="text-gold-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-charcoal-800 mb-1">Lieu de prise en charge</h4>
                            <p className="text-charcoal-600 text-sm">
                              Aéroport de Marrakech Menara, Aéroport de Casablanca, hôtel ou adresse de votre choix
                            </p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-medium text-charcoal-800 mb-2">Documents requis</h4>
                          <ul className="text-charcoal-600 text-sm space-y-2">
                            <li className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></span>
                              Permis de conduire valide (permis international pour les non-résidents)
                            </li>
                            <li className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></span>
                              Pièce d'identité ou passeport
                            </li>
                            <li className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></span>
                              Carte de crédit au nom du conducteur principal
                            </li>
                          </ul>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-medium text-charcoal-800 mb-2">Inclus dans le prix</h4>
                          <ul className="text-charcoal-600 text-sm space-y-2">
                            <li className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></span>
                              Kilométrage illimité
                            </li>
                            <li className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></span>
                              Assurance tous risques
                            </li>
                            <li className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></span>
                              Assistance 24/7
                            </li>
                            <li className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></span>
                              Livraison et reprise du véhicule
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 pt-6 border-t border-gray-200">
                  <div className="mb-4 sm:mb-0">
                    <span className="text-charcoal-500 text-sm">Prix à partir de</span>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gold-600">{vehicle.price}</span>
                      <span className="text-lg text-charcoal-600 ml-1 font-normal">MAD/jour</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setShowReservation(!showReservation)}
                      className="bg-gold-500 hover:bg-gold-600 text-white py-3 px-6 rounded-md transition-colors shadow-gold hover:shadow-lg flex items-center justify-center font-medium"
                    >
                      {showReservation ? 'Masquer le formulaire' : 'Réserver ce véhicule'}
                    </button>
                    <Link
                      href="/contact"
                      className="bg-white border border-gray-300 hover:bg-gray-50 text-charcoal-800 py-3 px-6 rounded-md text-center transition-colors font-medium"
                    >
                      Nous contacter
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reservation Form */}
        {showReservation && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6 sm:p-10 animate-fadeIn">
            <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-6 text-center">Réserver {vehicle.name}</h2>
            <ReservationForm vehicleId={vehicle.id} />
          </div>
        )}
        
        {/* Similar Vehicles */}
        {similarVehicles.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-8">Véhicules similaires</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarVehicles.map((similarVehicle) => (
                <div key={similarVehicle.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src={similarVehicle.images[0] || '/images/placeholder-car.jpg'} 
                      alt={similarVehicle.name} 
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {similarVehicle.year}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-medium text-sm line-clamp-2">
                        {similarVehicle.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-serif text-xl font-bold text-charcoal-800">{similarVehicle.name}</h3>
                    </div>
                    <div className="flex items-center text-xs text-charcoal-600 mb-4 space-x-3">
                      <span>{similarVehicle.features[0]}</span>
                      <span>•</span>
                      <span>{similarVehicle.features[1]}</span>
                      <span>•</span>
                      <span>{similarVehicle.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-charcoal-500 text-xs">À partir de</span>
                        <p className="text-xl font-bold text-gold-600">{similarVehicle.price} MAD<span className="text-sm font-normal">/jour</span></p>
                      </div>
                      <Link
                        href={`/vehicules/${similarVehicle.id}`}
                        className="bg-charcoal-800 hover:bg-charcoal-900 text-white py-2 px-4 rounded-md transition-colors text-sm"
                      >
                        Détails
                      </Link>
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