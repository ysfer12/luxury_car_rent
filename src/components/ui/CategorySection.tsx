'use client';

import { JSX, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/vehicles';
import { ArrowRight } from 'lucide-react';

export default function CategorySection(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-200 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-100 rounded-full opacity-30 blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="inline-block px-4 py-1 bg-gold-100 text-gold-800 rounded-full text-sm font-medium mb-4">
            Nos Véhicules
          </span>
          <h2 className="text-4xl font-serif font-bold text-center mb-4">Nos Catégories de Véhicules</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre sélection exclusive de véhicules adaptés à tous vos besoins, du confort à la performance
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-300 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-full transition-all duration-500 shadow-sm hover:shadow relative overflow-hidden group ${
                activeCategory === category.id
                  ? 'bg-gold-500 text-white shadow-gold-500/20'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="relative z-10">{category.name}</span>
              {activeCategory !== category.id && (
                <span className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-0 group-hover:opacity-100"></span>
              )}
            </button>
          ))}
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-700 hover:shadow-xl group ${
                activeCategory === category.id 
                  ? 'scale-100 opacity-100 transform translate-y-0 ring-2 ring-gold-500/20' 
                  : 'scale-95 opacity-40 transform translate-y-4 filter grayscale'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={`/images/categories/${category.id}.jpg`}
                  alt={category.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Hidden Quick Action */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="font-light text-white/80 text-sm">
                    {category.id === activeCategory ? 'Découvrez notre sélection' : 'Cliquez pour découvrir'}
                  </span>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gold-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  {category.name}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-gold-600 transition-colors flex items-center">
                  {category.name}
                  {activeCategory === category.id && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                  )}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{category.description}</p>
                <Link
                  href={`/vehicules?category=${category.id}`}
                  className="inline-flex items-center group/link"
                >
                  <span className="relative overflow-hidden">
                    <span className="relative z-10 inline-flex items-center bg-gradient-to-r from-gold-600 to-gold-500 text-white py-2.5 px-5 rounded transition-all duration-300 shadow-sm group-hover/link:shadow-md group-hover/link:shadow-gold-500/20">
                      Découvrir
                      <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-gold-700 to-gold-600 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 origin-left rounded"></span>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/vehicules"
            className="inline-flex items-center text-gold-600 hover:text-gold-800 font-medium group"
          >
            <span>Voir tous nos véhicules</span>
            <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
            <span className="block h-0.5 w-0 bg-gold-500 group-hover:w-full transition-all duration-500 mt-0.5"></span>
          </Link>
        </div>
      </div>
    </section>
  );
}