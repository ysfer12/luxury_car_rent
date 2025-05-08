import { Mail, Phone, MapPin } from 'lucide-react';
import { JSX } from 'react';

export default function ContactPage(): JSX.Element {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Contactez-nous</h1>
          <p className="text-gray-600 text-center mb-8">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Formulaire de contact</h2>
                
                <form>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="subject">
                        Sujet
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded transition-colors"
                    >
                      Envoyer le message
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div>
              <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-6">Coordonnées</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Phone className="text-red-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Téléphone</h3>
                      <p className="text-gray-600">+212 6 00 00 00 00</p>
                      <p className="text-gray-600">+212 5 00 00 00 00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Mail className="text-red-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600">contact@luxurycar.ma</p>
                      <p className="text-gray-600">reservation@luxurycar.ma</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <MapPin className="text-red-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Adresse</h3>
                      <p className="text-gray-600">123 Avenue Mohammed V</p>
                      <p className="text-gray-600">Marrakech, Maroc</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Horaires d'ouverture</h2>
                
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Lundi - Vendredi</span>
                    <span className="font-medium">8h - 20h</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Samedi</span>
                    <span className="font-medium">9h - 18h</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Dimanche</span>
                    <span className="font-medium">10h - 16h</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}