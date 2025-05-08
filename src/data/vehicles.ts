// src/data/vehicles.ts
export interface Vehicle {
  id: string;
  name: string;
  year: number;
  category: string;
  price: number;
  images: string[];
  description: string;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export const vehicles: Vehicle[] = [
  {
    id: 'cayenne-turbo-ehybrid',
    name: 'Porsche Cayenne Turbo E-Hybrid Coupe',
    year: 2025,
    category: 'SUV',
    price: 2500, // Prix par jour en MAD
    images: ['/images/cars/cayenne.jpg'],
    description: 'Le nouveau Porsche Cayenne Turbo E-Hybrid Coupe combine performance et écologie avec une puissance exceptionnelle et un design élégant.',
    features: ['Hybride', '680 ch', 'Transmission intégrale', 'Intérieur cuir luxe']
  },
  {
    id: 'range-rover-sport',
    name: 'Range Rover Sport',
    year: 2024,
    category: 'SUV',
    price: 2200,
    images: ['/images/cars/range-rover-sport.jpg'],
    description: 'Le Range Rover Sport 2024 offre une expérience de conduite raffinée avec une technologie de pointe et un confort incomparable.',
    features: ['Diesel/Essence', '350 ch', 'Transmission intégrale', 'Système audio Meridian']
  },
  {
    id: 'renault-clio',
    name: 'Renault Clio 5',
    year: 2024,
    category: 'Citadine',
    price: 650,
    images: ['/images/cars/clio.webp'],
    description: 'La Renault Clio 5 2024 est compacte mais spacieuse, parfaite pour explorer les rues étroites des médinas marocaines.',
    features: ['Essence', '130 ch', 'Écran tactile', 'Caméra de recul']
  },
  {
    id: 'cupra-formentor',
    name: 'Cupra Formentor',
    year: 2024,
    category: 'SUV',
    price: 1700,
    images: ['/images/cars/cupra-formentor.jpg'],
    description: 'Le Cupra Formentor 2024 allie sportivité et praticité dans un SUV compact au caractère affirmé.',
    features: ['Essence', '310 ch', 'Mode Sport', 'Intérieur Alcantara']
  },
  {
    id: 'golf-8',
    name: 'Volkswagen Golf 8',
    year: 2025,
    category: 'Compacte',
    price: 800,
    images: ['/images/cars/S5-gamme--cupra-formentor.jpg'],
    description: 'La Golf 8 2025 représente l\'évolution d\'une icône, avec sa technologie avancée et son design épuré.',
    features: ['Essence/Diesel', '150 ch', 'Cockpit numérique', 'Aide à la conduite']
  },
  {
    id: 'bmw-520d',
    name: 'BMW 520d',
    year: 2024,
    category: 'Berline',
    price: 1900,
    images: ['/images/cars/520d.jpg'],
    description: 'La BMW 520d 2024 est l\'incarnation de l\'élégance et du dynamisme pour vos déplacements professionnels au Maroc.',
    features: ['Diesel', '190 ch', 'Intérieur cuir', 'Technologie BMW iDrive']
  },
  {
    id: 'range-rover-evoque',
    name: 'Range Rover Evoque',
    year: 2024,
    category: 'SUV',
    price: 1800,
    images: ['/images/cars/evoque.webp'],
    description: 'Le Range Rover Evoque 2024 combine design avant-gardiste et capacités tout-terrain pour une expérience de conduite unique.',
    features: ['Essence', '250 ch', 'Toit panoramique', 'Système Terrain Response']
  },
  {
    id: 'range-rover-vogue',
    name: 'Range Rover Vogue',
    year: 2024,
    category: 'SUV',
    price: 2800,
    images: ['/images/cars/vogue.webp'],
    description: 'Le Range Rover Vogue 2024 représente le summum du luxe automobile, alliant confort suprême et technologie de pointe.',
    features: ['Diesel/Essence', '400 ch', 'Cuir Windsor', 'Suspension pneumatique']
  },
  {
    id: 'g63-mercedes',
    name: 'Mercedes G63 AMG',
    year: 2024,
    category: 'SUV',
    price: 3500,
    images: ['/images/cars/g63.jpg'],
    description: 'Le Mercedes G63 AMG 2024 est une icône du luxe tout-terrain, avec une puissance impressionnante et un prestige inégalé.',
    features: ['Essence V8', '585 ch', 'Échappement Sport', 'Intérieur AMG Exclusive']
  },
  {
    id: 'mercedes-cla',
    name: 'Mercedes CLA',
    year: 2024,
    category: 'Coupé',
    price: 1600,
    images: ['/images/cars/cla.jpg'],
    description: 'La Mercedes CLA 2024 séduit par son design coupé élégant et ses performances dynamiques.',
    features: ['Essence', '224 ch', 'MBUX', 'Éclairage d\'ambiance']
  }
];

export const categories: Category[] = [
  { id: 'suv', name: 'SUV', description: 'Véhicules spacieux et polyvalents' },
  { id: 'berline', name: 'Berline', description: 'Confort et élégance pour vos déplacements' },
  { id: 'citadine', name: 'Citadine', description: 'Compactes et agiles pour la ville' },
  { id: 'coupe', name: 'Coupé', description: 'Design sportif et performances' },
  { id: 'cabriolet', name: 'Cabriolet', description: 'Profitez du soleil marocain' }
];