'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface ReservationFormProps {
  vehicleId?: string | null;
}

interface FormData {
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  pickupLocation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ReservationForm({ vehicleId = null }: ReservationFormProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    pickupDate: '',
    returnDate: '',
    pickupTime: '10:00',
    returnTime: '10:00',
    pickupLocation: 'Aéroport de Marrakech',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [reservationRef, setReservationRef] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateDates = (): boolean => {
    const pickup = new Date(formData.pickupDate);
    const returnDate = new Date(formData.returnDate);
    const today = new Date();
    
    // Reset time part to compare dates only
    today.setHours(0, 0, 0, 0);
    
    if (pickup < today) {
      setError("La date de prise en charge ne peut pas être dans le passé");
      return false;
    }
    
    if (returnDate < pickup) {
      setError("La date de retour doit être après la date de prise en charge");
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Validate dates before proceeding
    if (!validateDates()) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Generate reservation reference
      const generatedRef = Math.random().toString(36).substring(2, 10).toUpperCase();
      setReservationRef(generatedRef);
      
      // Send confirmation email via API
      const apiEndpoint = '/api/send-email';
      
      const emailResponse = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          vehicleId: vehicleId || 'Non spécifié',
          pickupDate: formData.pickupDate,
          returnDate: formData.returnDate,
          pickupLocation: formData.pickupLocation,
          pickupTime: formData.pickupTime,
          returnTime: formData.returnTime,
          phone: formData.phone,
          message: formData.message,
          reference: generatedRef
        }),
      });
      
      let responseData: any = {};
      
      // Check if response is OK and contains valid JSON
      if (emailResponse.ok) {
        try {
          responseData = await emailResponse.json();
        } catch (jsonError) {
          console.error('Valid response but invalid JSON format:', jsonError);
          throw new Error('Erreur de format dans la réponse du serveur');
        }
      } else {
        // Handle HTTP errors (4xx, 5xx)
        let errorMessage = `Erreur du serveur (${emailResponse.status})`;
        
        try {
          // Try to parse error JSON
          const errorData = await emailResponse.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // If response is not JSON, get raw text
          try {
            const textError = await emailResponse.text();
            console.error('Non-JSON response:', textError.substring(0, 100) + '...');
          } catch (textError) {
            console.error('Unable to read error response');
          }
        }
        
        throw new Error(errorMessage);
      }
      
      // Use server-returned reference if available
      if (responseData.reference) {
        setReservationRef(responseData.reference);
      }
      
      // Success - update UI
      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset form after 8 seconds
      setTimeout(() => {
        setSuccess(false);
        setStep(1);
        setFormData({
          pickupDate: '',
          returnDate: '',
          pickupTime: '10:00',
          returnTime: '10:00',
          pickupLocation: 'Aéroport de Marrakech',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      }, 8000);
      
    } catch (error: any) {
      console.error('Error during submission:', error);
      setIsSubmitting(false);
      setError(error.message || 'Une erreur est survenue lors de la réservation. Veuillez réessayer.');
    }
  };

  // Calculate minimum dates for date selectors
  const today = new Date().toISOString().split('T')[0];
  const minReturnDate = formData.pickupDate || today;

  return (
    <div className="bg-white rounded-xl">
      {success ? (
        <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-charcoal-800 mb-3">Réservation Confirmée</h3>
          <p className="text-charcoal-600 mb-6 max-w-md">
            Votre demande de réservation a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais pour confirmer les détails.
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 max-w-md text-left w-full">
            <h4 className="font-medium text-charcoal-800 mb-3">Détails de votre réservation</h4>
            <div className="space-y-2">
              <p className="text-sm flex justify-between">
                <span className="text-charcoal-500">Référence:</span>
                <span className="font-medium">{reservationRef}</span>
              </p>
              <p className="text-sm flex justify-between">
                <span className="text-charcoal-500">Date de prise en charge:</span>
                <span className="font-medium">{new Date(formData.pickupDate).toLocaleDateString('fr-FR')} à {formData.pickupTime}</span>
              </p>
              <p className="text-sm flex justify-between">
                <span className="text-charcoal-500">Date de retour:</span>
                <span className="font-medium">{new Date(formData.returnDate).toLocaleDateString('fr-FR')} à {formData.returnTime}</span>
              </p>
              <p className="text-sm flex justify-between">
                <span className="text-charcoal-500">Lieu:</span>
                <span className="font-medium">{formData.pickupLocation}</span>
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4 max-w-md text-left w-full">
            <div className="flex items-start">
              <Mail className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={18} />
              <div>
                <h4 className="font-medium text-blue-700">Email de confirmation</h4>
                <p className="text-sm text-blue-600 mt-1">
                  Un email de confirmation a été envoyé à <span className="font-medium">{formData.email}</span>. Veuillez vérifier votre boîte de réception et vos spams.
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-charcoal-500">
            Si vous avez des questions, n'hésitez pas à nous contacter au <span className="font-medium">{process.env.NEXT_PUBLIC_CONTACT_PHONE || '+212 6 00 00 00 00'}</span>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Error display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 mx-6 mt-6 sm:mx-8 sm:mt-8 rounded">
              <div className="flex items-start">
                <AlertCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
          
          {step === 1 && (
            <div className="p-6 sm:p-8 bg-white rounded-t-xl">
              <div className="flex mb-6">
                <div className="flex-1 text-center">
                  <div className="mx-auto w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-medium text-sm">
                    1
                  </div>
                  <p className="text-xs mt-2 font-medium text-gold-600">Dates</p>
                </div>
                <div className="w-full max-w-[100px] flex items-center">
                  <div className="h-[2px] w-full bg-gray-200"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="mx-auto w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-charcoal-500 font-medium text-sm">
                    2
                  </div>
                  <p className="text-xs mt-2 font-medium text-charcoal-400">Informations</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-6 text-charcoal-800">Dates et lieux</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-charcoal-700 mb-2 font-medium text-sm" htmlFor="pickupDate">
                    Date de prise en charge
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-charcoal-400">
                      <Calendar size={18} />
                    </div>
                    <input
                      type="date"
                      id="pickupDate"
                      name="pickupDate"
                      min={today}
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white"
                      required
                      value={formData.pickupDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-charcoal-700 mb-2 font-medium text-sm" htmlFor="returnDate">
                    Date de retour
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-charcoal-400">
                      <Calendar size={18} />
                    </div>
                    <input
                      type="date"
                      id="returnDate"
                      name="returnDate"
                      min={minReturnDate}
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white"
                      required
                      value={formData.returnDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-charcoal-700 mb-2 font-medium text-sm" htmlFor="pickupTime">
                    Heure de prise en charge
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-charcoal-400">
                      <Clock size={18} />
                    </div>
                    <select
                      id="pickupTime"
                      name="pickupTime"
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white appearance-none"
                      value={formData.pickupTime}
                      onChange={handleChange}
                    >
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-charcoal-500">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-charcoal-700 mb-2 font-medium text-sm" htmlFor="returnTime">
                    Heure de retour
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-charcoal-400">
                      <Clock size={18} />
                    </div>
                    <select
                      id="returnTime"
                      name="returnTime"
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white appearance-none"
                      value={formData.returnTime}
                      onChange={handleChange}
                    >
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-charcoal-500">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-charcoal-700 mb-2 font-medium text-sm" htmlFor="pickupLocation">
                    Lieu de prise en charge
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-charcoal-400">
                      <MapPin size={18} />
                    </div>
                    <select
                      id="pickupLocation"
                      name="pickupLocation"
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white appearance-none"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                    >
                      <option value="Aéroport de Marrakech">Aéroport de Marrakech</option>
                      <option value="Aéroport de Casablanca">Aéroport de Casablanca</option>
                      <option value="Rabat Centre-Ville">Rabat Centre-Ville</option>
                      <option value="Aéroport d'Agadir">Aéroport d'Agadir</option>
                      <option value="Tanger Centre-Ville">Tanger Centre-Ville</option>
                      <option value="Fès Centre-Ville">Fès Centre-Ville</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-charcoal-500">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Vehicle information if available */}
              {vehicleId && (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <p className="text-sm text-charcoal-600">
                    Vous êtes en train de réserver: <span className="font-medium text-charcoal-800">{vehicleId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  </p>
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-gold-500 hover:bg-gold-600 text-white py-3 px-8 rounded-md transition-colors shadow-gold hover:shadow-lg font-medium"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="p-6 sm:p-8 bg-white rounded-t-xl">
              <div className="flex mb-6">
                <div className="flex-1 text-center">
                  <div className="mx-auto w-8 h-8 rounded-full bg-gold-100 border-2 border-gold-500 flex items-center justify-center text-gold-600 font-medium text-sm">
                    <CheckCircle size={14} className="text-gold-600" />
                  </div>
                  <p className="text-xs mt-2 font-medium text-gold-600">Dates</p>
                </div>
                <div className="w-full max-w-[100px] flex items-center">
                  <div className="h-[2px] w-full bg-gold-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="mx-auto w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-medium text-sm">
                    2
                  </div>
                  <p className="text-xs mt-2 font-medium text-gold-600">Informations</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-6 text-charcoal-800">Informations personnelles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-charcoal-700 mb-2 font-medium text-sm" htmlFor="firstName">
                    Prénom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-charcoal-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-charcoal-700 mb-2 font-medium text-sm" htmlFor="lastName">
                    Nom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-charcoal-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-charcoal-700 mb-2 font-medium text-sm" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-charcoal-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-charcoal-700 mb-2 font-medium text-sm" htmlFor="phone">
                    Téléphone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-charcoal-400">
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-charcoal-700 mb-2 font-medium text-sm" htmlFor="message">
                    Message (optionnel)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Demandes spéciales ou informations complémentaires..."
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-gray-300 bg-white text-charcoal-700 hover:bg-gray-50 py-3 px-6 rounded-md transition-colors font-medium"
                >
                  Retour
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-gold-500 hover:bg-gold-600 text-white py-3 px-8 rounded-md transition-colors shadow-gold hover:shadow-lg font-medium flex items-center justify-center min-w-[160px] ${
                    isSubmitting ? 'bg-gold-400 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Traitement...
                    </>
                  ) : (
                    'Confirmer'
                  )}
                </button>
              </div>
            </div>
          )}
          
          <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-200 rounded-b-xl">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gold-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-charcoal-600">
                  En soumettant ce formulaire, vous acceptez nos <a href="#" className="text-gold-600 hover:text-gold-800 underline">conditions générales</a> et notre <a href="#" className="text-gold-600 hover:text-gold-800 underline">politique de confidentialité</a>.
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}