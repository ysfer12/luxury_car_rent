'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { vehicles, categories } from '@/data/vehicles';
import { Sliders, Check, Filter, ChevronDown, Search, Calendar, Users, Gauge, X, ArrowRight } from 'lucide-react';
import { Vehicle } from '@/data/vehicles';

export default function VehiclesPage(): JSX.Element {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [priceRange, setPriceRange] = useState<number>(3500); // Maximum price
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('price-asc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Additional state for enhanced functionality
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  
  const handleFuelTypeChange = (fuelType: string) => {
    setFuelTypes(prev => 
      prev.includes(fuelType) 
        ? prev.filter(type => type !== fuelType) 
        : [...prev, fuelType]
    );
  };
  
  const handleFeatureChange = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature) 
        : [...prev, feature]
    );
  };
  
  useEffect(() => {
    // Apply filters
    let result = vehicles;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(vehicle => 
        vehicle.name.toLowerCase().includes(term) || 
        vehicle.description.toLowerCase().includes(term) ||
        vehicle.features.some(feature => feature.toLowerCase().includes(term))
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((vehicle) => 
        vehicle.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by price
    result = result.filter((vehicle) => vehicle.price <= priceRange);
    
    // Filter by fuel types if any selected
    if (fuelTypes.length > 0) {
      // This is a placeholder implementation - you'd need to adapt this
      // to how your actual vehicle data stores fuel type information
      result = result.filter(vehicle => 
        fuelTypes.some(fuelType => 
          vehicle.features.some(feature => 
            feature.toLowerCase().includes(fuelType.toLowerCase())
          )
        )
      );
    }
    
    // Filter by features if any selected
    if (features.length > 0) {
      result = result.filter(vehicle => 
        features.every(selectedFeature => 
          vehicle.features.some(feature => 
            feature.toLowerCase().includes(selectedFeature.toLowerCase())
          )
        )
      );
    }
    
    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-desc':
          return b.year - a.year;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    
    setFilteredVehicles(result);
  }, [selectedCategory, priceRange, sort, searchTerm, fuelTypes, features]);
  
  // Set initial category from URL
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange(3500);
    setSearchTerm('');
    setFuelTypes([]);
    setFeatures([]);
  };

  return (
    <main className="pt-28 pb-20 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header with Background */}
        <div className="relative mb-16 py-16 px-8 rounded-2xl overflow-hidden text-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70 z-10" />
            <Image 
              src="/images/hero/vehicles-header.jpg" 
              alt="Notre Collection" 
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="object-center opacity-50"
              priority
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
              Notre Collection de Véhicules <span className="text-gold-400">d'Exception</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Découvrez notre sélection exclusive de véhicules de luxe disponibles à la location au Maroc
            </p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gold-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md leading-5 bg-gray-900 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 shadow-sm transition-all hover:shadow-md"
              placeholder="Rechercher par modèle, caractéristique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gold-600"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        
        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-black shadow-gold'
                : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-700 hover:shadow'
            }`}
          >
            Tous les véhicules
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-black shadow-gold'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-700 hover:shadow'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Toggle - Mobile */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 py-3 px-4 rounded-md shadow-sm hover:shadow transition-all border border-gray-800"
            >
              <Filter size={18} className={showFilters ? "text-gold-600" : "text-gray-400"} />
              {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
            </button>
          </div>
          
          {/* Filters Sidebar */}
          <div 
            className={`lg:w-1/4 ${showFilters ? 'block animate-fadeIn' : 'hidden lg:block'} transition-all duration-300`}
          >
            <div className="bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 sticky top-28 border border-gray-800">
              <h2 className="text-xl font-bold mb-6 flex items-center text-white border-b border-gray-800 pb-3">
                <Sliders size={20} className="mr-2 text-gold-500" />
                Filtres
              </h2>
              
              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="font-medium mb-4 text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Prix maximum par jour
                </h3>
                <div className="mb-3">
                  <input
                    type="range"
                    min="500"
                    max="3500"
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>500 MAD</span>
                  <span className="font-medium text-gold-500">{priceRange} MAD</span>
                </div>
              </div>
              
              {/* Additional Filters */}
              <div className="mb-8">
                <h3 className="font-medium mb-4 text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Options
                </h3>
                <div className="space-y-3">
                  {['Climatisation', 'Bluetooth', 'GPS', 'Toit ouvrant'].map((feature) => (
                    <label key={feature} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={features.includes(feature.toLowerCase())}
                        onChange={() => handleFeatureChange(feature.toLowerCase())}
                        className="h-5 w-5 text-gold-500 bg-gray-800 border-2 border-gray-700 rounded focus:ring-gold-500 focus:ring-opacity-50"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                        {feature}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Type de carburant */}
              <div className="mb-8">
                <h3 className="font-medium mb-4 text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Type de carburant
                </h3>
                <div className="space-y-3">
                  {['Essence', 'Diesel', 'Hybride', 'Électrique'].map((fuelType) => (
                    <label key={fuelType} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={fuelTypes.includes(fuelType.toLowerCase())}
                        onChange={() => handleFuelTypeChange(fuelType.toLowerCase())}
                        className="h-5 w-5 text-gold-500 bg-gray-800 border-2 border-gray-700 rounded focus:ring-gold-500 focus:ring-opacity-50"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                        {fuelType}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-black py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow font-medium"
              >
                <Check size={18} />
                Réinitialiser les filtres
              </button>
            </div>
          </div>
          
          {/* Vehicles List */}
          <div className="lg:w-3/4">
            <div className="bg-gray-900 rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center border border-gray-800">
              <p className="text-gray-300 mb-4 sm:mb-0 font-medium">
                {filteredVehicles.length} véhicule{filteredVehicles.length !== 1 ? 's' : ''} trouvé{filteredVehicles.length !== 1 ? 's' : ''}
              </p>
              
              <div className="relative">
                <label htmlFor="sort" className="sr-only">Trier par</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Trier par:</span>
                  <div className="relative">
                    <select
                      id="sort"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="pl-4 pr-10 py-2 text-white bg-gray-800 border border-gray-700 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all hover:bg-gray-700"
                    >
                      <option value="price-asc">Prix croissant</option>
                      <option value="price-desc">Prix décroissant</option>
                      <option value="year-desc">Année (récent d'abord)</option>
                      <option value="name-asc">Nom (A-Z)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:translate-y-[-5px] border border-gray-800">
                    <div className="relative h-64 overflow-hidden">
                      <Image 
                        src={vehicle.images[0] || '/images/placeholder-car.jpg'} 
                        alt={vehicle.name} 
                        fill
                        style={{ objectFit: 'cover' }}
                        className="group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-gold-500 text-black px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        {vehicle.year}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-white font-medium text-sm line-clamp-2">
                          {vehicle.description}
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-400 transition-colors duration-300">{vehicle.name}</h3>
                      </div>
                      
                      <div className="flex items-center gap-4 text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} className="text-gold-500" />
                          <span className="text-xs">{vehicle.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Gauge size={16} className="text-gold-500" />
                          <span className="text-xs">{vehicle.features[0]}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={16} className="text-gold-500" />
                          <span className="text-xs">5 places</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-800 pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-gray-400 text-xs">À partir de</span>
                            <p className="text-xl font-bold text-gold-400">{vehicle.price} MAD<span className="text-sm font-normal">/jour</span></p>
                          </div>
                          <Link
                            href={`/vehicules/${vehicle.id}`}
                            className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-black py-2 px-4 rounded-md transition-all duration-300 shadow-sm hover:shadow-gold font-medium flex items-center gap-2 text-sm"
                          >
                            Détails <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-900 rounded-xl shadow-sm p-12 text-center border border-gray-800">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gray-700">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Aucun véhicule trouvé</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Aucun véhicule ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres pour trouver des options disponibles.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-black py-2.5 px-6 rounded-md transition-all duration-300 shadow-sm hover:shadow font-medium"
                >
                  <Check size={18} />
                  Réinitialiser les filtres
                </button>
              </div>
            )}
            
            {/* Pagination (for future implementation) */}
            {filteredVehicles.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-700 bg-gray-900 text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    <span className="sr-only">Précédent</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="relative inline-flex items-center px-4 py-2 border border-gold-500 bg-gray-800 text-sm font-medium text-gold-400"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-900 text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-900 text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-900 text-sm font-medium text-gray-400">
                    ...
                  </span>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-700 bg-gray-900 text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    <span className="sr-only">Suivant</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}