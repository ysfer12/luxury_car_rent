'use client';

import { useState, useEffect, useRef, JSX } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [progressWidth, setProgressWidth] = useState<number>(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const slideDuration = 6000; // 6 seconds per slide
  const transitionDuration = 1000; // 1 second transition

  const startProgressBar = (): void => {
    // Reset progress
    setProgressWidth(0);
    
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // Update every 30ms for smooth animation
    const intervalTime = 30;
    const increment = (intervalTime / slideDuration) * 100;
    
    progressIntervalRef.current = setInterval(() => {
      setProgressWidth((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);
  };

  useEffect(() => {
    // Start progress animation
    startProgressBar();
    
    // Set up timer for automatic slides
    const slideInterval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, slideDuration);
    
    // Clean up on component unmount
    return () => {
      clearInterval(slideInterval);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentSlide, isTransitioning]);

  const nextSlide = (): void => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    // Reset transition lock after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      startProgressBar();
    }, transitionDuration);
  };

  const prevSlide = (): void => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
      startProgressBar();
    }, transitionDuration);
  };

  const goToSlide = (index: number): void => {
    if (index === currentSlide || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
      startProgressBar();
    }, transitionDuration);
  };

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={index !== currentSlide}
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
          
          {/* Slide Image */}
          <div className="relative h-full w-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center',
                transform: `scale(${index === currentSlide ? '1.05' : '1'})`, 
                transition: 'transform 7s ease-out, opacity 1s ease-in-out'
              }}
              className={index === currentSlide ? 'animate-ken-burns' : ''}
            />
          </div>
          
          {/* Slide Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
            <div className={`transform transition-all duration-1000 ${
              index === currentSlide 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h1>
            </div>
            
            <div className={`max-w-3xl transform transition-all duration-1000 ${
              index === currentSlide 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-md">
                {slide.subtitle}
              </p>
            </div>
            
            <div className={`transform transition-all duration-1000 ${
              index === currentSlide 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              <Link 
                href="/reservation"
                className="group relative overflow-hidden inline-flex items-center bg-gradient-to-r from-gold-600 to-gold-500 text-white py-3 px-8 rounded-md shadow-lg hover:shadow-xl hover:shadow-gold-500/20 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center font-medium">
                  Réserver Maintenant
                  <ChevronRight size={18} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-gold-700 to-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-gold-600 text-white p-3 rounded-full z-30 transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-opacity-50 group"
        aria-label="Précédent"
        disabled={isTransitioning}
      >
        <ArrowLeft size={20} className="transform group-hover:-translate-x-0.5 transition-transform duration-300" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-gold-600 text-white p-3 rounded-full z-30 transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-opacity-50 group"
        aria-label="Suivant"
        disabled={isTransitioning}
      >
        <ArrowRight size={20} className="transform group-hover:translate-x-0.5 transition-transform duration-300" />
      </button>

      {/* Bottom Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center z-30">
        {/* Progress Bar */}
        <div className="w-1/3 max-w-md h-0.5 bg-white/30 rounded-full mb-6 overflow-hidden">
          <div 
            className="h-full bg-gold-500 rounded-full"
            style={{ width: `${progressWidth}%`, transition: 'width 30ms linear' }}
          ></div>
        </div>
      
        {/* Dot Indicators */}
        <div className="flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-gold-500 w-10 shadow-gold-500/50 shadow-sm' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Aller à la diapositive ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
      
      {/* Number Indicators (optional) */}
      <div className="absolute bottom-8 right-8 text-white z-30 hidden md:flex items-center space-x-2">
        <span className="text-3xl font-bold text-gold-500">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="text-white/60">/</span>
        <span className="text-white/60">{String(slides.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
}