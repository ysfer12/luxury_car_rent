'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, Gauge } from 'lucide-react';
import { Vehicle } from '@/data/vehicles';
import { JSX } from 'react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps): JSX.Element {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-56">
        <Image
          src={vehicle.images[0] || '/images/placeholder-car.jpg'}
          alt={vehicle.name}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {vehicle.year}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
        
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>5 places</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge size={16} />
            <span>Auto</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-500">À partir de</span>
            <p className="text-xl font-bold text-red-600">{vehicle.price} MAD<span className="text-sm font-normal">/jour</span></p>
          </div>
          
          <Link
            href={`/vehicules/${vehicle.id}`}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
          >
            Détails
          </Link>
        </div>
      </div>
    </div>
  );
}