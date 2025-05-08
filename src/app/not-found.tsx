import Link from 'next/link';
import { JSX } from 'react';

export default function NotFound(): JSX.Element {
  return (
    <main className="pt-24 pb-16 flex items-center justify-center min-h-[70vh]">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page introuvable</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Nous sommes désolés, mais la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-md transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}