import nodemailer from 'nodemailer';

export const enviarCredencialesTecnico = async (email: string, contraseñaGenerada: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
            port: Number(process.env.SMTP_PORT) || 2525,
            auth: {
                user: process.env.SMTP_USER || "",
                pass: process.env.SMTP_PASS || ""
            }
        });

        console.log('Enviando correo con credenciales de usuario: ' + process.env.SMTP_USER)
        console.log('Credenciales: ' + process.env.SMTP_USER)
        const info = await transporter.sendMail({
            from: `"ElectroServi" <${process.env.EMAIL_FROM || "no-reply@electroservi.com"}>`,
            to: email,
            subject: "Tus credenciales de acceso técnico - ElectroServi",
            text: `Hola,

Se ha creado tu cuenta de técnico en ElectroServi.

Tus datos de inicio de sesión son:
- Email: ${email}
- Contraseña: ${contraseñaGenerada}

Por favor, cambia tu contraseña una vez que ingreses al sistema.

Saludos,
El equipo de ElectroServi`
        });

        console.log("Mensaje enviado: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error enviando el correo:", error);
        // Retornamos null para que el controlador no falle la creación de usuario si falla el correo
        return null;
    }
};
