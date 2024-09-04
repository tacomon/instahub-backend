const nodemailer = require('nodemailer');
const habitacion = require('../models/habitacion');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'angelvelazsalazar@gmail.com',
    pass: 'vicx jntz lyrs fxbd'
  }
});

const enviarCorreoRegistro = async (email, token) => {
  try {
    const mailOptions = {
      from: 'InstaHub <angelvelazsalazar@gmail.com>',
      to: email,
      subject: 'Bienvenido a InstaHub',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          text-align: center;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
      </style>
        </head>
        <body>
          <div class="container">
            <h1>¡Bienvenido a InstaHub!</h1>
            <p>Gracias por registrarte en nuestra tienda InstaHub.</p>
            <p>Estamos emocionados de tenerte como parte de nuestra comunidad. Esperamos que encuentres todo lo que necesitas para consentir a tus lado viajero InstaHub.</p>
            <p>¡Que tengas un excelente día!</p>
            <p>El equipo de InstaHub</p>
          </div>
        </body>
        </html>
      `
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
    console.log('Correo electrónico de registro enviado correctamente a:', email);
  } catch (error) {
    console.error('Error al enviar el correo electrónico de registro:', error);
  }
};

const enviarCorreoInicioSesion = async (email, token) => {
  try {

    if (token === undefined) {
      console.error('Error: el token es undefined');
      return;
    }
    const mailOptions = {
      from: 'InstaHub <angelvelazsalazar@gmail.com>',
      to: email,
      subject: 'Inicio de sesión en InstaHub',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          text-align: center;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
      </style>
        </head>
        <body>
          <div class="container">
            <h1>¡Bienvenido de vuelta a InstaHub!</h1>
            <p>Hemos recibido una solicitud de inicio de sesión en tu cuenta.</p>
            <p>Aquí está tu token de acceso:</p>
            <h2>${token}</h2>
            <p>Utiliza este token para acceder a tu cuenta y continuar con tu experiencia de compra.</p>
            <p>Si no has sido tú quien ha solicitado el inicio de sesión, por favor, ignora este correo electrónico y actualiza tu contraseña por seguridad.</p>
            <p>¡Que tengas un excelente día!</p>
            <p>El equipo de InstaHub</p>
          </div>
        </body>
        </html>
      `
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
    console.log('Correo electrónico de inicio de sesión enviado correctamente a:', email);
  } catch (error) {
    console.error('Error al enviar el correo electrónico de inicio de sesión:', error);
    // Manejo de errores
  }
};

const enviarCorreoEstatusHabitacion = async (data) => {
  try {
    const mailOptions = {
      from: 'InstaHub <angelvelazsalazar@gmail.com>',
      to: data.correo,
      subject: `Retroalimentación a su habitación ${data.nombreHabitacion} de InstaHub`,
      html: createPlantillaHabitacion(data)
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
    console.log('Se ha notificado el estatus de la habitación a:', data.correo);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
}

const createPlantillaHabitacion = (mensaje) => {
  return `<!DOCTYPE html>
        <html>
        <head>
        <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          text-align: center;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
      </style>
        </head>
        <body>
          <div class="container">
            <h1>¡Estimado ${ mensaje.nombre }!</h1>
            <p>Gracias por preferirnos al momento de publicar tu habitación.</p>
            <p>Le hacemos saber que su habitación ha sido ${ mensaje.estatus }.</p>
            <p>Le compartimos los comentarios brindados por el administrador: </p>
            <p>${ mensaje.comentarios }</p>
            <br>
            <br>
            <p>¡Que tengas un excelente día!</p>
            <p>El equipo de InstaHub</p>
          </div>
        </body>
        </html>
      `
}

module.exports = {
  enviarCorreoInicioSesion,
  enviarCorreoRegistro,
  enviarCorreoEstatusHabitacion
};