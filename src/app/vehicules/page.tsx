'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { vehicles, categories } from '@/data/vehicles';
import { Sliders, Check, Filter, ChevronDown, Search } from 'lucide-react';
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
  }, [selectedCategory, priceRange, sort, searchTerm]);
  
  // Set initial category from URL
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  return (
    <main className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-charcoal-800 mb-4">
            Notre Collection de Véhicules <span className="text-gold-600">d'Exception</span>
          </h1>
          <p className="text-charcoal-600 text-lg max-w-3xl mx-auto">
            Découvrez notre sélection exclusive de véhicules de luxe disponibles à la location au Maroc
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              placeholder="Rechercher par modèle, caractéristique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-gold-500 text-white shadow-gold'
                : 'bg-white text-charcoal-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Tous les véhicules
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-gold-500 text-white shadow-gold'
                  : 'bg-white text-charcoal-700 hover:bg-gray-100 border border-gray-200'
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
              className="w-full flex items-center justify-center gap-2 bg-white py-3 px-4 rounded-md shadow-sm hover:shadow transition-all"
            >
              <Filter size={18} className={showFilters ? "text-gold-600" : ""} />
              {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
            </button>
          </div>
          
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center text-charcoal-800">
                <Sliders size={20} className="mr-2 text-gold-600" />
                Filtres
              </h2>
              
              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="font-medium mb-4 text-charcoal-700">Prix maximum par jour</h3>
                <div className="mb-2">
                  <input
                    type="range"
                    min="500"
                    max="3500"
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />
                </div>
                <div className="flex justify-between text-sm text-charcoal-600">
                  <span>500 MAD</span>
                  <span className="font-medium text-gold-600">{priceRange} MAD</span>
                </div>
              </div>
              
              {/* Additional Filters */}
              <div className="mb-8">
                <h3 className="font-medium mb-4 text-charcoal-700">Options</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="h-5 w-5 text-gold-500 border-2 border-gray-300 rounded focus:ring-gold-500 focus:ring-opacity-50"
                    />
                    <span className="text-charcoal-700 group-hover:text-charcoal-900">Climatisation</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="h-5 w-5 text-gold-500 border-2 border-gray-300 rounded focus:ring-gold-500 focus:ring-opacity-50"
                    />
                    <span className="text-charcoal-700 group-hover:text-charcoal-900">Bluetooth</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="h-5 w-5 text-gold-500 border-2 border-gray-300 rounded focus:ring-gold-500 focus:ring-opacity-50"
                    />
                    <span className="text-charcoal-700 group-hover:text-charcoal-900">GPS</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="h-5 w-5 text-gold-500 border-2 border-gray-300 rounded focus:ring-gold-500 focus:ring-opacity-50"
                    />
                    <span className="text-charcoal-700 group-hover:text-charcoal-900">Toit ouvrant</span>
                  </label>
                </div>
              </div>
              
              {/* Type de carburant */}
              <div className="mb-8">
                <h3 className="font-medium mb-4 text-charcoal-700">Type de carburant</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="h-5 w-5 text-gold-500 border-2 border-gray-300 rounded focus:ring-gold-500 focus:ring-opacity-50"
                    />
                    <span className="text-charcoal-700 group-hover:text-charcoal-900">Essence</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="h-5 w-5 text-gold-500 border-2 border-gray-300 rounded focus:ring-gold-500 focus:ring-opacity-50"
                    />
                    <span className="text-charcoal-700 group-hover:text-charcoal-900">Diesel</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="h-5 w-5 text-gold-500 border-2 border-gray-300 rounded focus:ring-gold-500 focus:ring-opacity-50"
                    />
                    <span className="text-charcoal-700 group-hover:text-charcoal-900">Hybride</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="h-5 w-5 text-gold-500 border-2 border-gray-300 rounded focus:ring-gold-500 focus:ring-opacity-50"
                    />
                    <span className="text-charcoal-700 group-hover:text-charcoal-900">Électrique</span>
                  </label>
                </div>
              </div>
              
              {/* Reset Filters Button */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange(3500);
                  setSearchTerm('');
                }}
                className="w-full bg-charcoal-800 hover:bg-charcoal-900 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <Check size={18} />
                Réinitialiser les filtres
              </button>
            </div>
          </div>
          
          {/* Vehicles List */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-charcoal-700 mb-4 sm:mb-0">
                {filteredVehicles.length} véhicule{filteredVehicles.length !== 1 ? 's' : ''} trouvé{filteredVehicles.length !== 1 ? 's' : ''}
              </p>
              
              <div className="relative">
                <label htmlFor="sort" className="sr-only">Trier par</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-charcoal-600">Trier par:</span>
                  <div className="relative">
                    <select
                      id="sort"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="pl-4 pr-10 py-2 text-charcoal-700 bg-gray-50 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    >
                      <option value="price-asc">Prix croissant</option>
                      <option value="price-desc">Prix décroissant</option>
                      <option value="year-desc">Année (récent d'abord)</option>
                      <option value="name-asc">Nom (A-Z)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-charcoal-600">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                    <div className="relative h-56 overflow-hidden">
                      <Image 
                        src={vehicle.images[0] || '/images/placeholder-car.jpg'} 
                        alt={vehicle.name} 
                        fill
                        style={{ objectFit: 'cover' }}
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {vehicle.year}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-white font-medium text-sm line-clamp-2">
                          {vehicle.description}
                        </p>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-serif text-xl font-bold text-charcoal-800">{vehicle.name}</h3>
                      </div>
                      <div className="flex items-center text-xs text-charcoal-600 mb-4 space-x-3">
                        <span>{vehicle.features[0]}</span>
                        <span>•</span>
                        <span>{vehicle.features[1]}</span>
                        <span>•</span>
                        <span>{vehicle.category}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-charcoal-500 text-xs">À partir de</span>
                          <p className="text-xl font-bold text-gold-600">{vehicle.price} MAD<span className="text-sm font-normal">/jour</span></p>
                        </div>
                        <Link
                          href={`/vehicules/${vehicle.id}`}
                          className="bg-charcoal-800 hover:bg-charcoal-900 text-white py-2 px-4 rounded-md transition-colors text-sm"
                        >
                          Détails
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-charcoal-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-charcoal-800">Aucun véhicule trouvé</h3>
                <p className="text-charcoal-600 mb-6 max-w-md mx-auto">
                  Aucun véhicule ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres pour trouver des options disponibles.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange(3500);
                    setSearchTerm('');
                  }}
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white py-2 px-6 rounded-md transition-colors"
                >
                  <Check size={18} />
                  Réinitialiser les filtres
                </button>
              </div>
            )}
            
            {/* Pagination (for future implementation) */}
            {filteredVehicles.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-charcoal-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Précédent</span>
                    {/* Previous icon */}
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="relative inline-flex items-center px-4 py-2 border border-gold-500 bg-gold-50 text-sm font-medium text-gold-600"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-charcoal-500 hover:bg-gray-50"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-charcoal-500 hover:bg-gray-50"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-charcoal-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Suivant</span>
                    {/* Next icon */}
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