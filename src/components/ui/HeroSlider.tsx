'use client';

import { useState, useEffect, JSX } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface SlideData {
  image: string;
  title: string;
  subtitle: string;
}

const slides: SlideData[] = [
  {
    image: '/images/hero/slide1.jpg',
    title: 'Location de Voitures de Luxe au Maroc',
    subtitle: 'Découvrez notre gamme exceptionnelle de véhicules premium'
  },
  {
    image: '/images/hero/slide2.jpg',
    title: 'Expérience de Conduite Ultime',
    subtitle: 'Des véhicules d\'exception pour des moments inoubliables'
  },
  {
    image: '/images/hero/slide3.jpg',
    title: 'Explorez le Maroc avec Style',
    subtitle: 'De Marrakech à Casablanca, voyagez avec élégance'
  }
];

export default function HeroSlider(): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative h-full w-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
            <p className="text-xl md:text-2xl max-w-3xl">{slide.subtitle}</p>
            <button className="mt-8 bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-md transition-colors">
              Réserver Maintenant
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-30"
        aria-label="Précédent"
      >
        <ArrowLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-30"
        aria-label="Suivant"
      >
        <ArrowRight size={24} />
      </button>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}