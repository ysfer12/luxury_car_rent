'use client';

import { JSX, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/vehicles';

export default function CategorySection(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Catégories de Véhicules</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-200'
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
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                activeCategory === category.id ? 'scale-100 opacity-100' : 'scale-95 opacity-50'
              }`}
            >
              <div className="relative h-64">
                <Image
                  src={`/images/categories/${category.id}.jpg`}
                  alt={category.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Link
                  href={`/vehicules?category=${category.id}`}
                  className="inline-block bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
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