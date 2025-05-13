'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Car, ChevronLeft, ChevronRight, Quote, Star, User } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  carRented?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sophie Laurent',
    location: 'Paris, France',
    avatar: '/images/testimonials/avatar1.jpg',
    rating: 5,
    text: "Un service impeccable du début à la fin. La Range Rover était en parfait état et le staff a été très attentionné. Je recommande vivement cette agence pour tous vos déplacements au Maroc.",
    carRented: 'Range Rover Sport'
  },
  {
    id: 2,
    name: 'James Wilson',
    location: 'London, UK',
    avatar: '/images/testimonials/avatar2.jpg',
    rating: 5,
    text: "Louer le G63 pour notre road trip dans l'Atlas était la meilleure décision. Une expérience incroyable! Le véhicule était en parfait état et le service client exceptionnel.",
    carRented: 'Mercedes G63 AMG'
  },
  {
    id: 3,
    name: 'Ahmed Benali',
    location: 'Dubaï, UAE',
    avatar: '/images/testimonials/avatar3.jpg',
    rating: 5,
    text: "Prix raisonnable pour une qualité de service exceptionnelle. La livraison à l'aéroport était parfaite et le véhicule exactement comme sur les photos. Je recommande vivement pour tout séjour au Maroc.",
    carRented: 'Porsche Cayenne'
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    location: 'Madrid, Spain',
    avatar: '/images/testimonials/avatar4.jpg',
    rating: 4,
    text: "Très satisfaite de mon expérience. La BMW était confortable et parfaite pour notre voyage à Marrakech. Le seul petit bémol est le temps d'attente à la récupération du véhicule.",
    carRented: 'BMW X5'
  },
  {
    id: 5,
    name: 'John Doe',
    location: 'New York, USA',
    avatar: '/images/testimonials/avatar5.jpg',
    rating: 5,
    text: "Service exceptionnel! La Bentley Continental était magnifique et a rendu notre séjour au Maroc vraiment spécial. Le personnel était professionnel et courtois.",
    carRented: 'Bentley Continental GT'
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayInterval = 8000; // 8 seconds per testimonial

  // Handle intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.2 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);

  // Handle autoplay
  useEffect(() => {
    if (!autoplay || !isInView) {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
      return;
    }
    
    autoplayTimerRef.current = setTimeout(() => {
      nextTestimonial();
    }, autoplayInterval);
    
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [activeIndex, autoplay, isInView]);

  const nextTestimonial = () => {
    setPrevIndex(activeIndex);
    setDirection('right');
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setPrevIndex(activeIndex);
    setDirection('left');
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const goToTestimonial = (index: number) => {
    if (index === activeIndex) return;
    
    setPrevIndex(activeIndex);
    setDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
    setAutoplay(false);
    
    // Restart autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  return (
    <section 
      ref={testimonialsRef} 
      className="py-24 bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/20 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-gold-400 rounded-full opacity-5 blur-3xl"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 border border-gold-500/10 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 border border-gold-500/10 rounded-full"></div>
      <Quote className="absolute top-20 right-10 w-32 h-32 text-gold-500/5 transform rotate-180" />
      <Quote className="absolute bottom-20 left-10 w-40 h-40 text-gold-500/5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="inline-block px-4 py-1 bg-gold-800/30 text-gold-400 rounded-full text-sm font-medium mb-4">
            Témoignages Clients
          </span>
          <h2 className="font-serif text-4xl font-bold mb-4">
            Ce que nos clients <span className="text-gold-400">disent</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-white/80 max-w-3xl mx-auto">
            Découvrez les expériences de nos clients qui ont choisi notre service pour leurs aventures au Maroc
          </p>
        </div>
        
        {/* Testimonial Slider */}
        <div className="relative">
          <div className="overflow-hidden relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-700 ease-in-out absolute w-full ${
                  index === activeIndex 
                    ? 'opacity-100 transform translate-x-0 z-20' 
                    : index === prevIndex
                      ? `opacity-0 transform ${direction === 'right' ? '-translate-x-full' : 'translate-x-full'} z-10`
                      : 'opacity-0 z-0'
                }`}
                style={{ 
                  display: index === activeIndex || index === prevIndex ? 'block' : 'none',
                  transitionDelay: index === activeIndex ? '0ms' : '0ms'
                }}
              >
                <div className="max-w-4xl mx-auto">
                  <div className="relative">
                    <Quote className="absolute -top-10 -left-6 w-24 h-24 text-gold-500/30 transform -rotate-6" />
                    
                    <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-2xl p-8 shadow-xl border border-gold-500/10 backdrop-blur-sm transform perspective-1000 hover:rotate-0 transition-all duration-500">
                      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        {/* Avatar */}
                        <div className="relative group">
                          <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-gold-500/30 flex-shrink-0 shadow-lg shadow-gold-500/10 transition-transform duration-300 group-hover:scale-105">
                            {testimonial.avatar ? (
                              <Image
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="96px"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gold-800 flex items-center justify-center">
                                <User size={36} className="text-white" />
                              </div>
                            )}
                          </div>
                          
                          {/* Decorative Circle */}
                          <div className="absolute -inset-2 border border-dashed border-gold-500/20 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                          {/* Rating Stars */}
                          <div className="flex justify-center md:justify-start mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${i < testimonial.rating ? 'text-gold-400 fill-gold-400' : 'text-gray-600'} mr-1`} 
                              />
                            ))}
                          </div>
                          
                          {/* Testimonial Quote */}
                          <blockquote className="text-lg md:text-xl text-white/90 font-light italic mb-6 relative">
                            <span className="text-gold-500 text-4xl absolute -top-4 -left-2 opacity-50">"</span>
                            <span className="relative z-10">{testimonial.text}</span>
                            <span className="text-gold-500 text-4xl absolute -bottom-10 -right-2 opacity-50">"</span>
                          </blockquote>
                          
                          {/* Author Info */}
                          <div>
                            <h4 className="font-bold text-xl text-white">{testimonial.name}</h4>
                            <p className="text-gray-400 text-sm mb-2">{testimonial.location}</p>
                            
                            {testimonial.carRented && (
                              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-500/20 text-gold-300">
                                <Car size={12} className="mr-1" />
                                {testimonial.carRented}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-10">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="bg-charcoal-800 hover:bg-gold-600 text-white p-3 rounded-full transition-all duration-300 shadow-md hover:shadow-gold-500/30 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-opacity-50 group"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft size={24} className="transform group-hover:-translate-x-0.5 transition-transform duration-300" />
            </button>
            
            {/* Dot Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-3 rounded-full transition-all duration-500 ${
                    index === activeIndex 
                      ? 'bg-gold-500 w-10 shadow-lg shadow-gold-500/30' 
                      : 'bg-gray-600 hover:bg-gray-500 w-3'
                  }`}
                  aria-label={`Voir le témoignage ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : 'false'}
                />
              ))}
            </div>
            
            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="bg-charcoal-800 hover:bg-gold-600 text-white p-3 rounded-full transition-all duration-300 shadow-md hover:shadow-gold-500/30 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-opacity-50 group"
              aria-label="Témoignage suivant"
            >
              <ChevronRight size={24} className="transform group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </div>
          
          {/* Autoplay Progress Indicator */}
          {autoplay && isInView && (
            <div className="w-full max-w-xs mx-auto mt-8">
              <div className="h-0.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gold-500 rounded-full transition-all duration-100 ease-linear"
                  style={{ 
                    animation: `autoplayProgress ${autoplayInterval}ms linear`,
                    animationPlayState: autoplay && isInView ? 'running' : 'paused',
                    animationFillMode: 'forwards',
                    animationIterationCount: 1
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes autoplayProgress {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </section>
  );
}