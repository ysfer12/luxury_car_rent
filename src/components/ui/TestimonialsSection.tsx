'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

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
  const [autoplay, setAutoplay] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Handle autoplay
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex, autoplay]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
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
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false);
    // Restart autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  return (
    <section ref={testimonialsRef} className="py-20 bg-gradient-to-b from-charcoal-900 to-charcoal-800 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/20 to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-gold-400 rounded-full opacity-5 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-bold mb-4">
            Ce que nos clients <span className="text-gold-400">disent</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Découvrez les expériences de nos clients qui ont choisi notre service pour leurs aventures au Maroc
          </p>
        </motion.div>
        
        <div className="relative">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              index === activeIndex && (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="relative">
                    <Quote className="absolute -top-10 -left-6 w-24 h-24 text-gold-500/30 transform -rotate-6" />
                    
                    <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-2xl p-8 shadow-xl border border-gold-500/10">
                      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-gold-500/30 flex-shrink-0 shadow-gold">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex justify-center md:justify-start mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${i < testimonial.rating ? 'text-gold-400 fill-gold-400' : 'text-gray-400'} mr-1`} 
                              />
                            ))}
                          </div>
                          
                          <blockquote className="text-lg md:text-xl text-white/90 font-light italic mb-6">
                            "{testimonial.text}"
                          </blockquote>
                          
                          <div>
                            <h4 className="font-bold text-xl text-white">{testimonial.name}</h4>
                            <p className="text-gray-400 text-sm">{testimonial.location}</p>
                            
                            {testimonial.carRented && (
                              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-500/20 text-gold-300">
                                <Car size={12} className="mr-1" />
                                {testimonial.carRented}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-10">
            <motion.button
              onClick={prevTestimonial}
              className="bg-charcoal-800 hover:bg-gold-600 text-white p-3 rounded-full transition-all duration-300 shadow-md hover:shadow-gold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onFocus={() => setAutoplay(false)}
              onBlur={() => setAutoplay(true)}
            >
              <ChevronLeft size={24} />
            </motion.button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-3 rounded-full transition-all duration-500 ${
                    index === activeIndex 
                      ? 'bg-gold-500 w-10 shadow-gold' 
                      : 'bg-gray-600 hover:bg-gray-500 w-3'
                  }`}
                  aria-label={`Voir le témoignage ${index + 1}`}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextTestimonial}
              className="bg-charcoal-800 hover:bg-gold-600 text-white p-3 rounded-full transition-all duration-300 shadow-md hover:shadow-gold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onFocus={() => setAutoplay(false)}
              onBlur={() => setAutoplay(true)}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}