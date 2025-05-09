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
    image: '/images/hero/slide1.avif',
    title: 'Location de Voitures de Luxe au Maroc',
    subtitle: 'Découvrez notre gamme exceptionnelle de véhicules premium'
  },
  {
    image: '/images/hero/slide2.avif',
    title: 'Expérience de Conduite Ultime',
    subtitle: 'Des véhicules d\'exception pour des moments inoubliables'
  },
  {
    image: '/images/hero/slide3.avif',
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />
          <div className="relative h-full w-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
              className="transform scale-105 animate-slowZoom"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl animate-fadeInUp animation-delay-200">
              {slide.subtitle}
            </p>
            <button className="mt-8 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-3 px-8 rounded-md transition-all duration-300 shadow-gold hover:shadow-xl hover:scale-105 animate-fadeInUp animation-delay-400">
              Réserver Maintenant
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-gold-600 text-white p-3 rounded-full z-30 transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label="Précédent"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-gold-600 text-white p-3 rounded-full z-30 transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label="Suivant"
      >
        <ArrowRight size={20} />
      </button>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-gold-500 w-10 shadow-gold' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}