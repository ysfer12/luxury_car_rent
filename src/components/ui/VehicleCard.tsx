'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, Gauge, Star } from 'lucide-react';
import { Vehicle } from '@/data/vehicles';
import { JSX } from 'react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps): JSX.Element {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={vehicle.images[0] || '/images/placeholder-car.jpg'}
          alt={vehicle.name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          {vehicle.year}
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center text-white mb-1 text-sm">
              <Star size={14} className="text-gold-400 fill-gold-400 mr-1" />
              <span>Premium</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-gold-600 transition-colors">{vehicle.name}</h3>
        
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-gold-500" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} className="text-gold-500" />
            <span>5 places</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge size={16} className="text-gold-500" />
            <span>Auto</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-500 text-sm">À partir de</span>
            <p className="text-xl font-bold text-gold-600">{vehicle.price} MAD<span className="text-sm font-normal">/jour</span></p>
          </div>
          
          <Link
            href={`/vehicules/${vehicle.id}`}
            className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-2 px-4 rounded transition-all duration-300 shadow-sm hover:shadow-gold"
          >
            Détails
          </Link>
        </div>
      </div>
    </div>
  );
}