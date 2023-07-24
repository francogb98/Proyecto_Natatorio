import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// Genera un token de verificación con una duración específica
export const generateVerificationToken = () => {
  const token = jwt.sign({ data: "verification" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const emailRegistro = async (email, username, verificationToken) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Obtener la ruta absoluta del archivo actual
    // const currentFilePath = path.resolve(
    //   "server",
    //   "resolvers",
    //   "mutation",
    //   "middlewares",
    //   "archivo",
    //   "fichaMedica.pdf"
    // );

    // const pdfPath = path.join(path.dirname(currentFilePath), "fichaMedica.pdf");
    // // Leer el contenido del archivo PDF
    // const pdfData = fs.readFileSync(currentFilePath);
    // Enviar el correo electrónico
    const info = await transport.sendMail({
      from: '"Natatorio Olimpico - Administrador" <natatorio@administrador.com>',
      to: email,
      subject: "Natatorio - Confirma tu cuenta",
      text: "comprueba tu cuenta en Natatorio",
      html: `<p>Hola: ${username} Comprueba tu cuenta en Natatorio</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: </p>
        <a href="${process.env.FRONTEND_URL}/verificar-cuenta?token=${encodeURI(
        verificationToken
      )}">Comprobar Cuenta</a>
        <p>Si tú no creaste esta cuenta, puedes ignorar el mensaje</p>`,
      //     ,
      //   attachments: [
      //     {
      //       filename: "fichaMedica.pdf", // Nombre del archivo adjunto
      //       content: pdfData, // Contenido del archivo PDF
      //       contentType: "application/pdf", // Tipo de contenido del archivo PDF
      //     },
      //   ],
    });

    return true;

    // Realizar cualquier otra acción después de enviar el correo electrónico
  } catch (error) {
    throw new Error(error);
    // Manejar el error de envío de correo electrónico
  }
};
