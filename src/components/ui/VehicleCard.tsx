'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, Gauge, Star, ArrowRight, Info } from 'lucide-react';
import { Vehicle } from '@/data/vehicles';
import { JSX, useState } from 'react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={vehicle.images[0] || '/images/placeholder-car.jpg'}
          alt={vehicle.name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-1000 ease-out scale-100 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Year Badge */}
        <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm">
          {vehicle.year}
        </div>
        
        {/* Premium Badge */}
        <div className="absolute top-4 left-4 bg-black/80 text-gold-400 px-3 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-sm flex items-center">
          <Star size={12} className="text-gold-400 fill-gold-400 mr-1" />
          <span>Premium</span>
        </div>
        
        {/* Dark Overlay on Hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500"
          style={{ opacity: isHovered ? 0.9 : 0 }}
        />
        
        {/* Quick View Button (appears on hover) */}
        <div 
          className="absolute bottom-4 left-0 right-0 flex justify-center transform transition-all duration-500"
          style={{ 
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(20px)' 
          }}
        >
          <Link
            href={`/vehicules/${vehicle.id}`}
            className="bg-white/90 backdrop-blur-sm text-gold-800 py-2 px-4 rounded-full text-sm font-medium shadow-sm hover:bg-gold-500 hover:text-white transition-colors duration-300 flex items-center"
          >
            <Info size={14} className="mr-1" />
            Voir les détails
          </Link>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        {/* Title */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold group-hover:text-gold-600 transition-colors">
            {vehicle.name}
          </h3>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={14} 
                className={`text-gold-400 ${star <= 4 ? 'fill-gold-400' : ''}`} 
              />
            ))}
          </div>
        </div>
        
        {/* Specs Icons with Tooltips */}
        <div className="flex items-center gap-4 text-gray-600 mb-5">
          <div className="group relative cursor-help">
            <div className="flex items-center gap-1 text-sm">
              <Calendar size={16} className="text-gold-500" />
              <span>{vehicle.year}</span>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-charcoal-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              Année du modèle
              <svg className="absolute text-charcoal-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon></svg>
            </div>
          </div>
          
          <div className="group relative cursor-help">
            <div className="flex items-center gap-1 text-sm">
              <Users size={16} className="text-gold-500" />
              <span>5 places</span>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-charcoal-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              Capacité de passagers
              <svg className="absolute text-charcoal-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon></svg>
            </div>
          </div>
          
          <div className="group relative cursor-help">
            <div className="flex items-center gap-1 text-sm">
              <Gauge size={16} className="text-gold-500" />
              <span>Auto</span>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-charcoal-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              Transmission automatique
              <svg className="absolute text-charcoal-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon></svg>
            </div>
          </div>
        </div>

        {/* Progress Bar Features (Optional stylish addition) */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Confort</span>
            <div className="w-2/3 bg-gray-200 rounded-full h-1.5">
              <div className="bg-gold-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
            </div>
            <span className="text-gold-600 font-medium">9/10</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Performance</span>
            <div className="w-2/3 bg-gray-200 rounded-full h-1.5">
              <div className="bg-gold-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <span className="text-gold-600 font-medium">8.5/10</span>
          </div>
        </div>
        
        {/* Price and Action Button */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wider">À partir de</span>
            <p className="text-xl font-bold">
              <span className="text-gold-600">{vehicle.price}</span>
              <span className="text-gray-400 text-sm font-normal ml-1">MAD</span>
              <span className="text-xs font-normal text-gray-500">/jour</span>
            </p>
          </div>
          
          <Link
            href={`/vehicules/${vehicle.id}`}
            className="inline-flex items-center bg-gradient-to-r from-gold-600 to-gold-500 text-white py-2 px-4 rounded transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-gold-500/20 group/btn relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center font-medium">
              Détails
              <ArrowRight size={14} className="ml-1 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-gold-700 to-gold-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}