import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import PageLoader from '@/components/client/PageLoader';
import WhatsAppButton from '@/components/client/WhatsAppButton';
import BackToTopButton from '@/components/client/BackToTopButton';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Luxury Car Rental Morocco | Location de Voitures de Luxe',
  description: 'Découvrez notre flotte exclusive de véhicules de luxe disponibles à la location au Maroc. Des voitures haut de gamme pour une expérience de conduite unique.',
  keywords: 'location voiture luxe, maroc, luxury car rental, marrakech, casablanca, rabat, agadir',
  authors: [{ name: 'Luxury Cars Morocco' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://luxurycarsmorocco.com',
    title: 'Luxury Car Rental Morocco | Location de Voitures de Luxe',
    description: 'Découvrez notre flotte exclusive de véhicules de luxe disponibles à la location au Maroc',
    siteName: 'Luxury Cars Morocco',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Cars Morocco'
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans text-charcoal-800 bg-white antialiased">
        {/* Page Loader - Client Component */}
        <PageLoader />
        
        {/* Sticky Header */}
        <Navigation />
        
        {/* WhatsApp Button - Client Component */}
        <WhatsAppButton />
        
        {/* Back to Top Button - Client Component */}
        <BackToTopButton />
        
        {/* Main Content */}
        <main className="min-h-screen overflow-hidden">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  );
}