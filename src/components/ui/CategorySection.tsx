'use client';

import { JSX, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/vehicles';

export default function CategorySection(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-serif font-bold text-center mb-4">Nos Catégories de Véhicules</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Découvrez notre sélection exclusive de véhicules adaptés à tous vos besoins, du confort à la performance
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow ${
                activeCategory === category.id
                  ? 'bg-gold-500 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl ${
                activeCategory === category.id 
                  ? 'scale-100 opacity-100 transform translate-y-0' 
                  : 'scale-95 opacity-50 transform translate-y-4'
              }`}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={`/images/categories/${category.id}.jpg`}
                  alt={category.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Link
                  href={`/vehicules?category=${category.id}`}
                  className="inline-block bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-2.5 px-5 rounded transition-all duration-300 shadow-sm hover:shadow-gold"
                >
                  Découvrir
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}