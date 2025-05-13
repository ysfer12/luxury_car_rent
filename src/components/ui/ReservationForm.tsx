'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle, Loader2, AlertCircle, ChevronRight, ChevronLeft, Shield, Info, Car } from 'lucide-react';

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
  const [durationDays, setDurationDays] = useState<number>(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [progressWidth, setProgressWidth] = useState<number>(50);
  
  // Calculate rental duration
  useEffect(() => {
    if (formData.pickupDate && formData.returnDate) {
      const pickup = new Date(formData.pickupDate);
      const returnDate = new Date(formData.returnDate);
      const diffTime = Math.abs(returnDate.getTime() - pickup.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDurationDays(diffDays);
    } else {
      setDurationDays(0);
    }
  }, [formData.pickupDate, formData.returnDate]);
  
  // Update progress bar based on step
  useEffect(() => {
    setProgressWidth(step === 1 ? 50 : 100);
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user modifies a field
    if (error) setError(null);
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
  
  const validateStep1 = (): boolean => {
    if (!formData.pickupDate) {
      setError("Veuillez sélectionner une date de prise en charge");
      return false;
    }
    
    if (!formData.returnDate) {
      setError("Veuillez sélectionner une date de retour");
      return false;
    }
    
    return validateDates();
  };
  
  const validateStep2 = (): boolean => {
    if (!formData.firstName.trim()) {
      setError("Veuillez saisir votre prénom");
      return false;
    }
    
    if (!formData.lastName.trim()) {
      setError("Veuillez saisir votre nom");
      return false;
    }
    
    if (!formData.email.trim()) {
      setError("Veuillez saisir votre email");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Veuillez saisir un email valide");
      return false;
    }
    
    if (!formData.phone.trim()) {
      setError("Veuillez saisir votre numéro de téléphone");
      return false;
    }
    
    return true;
  };

  const handleNext = (): void => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePrev = (): void => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Validate step 2 before proceeding
    if (!validateStep2()) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Generate reservation reference
      const generatedRef = Math.random().toString(36).substring(2, 10).toUpperCase();
      setReservationRef(generatedRef);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500">
      {success ? (
        <div className="p-8 transition-all duration-500 animate-fadeIn">
          {/* Success Card */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-success-pulse">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-charcoal-800 mb-3">Réservation Confirmée</h3>
            <p className="text-charcoal-600 mb-6 max-w-md">
              Votre demande de réservation a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais pour confirmer les détails.
            </p>
            
            {/* Reservation Details Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 mb-6 w-full max-w-md text-left shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600"></div>
              
              <h4 className="font-semibold text-charcoal-800 mb-4 flex items-center">
                <Info size={18} className="text-gold-500 mr-2" />
                Détails de votre réservation
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-charcoal-500 text-sm">Référence:</span>
                  <span className="font-medium text-gold-600 bg-gold-50 px-2 py-0.5 rounded">{reservationRef}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Date de prise en charge:</span>
                  <span className="font-medium">{formatDate(formData.pickupDate)} à {formData.pickupTime}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Date de retour:</span>
                  <span className="font-medium">{formatDate(formData.returnDate)} à {formData.returnTime}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Durée:</span>
                  <span className="font-medium">{durationDays} jour{durationDays > 1 ? 's' : ''}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Lieu:</span>
                  <span className="font-medium">{formData.pickupLocation}</span>
                </div>
                
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-charcoal-500">Client:</span>
                  <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                </div>
              </div>
            </div>
            
            {/* Email Confirmation Notice */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 max-w-md text-left w-full shadow-sm">
              <div className="flex items-start">
                <Mail className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-blue-700">Email de confirmation</h4>
                  <p className="text-sm text-blue-600 mt-1">
                    Un email de confirmation a été envoyé à <span className="font-medium">{formData.email}</span>. Veuillez vérifier votre boîte de réception.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Info */}
            <p className="text-sm text-charcoal-500">
              Si vous avez des questions, n'hésitez pas à nous contacter au <a href="tel:+212600000000" className="font-medium text-gold-600 hover:text-gold-700 transition-colors">+212 6 00 00 00 00</a>
            </p>
            
            {/* Return Home Button */}
            <a 
              href="/"
              className="mt-8 inline-flex items-center bg-gradient-to-r from-gold-600 to-gold-500 text-white py-3 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-gold-500/20 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center font-medium">
                Retour à l'accueil
                <ChevronRight size={18} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-gold-700 to-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-200">
            <div 
              className="h-full bg-gold-500 transition-all duration-500 ease-in-out" 
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 rounded animate-fadeIn">
              <div className="flex items-start">
                <AlertCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
          
          {/* Step 1: Dates and Location */}
          {step === 1 && (
            <div className="p-8">
              {/* Step Indicator */}
              <div className="flex mb-10">
                <StepIndicator 
                  number={1} 
                  title="Dates" 
                  isActive={true} 
                  isCompleted={false} 
                />
                <div className="w-full max-w-[100px] flex items-center">
                  <div className="h-0.5 w-full bg-gray-200"></div>
                </div>
                <StepIndicator 
                  number={2} 
                  title="Informations" 
                  isActive={false} 
                  isCompleted={false} 
                />
              </div>
              
              <h2 className="text-2xl font-bold mb-6 text-charcoal-800">Dates et lieux</h2>
              
              {/* Date & Time Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Pickup Date */}
                <div className="group">
                  <InputLabel htmlFor="pickupDate" icon={<Calendar size={18} />}>
                    Date de prise en charge
                  </InputLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold-500">
                      <Calendar size={18} />
                    </div>
                    <input
                      type="date"
                      id="pickupDate"
                      name="pickupDate"
                      min={today}
                      className="pl-10 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white/95 shadow-sm hover:shadow transition-all duration-300"
                      required
                      value={formData.pickupDate}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('pickupDate')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  
                  {/* Floating Helper Text */}
                  {focusedField === 'pickupDate' && (
                    <div className="absolute z-10 mt-2 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg animate-fadeIn">
                      Sélectionnez votre date de prise en charge
                      <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-4"></div>
                    </div>
                  )}
                </div>
                
                {/* Return Date */}
                <div className="group">
                  <InputLabel htmlFor="returnDate" icon={<Calendar size={18} />}>
                    Date de retour
                  </InputLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold-500">
                      <Calendar size={18} />
                    </div>
                    <input
                      type="date"
                      id="returnDate"
                      name="returnDate"
                      min={minReturnDate}
                      className="pl-10 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white/95 shadow-sm hover:shadow transition-all duration-300"
                      required
                      value={formData.returnDate}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('returnDate')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>
                
                {/* Pickup Time */}
                <div>
                  <InputLabel htmlFor="pickupTime" icon={<Clock size={18} />}>
                    Heure de prise en charge
                  </InputLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold-500">
                      <Clock size={18} />
                    </div>
                    <SelectWithIcon
                      id="pickupTime"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      options={[
                        { value: "08:00", label: "08:00" },
                        { value: "09:00", label: "09:00" },
                        { value: "10:00", label: "10:00" },
                        { value: "11:00", label: "11:00" },
                        { value: "12:00", label: "12:00" },
                        { value: "13:00", label: "13:00" },
                        { value: "14:00", label: "14:00" },
                        { value: "15:00", label: "15:00" },
                        { value: "16:00", label: "16:00" },
                        { value: "17:00", label: "17:00" },
                        { value: "18:00", label: "18:00" }
                      ]}
                    />
                  </div>
                </div>
                
                {/* Return Time */}
                <div>
                  <InputLabel htmlFor="returnTime" icon={<Clock size={18} />}>
                    Heure de retour
                  </InputLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold-500">
                      <Clock size={18} />
                    </div>
                    <SelectWithIcon
                      id="returnTime"
                      name="returnTime"
                      value={formData.returnTime}
                      onChange={handleChange}
                      options={[
                        { value: "08:00", label: "08:00" },
                        { value: "09:00", label: "09:00" },
                        { value: "10:00", label: "10:00" },
                        { value: "11:00", label: "11:00" },
                        { value: "12:00", label: "12:00" },
                        { value: "13:00", label: "13:00" },
                        { value: "14:00", label: "14:00" },
                        { value: "15:00", label: "15:00" },
                        { value: "16:00", label: "16:00" },
                        { value: "17:00", label: "17:00" },
                        { value: "18:00", label: "18:00" }
                      ]}
                    />
                  </div>
                </div>
                
                {/* Pickup Location */}
                <div className="md:col-span-2">
                  <InputLabel htmlFor="pickupLocation" icon={<MapPin size={18} />}>
                    Lieu de prise en charge
                  </InputLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold-500">
                      <MapPin size={18} />
                    </div>
                    <SelectWithIcon
                      id="pickupLocation"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      options={[

    { value: "Aéroport de Marrakech", label: "Aéroport de Marrakech" },
    { value: "Aéroport de Casablanca", label: "Aéroport de Casablanca" },
    { value: "Rabat Centre-Ville", label: "Rabat Centre-Ville" },
    { value: "Aéroport d'Agadir", label: "Aéroport d'Agadir" },
    { value: "Tanger Centre-Ville", label: "Tanger Centre-Ville" },
    { value: "Fès Centre-Ville", label: "Fès Centre-Ville" },
    { value: "Aéroport de Rabat-Salé", label: "Aéroport de Rabat-Salé" },
    { value: "Aéroport de Tanger", label: "Aéroport de Tanger" },
    { value: "Aéroport de Fès", label: "Aéroport de Fès" },
    { value: "Marrakech Centre-Ville", label: "Marrakech Centre-Ville" },
    { value: "Marrakech Gueliz", label: "Marrakech Gueliz" },
    { value: "Marrakech Médina", label: "Marrakech Médina" },
    { value: "Marrakech Palmeraie", label: "Marrakech Palmeraie" },
    { value: "Casablanca Centre-Ville", label: "Casablanca Centre-Ville" },
    { value: "Casablanca Aïn Diab", label: "Casablanca Aïn Diab" },
    { value: "Casablanca Corniche", label: "Casablanca Corniche" },
    { value: "Casablanca Maarif", label: "Casablanca Maarif" },
    { value: "Agadir Centre-Ville", label: "Agadir Centre-Ville" },
    { value: "Agadir Plage", label: "Agadir Plage" },
    { value: "Agadir Marina", label: "Agadir Marina" },
    { value: "Aéroport d'Oujda", label: "Aéroport d'Oujda" },
    { value: "Oujda Centre-Ville", label: "Oujda Centre-Ville" },
    { value: "Aéroport d'Essaouira", label: "Aéroport d'Essaouira" },
    { value: "Essaouira Centre-Ville", label: "Essaouira Centre-Ville" },
    { value: "Essaouira Médina", label: "Essaouira Médina" },
    { value: "Essaouira Port", label: "Essaouira Port" },
    { value: "Aéroport de Nador", label: "Aéroport de Nador" },
    { value: "Nador Centre-Ville", label: "Nador Centre-Ville" },
    { value: "Aéroport d'El Jadida", label: "Aéroport d'El Jadida" },
    { value: "El Jadida Centre-Ville", label: "El Jadida Centre-Ville" },
    { value: "Aéroport de Tétouan", label: "Aéroport de Tétouan" },
    { value: "Tétouan Centre-Ville", label: "Tétouan Centre-Ville" },
    { value: "Tétouan Médina", label: "Tétouan Médina" },
    { value: "Aéroport de Ouarzazate", label: "Aéroport de Ouarzazate" },
    { value: "Ouarzazate Centre-Ville", label: "Ouarzazate Centre-Ville" },
    { value: "Aéroport d'Errachidia", label: "Aéroport d'Errachidia" },
    { value: "Errachidia Centre-Ville", label: "Errachidia Centre-Ville" },
    { value: "Meknès Centre-Ville", label: "Meknès Centre-Ville" },
    { value: "Meknès Médina", label: "Meknès Médina" },
    { value: "Chefchaouen Centre-Ville", label: "Chefchaouen Centre-Ville" },
    { value: "Chefchaouen Médina", label: "Chefchaouen Médina" },
    { value: "Aéroport de Dakhla", label: "Aéroport de Dakhla" },
    { value: "Dakhla Centre-Ville", label: "Dakhla Centre-Ville" },
    { value: "Dakhla Plage", label: "Dakhla Plage" },
    { value: "Aéroport de Laâyoune", label: "Aéroport de Laâyoune" },
    { value: "Laâyoune Centre-Ville", label: "Laâyoune Centre-Ville" },
    { value: "Safi Centre-Ville", label: "Safi Centre-Ville" },
    { value: "Kénitra Centre-Ville", label: "Kénitra Centre-Ville" },
    { value: "Ifrane Centre-Ville", label: "Ifrane Centre-Ville" },
    { value: "Asilah Centre-Ville", label: "Asilah Centre-Ville" },
    { value: "Beni Mellal Centre-Ville", label: "Beni Mellal Centre-Ville" },
    { value: "Aéroport de Beni Mellal", label: "Aéroport de Beni Mellal" },
    { value: "Azrou Centre-Ville", label: "Azrou Centre-Ville" },
    { value: "Taroudant Centre-Ville", label: "Taroudant Centre-Ville" },
    { value: "Merzouga", label: "Merzouga" },
    { value: "Erg Chebbi", label: "Erg Chebbi" },
    { value: "Zagora", label: "Zagora" },
    { value: "M'Hamid", label: "M'Hamid" },
    { value: "Tinghir", label: "Tinghir" },
    { value: "Gorges du Todra", label: "Gorges du Todra" },
    { value: "Gorges du Dadès", label: "Gorges du Dadès" },
    { value: "Aït Ben Haddou", label: "Aït Ben Haddou" },
    { value: "Tafraoute", label: "Tafraoute" },
    { value: "Taghazout", label: "Taghazout" },
    { value: "Imlil", label: "Imlil" },
    { value: "Volubilis", label: "Volubilis" },
    { value: "Moulay Idriss", label: "Moulay Idriss" },
    { value: "Taza", label: "Taza" },
    { value: "Al Hoceima Centre-Ville", label: "Al Hoceima Centre-Ville" },
    { value: "Aéroport d'Al Hoceima", label: "Aéroport d'Al Hoceima" },
    { value: "Tiznit", label: "Tiznit" },
    { value: "Sidi Ifni", label: "Sidi Ifni" },
    { value: "Midelt", label: "Midelt" },
    { value: "Tafraout", label: "Tafraout" },
    { value: "Larache", label: "Larache" },
    { value: "Settat", label: "Settat" },
    { value: "Khemisset", label: "Khemisset" },
    { value: "Salé", label: "Salé" },
    { value: "Témara", label: "Témara" },
    { value: "Mohammedia", label: "Mohammedia" },
    { value: "Rabat Agdal", label: "Rabat Agdal" },
    { value: "Rabat Médina", label: "Rabat Médina" },
    { value: "Rabat Hassan", label: "Rabat Hassan" },
    { value: "Tanger Médina", label: "Tanger Médina" },
    { value: "Tanger Marina", label: "Tanger Marina" }
                 ]}
                    />
                  </div>
                </div>
              </div>
              
              {/* Duration Summary Card */}
              {formData.pickupDate && formData.returnDate && durationDays > 0 && (
                <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200 animate-fadeIn">
                  <h3 className="font-medium mb-2 text-charcoal-700">Résumé de votre réservation</h3>
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Prise en charge</p>
                      <p className="font-medium">{formatDate(formData.pickupDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Retour</p>
                      <p className="font-medium">{formatDate(formData.returnDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Durée</p>
                      <p className="font-medium text-gold-600">{durationDays} jour{durationDays > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Vehicle Information (If Available) */}
              {vehicleId && (
                <div className="bg-gold-50 p-4 rounded-md mb-6 border border-gold-100 flex items-center">
                  <div className="rounded-full bg-gold-100 p-2 mr-3">
                    <Car size={18} className="text-gold-600" />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-600">
                      Vous êtes en train de réserver: <span className="font-medium text-gold-700">{vehicleId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </p>
                  </div>
                </div>
              )}
              
              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center bg-gradient-to-r from-gold-600 to-gold-500 text-white py-3 px-8 rounded-md transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-gold-500/20 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center font-medium">
                    Continuer
                    <ChevronRight size={18} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gold-700 to-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Personal Information */}
          {step === 2 && (
            <div className="p-8">
              {/* Step Indicator */}
              <div className="flex mb-10">
                <StepIndicator 
                  number={1} 
                  title="Dates" 
                  isActive={false} 
                  isCompleted={true} 
                />
                <div className="w-full max-w-[100px] flex items-center">
                  <div className="h-0.5 w-full bg-gold-500"></div>
                </div>
                <StepIndicator 
                  number={2} 
                  title="Informations" 
                  isActive={true} 
                  isCompleted={false} 
                />
              </div>
              
              <h2 className="text-2xl font-bold mb-6 text-charcoal-800">Informations personnelles</h2>
              
              {/* Personal Information Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* First Name */}
                <div>
                  <InputLabel htmlFor="firstName" icon={<User size={18} />}>
                    Prénom
                  </InputLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold-500">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="pl-10 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white/95 shadow-sm hover:shadow transition-all duration-300"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Last Name */}
                <div>
                  <InputLabel htmlFor="lastName" icon={<User size={18} />}>
                    Nom
                  </InputLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold-500">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="pl-10 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white/95 shadow-sm hover:shadow transition-all duration-300"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Email */}
                <div>
                  <InputLabel htmlFor="email" icon={<Mail size={18} />}>
                    Email
                  </InputLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold-500">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="pl-10 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white/95 shadow-sm hover:shadow transition-all duration-300"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Phone */}
                <div>
                  <InputLabel htmlFor="phone" icon={<Phone size={18} />}>
                    Téléphone
                  </InputLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold-500">
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="pl-10 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white/95 shadow-sm hover:shadow transition-all duration-300"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Message (Optional) */}
                <div className="md:col-span-2">
                  <InputLabel htmlFor="message" icon={null}>
                    Message (optionnel)
                  </InputLabel>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white/95 shadow-sm hover:shadow transition-all duration-300"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Demandes spéciales ou informations complémentaires..."
                  ></textarea>
                </div>
              </div>
              
              {/* Reservation Summary */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-medium text-charcoal-700 mb-3">Résumé de votre réservation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 block">Prise en charge:</span>
                    <span className="font-medium">{formatDate(formData.pickupDate)} à {formData.pickupTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Retour:</span>
                    <span className="font-medium">{formatDate(formData.returnDate)} à {formData.returnTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Durée:</span>
                    <span className="font-medium">{durationDays} jour{durationDays > 1 ? 's' : ''}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Lieu:</span>
                    <span className="font-medium">{formData.pickupLocation}</span>
                  </div>
                  {vehicleId && (
                    <div className="md:col-span-2">
                      <span className="text-gray-500 block">Véhicule:</span>
                      <span className="font-medium text-gold-700">{vehicleId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center bg-white border border-gray-300 text-charcoal-700 py-3 px-6 rounded-md transition-all duration-300 shadow-sm hover:shadow hover:bg-gray-50 group"
                >
                  <ChevronLeft size={18} className="mr-1 transform group-hover:-translate-x-1 transition-transform duration-300" />
                  Retour
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center bg-gradient-to-r from-gold-600 to-gold-500 text-white py-3 px-8 rounded-md shadow-md hover:shadow-lg hover:shadow-gold-500/20 transition-all duration-300 min-w-[160px] justify-center ${
                    isSubmitting ? 'opacity-80 cursor-wait' : 'hover:from-gold-700 hover:to-gold-600'
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
          
          {/* Footer */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Shield className="h-5 w-5 text-gold-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-charcoal-600">
                  En soumettant ce formulaire, vous acceptez nos <a href="#" className="text-gold-600 hover:text-gold-800 underline font-medium">conditions générales</a> et notre <a href="#" className="text-gold-600 hover:text-gold-800 underline font-medium">politique de confidentialité</a>.
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes success-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.9; }
        }
        
        .animate-success-pulse {
          animation: success-pulse 2s ease-in-out infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

// Step Indicator Component
function StepIndicator({ 
  number, 
  title, 
  isActive, 
  isCompleted 
}: { 
  number: number; 
  title: string; 
  isActive: boolean; 
  isCompleted: boolean;
}): JSX.Element {
  return (
    <div className="flex-1 text-center">
      <div 
        className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ${
          isCompleted 
            ? 'bg-gold-100 border-2 border-gold-500 text-gold-600' 
            : isActive 
              ? 'bg-gold-500 text-white shadow-md shadow-gold-500/20' 
              : 'bg-gray-200 text-gray-500'
        }`}
      >
        {isCompleted ? <CheckCircle size={16} className="text-gold-600" /> : number}
      </div>
      <p className={`text-xs mt-2 font-medium transition-colors duration-500 ${
        isActive || isCompleted ? 'text-gold-600' : 'text-gray-400'
      }`}>
        {title}
      </p>
    </div>
  );
}

// Input Label Component
function InputLabel({ 
  htmlFor, 
  children, 
  icon = null 
}: { 
  htmlFor: string; 
  children: React.ReactNode; 
  icon?: React.ReactNode | null;
}): JSX.Element {
  return (
    <label 
      htmlFor={htmlFor} 
      className="block text-charcoal-700 mb-2 font-medium text-sm flex items-center"
    >
      {icon && <span className="mr-2 text-gold-500">{icon}</span>}
      {children}
    </label>
  );
}

// Select With Icon Component
function SelectWithIcon({
  id,
  name,
  value,
  onChange,
  options
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}): JSX.Element {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        className="pl-10 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white/95 shadow-sm hover:shadow transition-all duration-300 appearance-none pr-10"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-charcoal-500">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}