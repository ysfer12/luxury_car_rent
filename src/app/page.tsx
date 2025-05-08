import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Shield, Clock, MapPin } from 'lucide-react';

export default function Home(): JSX.Element {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Replace with an actual luxury car image */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="relative h-full w-full">
            <Image
              src="/images/hero/luxury-car-hero.jpg"
              alt="Luxury Cars Morocco"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Expérience de Conduite <br />
            <span className="text-gold-400">Inégalée au Maroc</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Notre collection exclusive de véhicules de luxe vous attend pour des aventures mémorables à travers le Maroc
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vehicules"
              className="bg-gold-500 hover:bg-gold-600 text-white py-3 px-8 rounded-md transition-all shadow-gold hover:shadow-lg font-medium tracking-wide"
            >
              Découvrir nos véhicules
            </Link>
            <Link
              href="/reservation"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white py-3 px-8 rounded-md transition-all border border-white/30 font-medium tracking-wide"
            >
              Réserver maintenant
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/40 flex items-center justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-charcoal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-5/12 mb-10 md:mb-0">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Pourquoi Choisir <span className="text-gold-400">Notre Service</span>?</h2>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                Nous vous offrons bien plus qu'une simple location de voiture. Notre service premium vous garantit une expérience sans faille, du premier contact jusqu'à la fin de votre aventure.
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-white rounded-md transition-colors tracking-wide"
              >
                En savoir plus
              </Link>
            </div>
            
            <div className="md:w-6/12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-charcoal-800/80 backdrop-blur-sm p-6 rounded-lg border-l-2 border-gold-500 hover:shadow-xl transition-all">
                <Calendar className="text-gold-400 mb-4" size={28} />
                <h3 className="text-xl font-bold mb-2">Réservation Flexible</h3>
                <p className="text-white/70">Modifiez ou annulez votre réservation sans frais jusqu'à 48h avant.</p>
              </div>
              
              <div className="bg-charcoal-800/80 backdrop-blur-sm p-6 rounded-lg border-l-2 border-gold-500 hover:shadow-xl transition-all">
                <Shield className="text-gold-400 mb-4" size={28} />
                <h3 className="text-xl font-bold mb-2">Assurance Premium</h3>
                <p className="text-white/70">Tous nos véhicules sont couverts par une assurance tous risques complète.</p>
              </div>
              
              <div className="bg-charcoal-800/80 backdrop-blur-sm p-6 rounded-lg border-l-2 border-gold-500 hover:shadow-xl transition-all">
                <Clock className="text-gold-400 mb-4" size={28} />
                <h3 className="text-xl font-bold mb-2">Service 24/7</h3>
                <p className="text-white/70">Notre équipe est disponible à tout moment pour vous assister.</p>
              </div>
              
              <div className="bg-charcoal-800/80 backdrop-blur-sm p-6 rounded-lg border-l-2 border-gold-500 hover:shadow-xl transition-all">
                <MapPin className="text-gold-400 mb-4" size={28} />
                <h3 className="text-xl font-bold mb-2">Livraison Partout</h3>
                <p className="text-white/70">Nous livrons votre véhicule à l'adresse de votre choix au Maroc.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Cars Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-charcoal-800">Notre Collection <span className="text-gold-600">Exclusive</span></h2>
            <p className="text-charcoal-600 text-lg">
              Découvrez notre sélection de véhicules de luxe pour une expérience de conduite incomparable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Car Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/images/cars/porsche-cayenne.jpg" 
                  alt="Porsche Cayenne Turbo E-Hybrid Coupe" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-500"
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
                  <h3 className="font-serif text-xl font-bold text-charcoal-800">Porsche Cayenne</h3>
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
                    className="bg-charcoal-800 hover:bg-charcoal-900 text-white py-2 px-4 rounded-md transition-colors text-sm"
                  >
                    Détails
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Car Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/images/cars/range-rover-sport.jpg" 
                  alt="Range Rover Sport" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-500"
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
                  <h3 className="font-serif text-xl font-bold text-charcoal-800">Range Rover Sport</h3>
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
                    className="bg-charcoal-800 hover:bg-charcoal-900 text-white py-2 px-4 rounded-md transition-colors text-sm"
                  >
                    Détails
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Car Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/images/cars/g63-mercedes.jpg" 
                  alt="Mercedes G63 AMG" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-500"
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
                  <h3 className="font-serif text-xl font-bold text-charcoal-800">Mercedes G63 AMG</h3>
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
                    className="bg-charcoal-800 hover:bg-charcoal-900 text-white py-2 px-4 rounded-md transition-colors text-sm"
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
              className="inline-block bg-gold-500 hover:bg-gold-600 text-white py-3 px-8 rounded-md transition-all shadow-gold hover:shadow-lg font-medium tracking-wide"
            >
              Voir tous nos véhicules
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-charcoal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ce que nos clients <span className="text-gold-400">disent</span></h2>
            <p className="text-white/80">
              Découvrez les expériences de nos clients qui ont choisi notre service pour leurs aventures au Maroc
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center font-bold text-white text-xl">
                  S
                </div>
                <div className="ml-4">
                  <p className="font-medium">Sophie Laurent</p>
                  <p className="text-white/60 text-sm">Paris, France</p>
                </div>
              </div>
              <p className="text-white/80 italic mb-4">
                "Un service impeccable du début à la fin. La Range Rover était en parfait état et le staff a été très attentionné."
              </p>
              <div className="flex text-gold-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center font-bold text-white text-xl">
                  J
                </div>
                <div className="ml-4">
                  <p className="font-medium">James Wilson</p>
                  <p className="text-white/60 text-sm">London, UK</p>
                </div>
              </div>
              <p className="text-white/80 italic mb-4">
                "Louer le G63 pour notre road trip dans l'Atlas était la meilleure décision. Une expérience incroyable!"
              </p>
              <div className="flex text-gold-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center font-bold text-white text-xl">
                  A
                </div>
                <div className="ml-4">
                  <p className="font-medium">Ahmed Benali</p>
                  <p className="text-white/60 text-sm">Dubaï, UAE</p>
                </div>
              </div>
              <p className="text-white/80 italic mb-4">
                "Prix raisonnable pour une qualité de service exceptionnelle. Je recommande vivement pour tout séjour au Maroc."
              </p>
              <div className="flex text-gold-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10" />
          <div className="relative h-full w-full">
            <Image
              src="/images/cta-background.jpg"
              alt="Luxury Cars Morocco"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">
            Prêt pour une<br />
            <span className="text-gold-400">Expérience Inoubliable</span> au Maroc?
          </h2>
          <p className="text-white/90 text-xl max-w-2xl mx-auto mb-8">
            Réservez dès maintenant et explorez le Maroc en grand style avec le véhicule de vos rêves
          </p>
          <Link
            href="/reservation"
            className="inline-block bg-gold-500 hover:bg-gold-600 text-white py-3 px-8 rounded-md transition-all shadow-gold hover:shadow-lg font-medium tracking-wide"
          >
            Réserver votre véhicule
          </Link>
        </div>
      </section>
    </main>
  );
}