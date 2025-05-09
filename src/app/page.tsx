import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Shield, Clock, MapPin, CheckCircle, Car, ChevronRight } from 'lucide-react';
import HeroSlider from '@/components/ui/HeroSlider';
import TestimonialsSection from '@/components/ui/TestimonialsSection';
import CategorySection from '@/components/ui/CategorySection';

export default function Home(): JSX.Element {
  return (
    <>
      {/* Hero Slider Section */}
      <HeroSlider />
      
      {/* Luxury Badges Section */}
      <section className="py-8 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center mb-3 shadow-sm">
                <Car size={32} className="text-gold-500" />
              </div>
              <h3 className="text-charcoal-800 font-medium">Véhicules Premium</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center mb-3 shadow-sm">
                <Shield size={32} className="text-gold-500" />
              </div>
              <h3 className="text-charcoal-800 font-medium">Assurance Complète</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center mb-3 shadow-sm">
                <Clock size={32} className="text-gold-500" />
              </div>
              <h3 className="text-charcoal-800 font-medium">Service 24/7</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center mb-3 shadow-sm">
                <MapPin size={32} className="text-gold-500" />
              </div>
              <h3 className="text-charcoal-800 font-medium">Livraison Partout</h3>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Intro */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-charcoal-800">
                L'Excellence dans la <span className="text-gold-600">Location de Luxe</span>
              </h2>
              <p className="text-charcoal-600 mb-6 leading-relaxed">
                Depuis plus de 10 ans, Luxury Cars Morocco s'engage à offrir une expérience de location automobile exceptionnelle. Notre flotte premium comprend les modèles les plus prestigieux du marché, méticuleusement entretenus pour garantir votre satisfaction et votre sécurité.
              </p>
              <p className="text-charcoal-600 mb-8 leading-relaxed">
                Que vous soyez en voyage d'affaires ou en vacances, nous vous proposons le véhicule parfait pour rendre votre séjour au Maroc mémorable.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                <div className="flex items-center">
                  <CheckCircle size={18} className="text-gold-500 mr-2 flex-shrink-0" />
                  <span className="text-charcoal-700">Service personnalisé</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="text-gold-500 mr-2 flex-shrink-0" />
                  <span className="text-charcoal-700">Véhicules récents</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="text-gold-500 mr-2 flex-shrink-0" />
                  <span className="text-charcoal-700">Kilométrage illimité</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="text-gold-500 mr-2 flex-shrink-0" />
                  <span className="text-charcoal-700">Assistance routière</span>
                </div>
              </div>
              
              <Link
                href="/about"
                className="inline-flex items-center text-gold-600 font-medium hover:text-gold-700 transition-colors"
              >
                En savoir plus
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
            
            <div className="md:w-1/2 order-1 md:order-2 relative">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="/images/about/luxury-experience.avif" 
                  alt="Luxury Experience"
                  width={600}
                  height={400}
                  className="w-full object-cover h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gold-500 rounded-lg transform rotate-12 opacity-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section
      <CategorySection /> */}
      
      {/* Featured Cars Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-400 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gold-500 rounded-full opacity-5 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-charcoal-800">
              Notre Collection <span className="text-gold-600">Exclusive</span>
            </h2>
            <p className="text-charcoal-600 text-lg">
              Découvrez notre sélection de véhicules de luxe pour une expérience de conduite incomparable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Car Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:translate-y-[-5px]">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/images/cars/cayenne.jpg" 
                  alt="Porsche Cayenne Turbo E-Hybrid Coupe" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-medium">
                    Le nouveau Porsche Cayenne Turbo E-Hybrid Coupe allie puissance et élégance
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-serif text-xl font-bold text-charcoal-800 group-hover:text-gold-600 transition-colors">Porsche Cayenne</h3>
                  <span className="text-xs font-semibold bg-gold-100 text-gold-800 py-1 px-2 rounded">2025</span>
                </div>
                <div className="flex items-center text-sm text-charcoal-600 mb-4 space-x-4">
                  <span>Hybride</span>
                  <span>•</span>
                  <span>680 ch</span>
                  <span>•</span>
                  <span>SUV</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-charcoal-500 text-xs">À partir de</span>
                    <p className="text-xl font-bold text-gold-600">2500 MAD<span className="text-sm font-normal">/jour</span></p>
                  </div>
                  <Link
                    href="/vehicules/cayenne-turbo-ehybrid"
                    className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-2 px-4 rounded-md transition-all duration-300 shadow-sm hover:shadow-gold"
                  >
                    Détails
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Car Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:translate-y-[-5px]">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/images/cars/range-rover-sport.jpg" 
                  alt="Range Rover Sport" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-medium">
                    Confort exceptionnel et capacités tout-terrain impressionnantes
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-serif text-xl font-bold text-charcoal-800 group-hover:text-gold-600 transition-colors">Range Rover Sport</h3>
                  <span className="text-xs font-semibold bg-gold-100 text-gold-800 py-1 px-2 rounded">2024</span>
                </div>
                <div className="flex items-center text-sm text-charcoal-600 mb-4 space-x-4">
                  <span>Diesel</span>
                  <span>•</span>
                  <span>350 ch</span>
                  <span>•</span>
                  <span>SUV</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-charcoal-500 text-xs">À partir de</span>
                    <p className="text-xl font-bold text-gold-600">2200 MAD<span className="text-sm font-normal">/jour</span></p>
                  </div>
                  <Link
                    href="/vehicules/range-rover-sport"
                    className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-2 px-4 rounded-md transition-all duration-300 shadow-sm hover:shadow-gold"
                  >
                    Détails
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Car Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:translate-y-[-5px]">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/images/cars/g63.jpg" 
                  alt="Mercedes G63 AMG" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-medium">
                    L'icône du luxe tout-terrain avec une puissance impressionnante
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-serif text-xl font-bold text-charcoal-800 group-hover:text-gold-600 transition-colors">Mercedes G63 AMG</h3>
                  <span className="text-xs font-semibold bg-gold-100 text-gold-800 py-1 px-2 rounded">2024</span>
                </div>
                <div className="flex items-center text-sm text-charcoal-600 mb-4 space-x-4">
                  <span>Essence V8</span>
                  <span>•</span>
                  <span>585 ch</span>
                  <span>•</span>
                  <span>SUV</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-charcoal-500 text-xs">À partir de</span>
                    <p className="text-xl font-bold text-gold-600">3500 MAD<span className="text-sm font-normal">/jour</span></p>
                  </div>
                  <Link
                    href="/vehicules/g63-mercedes"
                    className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-2 px-4 rounded-md transition-all duration-300 shadow-sm hover:shadow-gold"
                  >
                    Détails
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/vehicules"
              className="inline-block bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-3 px-8 rounded-md transition-all duration-300 shadow-gold hover:shadow-xl hover:scale-105 font-medium"
            >
              Voir tous nos véhicules
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 bg-charcoal-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/images/pattern-dark.png')] opacity-5"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-gold-400 rounded-full opacity-5 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">
              Pourquoi Choisir <span className="text-gold-400">Notre Service</span>?
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              Nous vous offrons bien plus qu'une simple location de voiture. Notre service premium vous garantit une expérience sans faille.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-charcoal-800/60 backdrop-blur-sm p-8 rounded-xl border-l-2 border-gold-500 hover:shadow-xl hover:shadow-gold-900/10 transition-all hover:translate-y-[-5px]">
              <Calendar className="text-gold-400 mb-6" size={36} />
              <h3 className="text-xl font-bold mb-3">Réservation Flexible</h3>
              <p className="text-white/70">
                Modifiez ou annulez votre réservation sans frais jusqu'à 48h avant la date de prise en charge. Nos conditions de location sont transparentes et avantageuses.
              </p>
            </div>
            
            <div className="bg-charcoal-800/60 backdrop-blur-sm p-8 rounded-xl border-l-2 border-gold-500 hover:shadow-xl hover:shadow-gold-900/10 transition-all hover:translate-y-[-5px]">
              <Shield className="text-gold-400 mb-6" size={36} />
              <h3 className="text-xl font-bold mb-3">Assurance Premium</h3>
              <p className="text-white/70">
                Tous nos véhicules sont couverts par une assurance tous risques complète. Voyagez en toute sérénité avec une protection optimale tout au long de votre séjour.
              </p>
            </div>
            
            <div className="bg-charcoal-800/60 backdrop-blur-sm p-8 rounded-xl border-l-2 border-gold-500 hover:shadow-xl hover:shadow-gold-900/10 transition-all hover:translate-y-[-5px]">
              <Clock className="text-gold-400 mb-6" size={36} />
              <h3 className="text-xl font-bold mb-3">Service 24/7</h3>
              <p className="text-white/70">
                Notre équipe est disponible à tout moment pour vous assister. Un problème, une question ? Nous sommes là pour vous aider et garantir votre satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-charcoal-800">
              Comment Ça <span className="text-gold-600">Fonctionne</span>
            </h2>
            <p className="text-charcoal-600 max-w-3xl mx-auto">
              Réserver votre véhicule de luxe n'a jamais été aussi simple. Suivez ces étapes pour une expérience sans tracas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-gold-500">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-charcoal-800">Choisissez votre véhicule</h3>
                <p className="text-charcoal-600">
                  Parcourez notre collection et sélectionnez le véhicule qui correspond à vos besoins et vos envies.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 10H38M38 10L29 1M38 10L29 19" stroke="#DCAF23" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-gold-500">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-charcoal-800">Réservez en ligne</h3>
                <p className="text-charcoal-600">
                  Complétez notre formulaire de réservation simple et sécurisé en indiquant vos dates et informations.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 10H38M38 10L29 1M38 10L29 19" stroke="#DCAF23" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-gold-500">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-charcoal-800">Récupérez & Profitez</h3>
                <p className="text-charcoal-600">
                  Récupérez votre véhicule à l'endroit de votre choix et profitez de votre expérience de conduite luxueuse.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/reservation"
              className="inline-block bg-gold-500 hover:bg-gold-600 text-white py-3 px-8 rounded-md transition-all duration-300 shadow-gold hover:shadow-xl hover:scale-105 font-medium"
            >
              Réserver maintenant
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/70 z-10" />
          <div className="relative h-full w-full">
            <Image
              src="/images/cta-background.jpg"
              alt="Luxury Cars Morocco"
              fill
              style={{ objectFit: 'cover' }}
              className="object-center"
            />
          </div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt pour une<br />
              <span className="text-gold-400">Expérience Inoubliable</span> au Maroc?
            </h2>
            <p className="text-white/90 text-xl max-w-2xl mx-auto mb-8">
              Réservez dès maintenant et explorez le Maroc en grand style avec le véhicule de vos rêves
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/vehicules"
                className="bg-white hover:bg-gray-100 text-charcoal-800 py-3 px-8 rounded-md transition-all shadow-lg hover:shadow-xl font-medium"
              >
                Voir les véhicules
              </Link>
              <Link
                href="/reservation"
                className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 text-white py-3 px-8 rounded-md transition-all shadow-gold hover:shadow-xl font-medium"
              >
                Réserver maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}