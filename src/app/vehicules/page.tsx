'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { vehicles, categories } from '@/data/vehicles';
import { 
  Sliders, Check, Filter, ChevronDown, Search, 
  Calendar, Users, Gauge, X, ArrowRight,
  ChevronLeft, ChevronRight, Star, Info, Fuel, Settings, Phone
} from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Additional state for enhanced functionality
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [activeVehicle, setActiveVehicle] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  
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
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
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
    <>
      {/* Custom Navigation Bar - matches the regular header but with shadow on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white shadow-lg py-3' : 'bg-white py-5'
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
    
      <main className="pt-28 pb-20 min-h-screen bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header with Background */}
          <div className="relative mb-16 py-20 px-8 rounded-2xl overflow-hidden text-center bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/70 z-10" />
              <Image 
                src="/images/hero/vehicles-header.jpg" 
                alt="Notre Collection" 
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className="object-center opacity-50"
                priority
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 bg-gold-900/50 text-gold-400 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-gold-800/30">
                Notre Collection
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">
                Notre Collection de Véhicules <span className="text-gold-400">d'Exception</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Découvrez notre sélection exclusive de véhicules de luxe disponibles à la location au Maroc
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gold-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 shadow-md transition-all hover:shadow-lg text-center md:text-left"
                placeholder="Rechercher par modèle, caractéristique..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gold-600 transition-colors"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
          
          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-white shadow-lg shadow-gold-500/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 hover:shadow-lg hover:scale-105'
              }`}
            >
              Tous les véhicules
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-white shadow-lg shadow-gold-500/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 hover:shadow-lg hover:scale-105'
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
                className="w-full flex items-center justify-center gap-2 bg-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 group"
              >
                <Filter size={18} className={showFilters ? "text-gold-500" : "text-gray-400"} />
                <span className="group-hover:text-gold-600 transition-colors">
                  {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
                </span>
              </button>
            </div>
            
            {/* Filters Sidebar */}
            <div 
              className={`lg:w-1/4 ${showFilters ? 'block animate-fadeIn' : 'hidden lg:block'} transition-all duration-500`}
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 sticky top-28 border border-gray-200">
                <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800 border-b border-gray-200 pb-4">
                  <Sliders size={20} className="mr-2 text-gold-500" />
                  Filtres
                </h2>
                
                {/* Price Filter */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4 text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                    Prix maximum par jour
                  </h3>
                  <div className="relative mb-6 pt-2">
                    <div className="absolute left-0 right-0 h-1 bg-gray-200 rounded-lg top-0"></div>
                    <input
                      type="range"
                      min="500"
                      max="3500"
                      step="100"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer accent-gold-500 relative z-10"
                    />
                    <div 
                      className="absolute left-0 h-1 bg-gradient-to-r from-gold-600 to-gold-500 rounded-lg top-0" 
                      style={{ width: `${((priceRange - 500) / 3000) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">500 MAD</span>
                    <span className="text-lg font-medium text-gold-600 bg-gold-50 px-3 py-1 rounded-md">
                      {priceRange} MAD
                    </span>
                    <span className="text-sm text-gray-500">3500 MAD</span>
                  </div>
                </div>
                
                {/* Additional Filters */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4 text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                    Options
                  </h3>
                  <div className="space-y-3">
                    {['Climatisation', 'Bluetooth', 'GPS', 'Toit ouvrant'].map((feature) => (
                      <label key={feature} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            checked={features.includes(feature.toLowerCase())}
                            onChange={() => handleFeatureChange(feature.toLowerCase())}
                            className="h-5 w-5 text-gold-500 bg-white border-2 border-gray-300 rounded focus:ring-gold-500 focus:ring-opacity-50 appearance-none checked:bg-gold-500 transition-all"
                          />
                          {features.includes(feature.toLowerCase()) && (
                            <Check size={14} className="text-white absolute pointer-events-none" />
                          )}
                        </div>
                        <span className="text-gray-700 group-hover:text-gold-600 transition-colors duration-200">
                          {feature}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Type de carburant */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4 text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                    Type de carburant
                  </h3>
                  <div className="space-y-3">
                    {['Essence', 'Diesel', 'Hybride', 'Électrique'].map((fuelType) => (
                      <label key={fuelType} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox"
                            checked={fuelTypes.includes(fuelType.toLowerCase())}
                            onChange={() => handleFuelTypeChange(fuelType.toLowerCase())}
                            className="h-5 w-5 text-gold-500 bg-white border-2 border-gray-300 rounded focus:ring-gold-500 focus:ring-opacity-50 appearance-none checked:bg-gold-500 transition-all"
                          />
                          {fuelTypes.includes(fuelType.toLowerCase()) && (
                            <Check size={14} className="text-white absolute pointer-events-none" />
                          )}
                        </div>
                        <span className="text-gray-700 group-hover:text-gold-600 transition-colors duration-200">
                          {fuelType}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Reset Filters Button */}
                <button
                  onClick={resetFilters}
                  className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-medium group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Check size={18} className="mr-1" />
                    Réinitialiser les filtres
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gold-700 to-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-xl"></span>
                </button>
              </div>
            </div>
            
            {/* Vehicles List */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-center border border-gray-200">
                <p className="text-gray-700 mb-4 sm:mb-0 font-medium flex items-center">
                  <span className="bg-gold-100 text-gold-600 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    {filteredVehicles.length}
                  </span>
                  véhicule{filteredVehicles.length !== 1 ? 's' : ''} trouvé{filteredVehicles.length !== 1 ? 's' : ''}
                </p>
                
                <div className="relative">
                  <label htmlFor="sort" className="sr-only">Trier par</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Trier par:</span>
                    <div className="relative">
                      <select
                        id="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="pl-4 pr-10 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all hover:bg-gray-50"
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
              
              {isLoading ? (
                // Loading Skeleton
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 animate-pulse">
                      <div className="h-64 bg-gray-200"></div>
                      <div className="p-6">
                        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                          <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                          <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                        </div>
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="h-4 bg-gray-200 rounded-md w-16 mb-2"></div>
                              <div className="h-6 bg-gray-200 rounded-md w-24"></div>
                            </div>
                            <div className="h-10 bg-gray-200 rounded-md w-24"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredVehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {filteredVehicles.map((vehicle) => (
                    <div 
                      key={vehicle.id} 
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group border border-gray-200 hover:border-gold-200"
                      onMouseEnter={() => setActiveVehicle(vehicle.id)}
                      onMouseLeave={() => setActiveVehicle(null)}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image 
                          src={vehicle.images[0] || '/images/placeholder-car.jpg'} 
                          alt={vehicle.name} 
                          fill
                          style={{ objectFit: 'cover' }}
                          className="group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        
                        {/* Overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                          <p className="text-white text-sm line-clamp-3 mb-4">
                            {vehicle.description}
                          </p>
                          <div className="flex gap-2">
                            {vehicle.features.slice(0, 3).map((feature, index) => (
                              <span key={index} className="bg-white/20 text-xs text-white/90 px-2 py-1 rounded-full backdrop-blur-sm">
                                {feature}
                              </span>
                            ))}
                            {vehicle.features.length > 3 && (
                              <span className="bg-white/20 text-xs text-white/90 px-2 py-1 rounded-full backdrop-blur-sm">
                                +{vehicle.features.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Top badges */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <div className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                            {vehicle.year}
                          </div>
                        </div>
                        
                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <div className="bg-white/80 backdrop-blur-sm text-gold-600 px-3 py-1 rounded-full text-xs font-medium shadow-md border border-gold-200">
                            {categories.find(c => c.id === vehicle.category)?.name || vehicle.category}
                          </div>
                        </div>
                        
                        {/* Quick view button */}
                        <div 
                          className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 ${
                            activeVehicle === vehicle.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                          }`}
                        >
                          <Link
                            href={`/vehicules/${vehicle.id}`}
                            className="bg-white text-gold-600 py-2 px-4 rounded-full text-sm font-medium shadow-lg flex items-center gap-1 hover:bg-gold-50 transition-colors"
                          >
                            <Info size={14} />
                            Voir les détails
                          </Link>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-serif text-xl font-bold text-gray-800 group-hover:text-gold-600 transition-colors duration-300">{vehicle.name}</h3>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                size={14} 
                                className={`${star <= 4 ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-gray-500 mb-4">
                          <div className="flex items-center gap-1 group">
                            <Calendar size={16} className="text-gold-500 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-xs group-hover:text-gold-600 transition-colors duration-300">{vehicle.year}</span>
                          </div>
                          <div className="flex items-center gap-1 group">
                            <Settings size={16} className="text-gold-500 group-hover:rotate-45 transition-transform duration-300" />
                            <span className="text-xs group-hover:text-gold-600 transition-colors duration-300">
                              {vehicle.features.find(f => f.toLowerCase().includes('automatique')) ? 'Auto' : 'Manuel'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 group">
                            <Users size={16} className="text-gold-500 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-xs group-hover:text-gold-600 transition-colors duration-300">5 places</span>
                          </div>
                          <div className="flex items-center gap-1 group">
                            <Fuel size={16} className="text-gold-500 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-xs group-hover:text-gold-600 transition-colors duration-300">
                              {vehicle.features.find(f => 
                                f.toLowerCase().includes('essence') || 
                                f.toLowerCase().includes('diesel') || 
                                f.toLowerCase().includes('électrique') || 
                                f.toLowerCase().includes('hybride')
                              ) || 'Essence'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-gray-500 text-xs uppercase tracking-wider">À partir de</span>
                              <div className="flex items-baseline">
                                <span className="text-2xl font-bold text-gold-600">{vehicle.price}</span>
                                <span className="text-gold-500 text-sm font-normal ml-1">MAD</span>
                                <span className="text-xs font-normal text-gray-500 ml-1">/jour</span>
                              </div>
                            </div>
                            
                            <Link
                              href={`/vehicules/${vehicle.id}`}
                              className="relative overflow-hidden inline-flex items-center bg-gradient-to-r from-gold-600 to-gold-500 text-white py-2.5 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-gold-500/20 font-medium group/btn"
                            >
                              <span className="relative z-10 flex items-center">
                                Détails
                                <ArrowRight size={16} className="ml-1 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                              </span>
                              <span className="absolute inset-0 bg-gradient-to-r from-gold-700 to-gold-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gray-200">
                    <Search size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Aucun véhicule trouvé</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Aucun véhicule ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres pour trouver des options disponibles.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-2.5 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-medium group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <Check size={18} className="mr-1" />
                      Réinitialiser les filtres
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-gold-700 to-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-lg"></span>
                  </button>
                </div>
              )}
              
              {/* Pagination */}
              {filteredVehicles.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <nav className="inline-flex rounded-xl shadow-lg overflow-hidden" aria-label="Pagination">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-3 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      <span className="sr-only">Précédent</span>
                      <ChevronLeft size={16} />
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
                      className="relative inline-flex items-center px-4 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      3
                    </a>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-400">
                      ...
                    </span>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-3 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      <span className="sr-only">Suivant</span>
                      <ChevronRight size={16} />
                    </a>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
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
        
        /* Add custom scrollbar for webkit browsers */
        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        *::-webkit-scrollbar-thumb {
          background-color: #d4d4d4;
          border-radius: 8px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background-color: #d4a030;
        }
      `}</style>
    </>
  );
}