import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Handler for OPTIONS requests (CORS pre-flight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: Request) {
  try {
    // Check content type
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({ 
        success: false, 
        message: 'Content-Type doit être application/json' 
      }, { status: 400 });
    }

    // Get and validate the body
    const body = await req.json();
    const { email, firstName, lastName, vehicleId, pickupDate, returnDate, pickupLocation, pickupTime, returnTime } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !pickupDate || !returnDate) {
      return NextResponse.json({ 
        success: false, 
        message: 'Des champs obligatoires sont manquants' 
      }, { status: 400 });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Format date
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Date non spécifiée';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
      } catch (error) {
        return dateString;
      }
    };

    // Generate reservation reference
    const reservationRef = body.reference || Math.random().toString(36).substring(2, 10).toUpperCase();

    // Email to customer
    const mailOptions = {
      from: `"Luxury Car Rental Morocco" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Confirmation de votre réservation de véhicule',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333; margin-bottom: 5px;">Confirmation de Réservation</h1>
            <p style="color: #666; font-size: 16px;">Merci pour votre réservation!</p>
          </div>
          
          <div style="background-color: #f9f2e2; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 15px;">Cher(e) <strong>${firstName} ${lastName}</strong>,</p>
            <p style="margin-top: 10px; font-size: 15px;">Nous vous confirmons la réception de votre demande de réservation. Un membre de notre équipe vous contactera dans les plus brefs délais pour finaliser les détails.</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; font-size: 18px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Détails de votre réservation</h2>
            
            <p style="margin: 8px 0;"><strong>Référence de réservation:</strong> ${reservationRef}</p>
            <p style="margin: 8px 0;"><strong>Véhicule:</strong> ${vehicleId || 'Non spécifié'}</p>
            <p style="margin: 8px 0;"><strong>Date de prise en charge:</strong> ${formatDate(pickupDate)} à ${pickupTime || 'heure non spécifiée'}</p>
            <p style="margin: 8px 0;"><strong>Date de retour:</strong> ${formatDate(returnDate)} à ${returnTime || 'heure non spécifiée'}</p>
            <p style="margin: 8px 0;"><strong>Lieu de prise en charge:</strong> ${pickupLocation || 'Non spécifié'}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; font-size: 16px;">Prochaines étapes:</h3>
            <ol style="color: #555; padding-left: 20px; line-height: 1.5;">
              <li>Un membre de notre équipe vous contactera pour confirmer la disponibilité et les détails</li>
              <li>Vous recevrez une confirmation finale par email avec le contrat de location</li>
              <li>Préparez votre permis de conduire et une pièce d'identité pour le jour de la prise en charge</li>
            </ol>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; font-size: 16px; margin-top: 0;">Questions ou modifications?</h3>
            <p style="color: #555; margin: 8px 0;">Pour toute question ou modification de votre réservation, n'hésitez pas à nous contacter:</p>
            <p style="margin: 8px 0;"><strong>Téléphone:</strong> +212 6 00 00 00 00</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> contact@luxurycar.ma</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #888; font-size: 14px;">Luxury Car Rental Morocco</p>
            <p style="color: #888; font-size: 12px; margin: 5px 0;">123 Avenue Mohammed V, Marrakech, Maroc</p>
            <p style="color: #888; font-size: 12px;">© ${new Date().getFullYear()} Luxury Car Rental Morocco. Tous droits réservés.</p>
          </div>
        </div>
      `,
    };

    // Send email to customer
    await transporter.sendMail(mailOptions);
    
    // Send email to admin if admin email is configured
    if (process.env.ADMIN_EMAIL) {
      const adminMailOptions = {
        from: `"Système de Réservation" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'Nouvelle réservation de véhicule',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
            <h1 style="color: #333;">Nouvelle réservation</h1>
            <p style="color: #555;">Un client a effectué une nouvelle réservation.</p>
            
            <h2 style="color: #333; margin-top: 20px;">Détails du client</h2>
            <ul style="color: #555;">
              <li><strong>Nom:</strong> ${firstName} ${lastName}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Téléphone:</strong> ${body.phone || 'Non spécifié'}</li>
            </ul>
            
            <h2 style="color: #333; margin-top: 20px;">Détails de la réservation</h2>
            <ul style="color: #555;">
              <li><strong>Référence:</strong> ${reservationRef}</li>
              <li><strong>Véhicule:</strong> ${vehicleId || 'Non spécifié'}</li>
              <li><strong>Date de prise en charge:</strong> ${formatDate(pickupDate)} à ${pickupTime || 'heure non spécifiée'}</li>
              <li><strong>Date de retour:</strong> ${formatDate(returnDate)} à ${returnTime || 'heure non spécifiée'}</li>
              <li><strong>Lieu de prise en charge:</strong> ${pickupLocation || 'Non spécifié'}</li>
            </ul>
            
            <h2 style="color: #333; margin-top: 20px;">Message du client</h2>
            <p style="color: #555; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">${body.message || 'Aucun message'}</p>
            
            <p style="color: #555; margin-top: 30px;">Connectez-vous au tableau de bord administrateur pour plus de détails et pour confirmer cette réservation.</p>
          </div>
        `,
      };
      
      await transporter.sendMail(adminMailOptions);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Email de confirmation envoyé avec succès',
      reference: reservationRef
    }, { status: 200 });
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: `Erreur lors de l'envoi de l'email: ${error.message || 'Erreur inconnue'}` 
    }, { status: 500 });
  }
}