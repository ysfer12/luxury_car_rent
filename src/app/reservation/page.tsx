import Image from 'next/image';
import ReservationForm from '@/components/ui/ReservationForm';
import { JSX } from 'react';

export default function ReservationPage(): JSX.Element {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Réservation de Véhicule</h1>
          <p className="text-gray-600 text-center mb-8">
            Complétez le formulaire ci-dessous pour réserver votre véhicule de luxe
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <ReservationForm />
            </div>
            
            <div className="lg:col-span-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Avantages de notre service</h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <Image src="/images/icons/check.svg" alt="Check" width={16} height={16} />
                    </div>
                    <div>
                      <p className="font-medium">Annulation gratuite</p>
                      <p className="text-sm text-gray-600">Jusqu'à 48h avant la prise en charge</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <Image src="/images/icons/check.svg" alt="Check" width={16} height={16} />
                    </div>
                    <div>
                      <p className="font-medium">Assurance tous risques</p>
                      <p className="text-sm text-gray-600">Incluse dans le prix de location</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <Image src="/images/icons/check.svg" alt="Check" width={16} height={16} />
                    </div>
                    <div>
                      <p className="font-medium">Livraison et reprise</p>
                      <p className="text-sm text-gray-600">À l'aéroport ou à votre hôtel</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <Image src="/images/icons/check.svg" alt="Check" width={16} height={16} />
                    </div>
                    <div>
                      <p className="font-medium">Assistance 24/7</p>
                      <p className="text-sm text-gray-600">Support client disponible en permanence</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <Image src="/images/icons/check.svg" alt="Check" width={16} height={16} />
                    </div>
                    <div>
                      <p className="font-medium">Kilométrage illimité</p>
                      <p className="text-sm text-gray-600">Conduisez sans vous soucier des limites</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-100">
                  <h4 className="font-bold flex items-center text-red-700">
                    <Image src="/images/icons/info.svg" alt="Info" width={16} height={16} className="mr-2" />
                    Information importante
                  </h4>
                  <p className="text-sm text-red-700 mt-2">
                    Une caution sera demandée lors de la prise en charge du véhicule. Le montant varie selon le modèle.
                  </p>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500">
                    Besoin d'aide pour votre réservation ? Contactez-nous au <span className="text-red-600 font-medium">+212 6 00 00 00 00</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}