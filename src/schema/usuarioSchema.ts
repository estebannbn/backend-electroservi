// Validaciones con Zod
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const UsuarioSchemaBase = z.object({
    nombre: z.string('El nombre es obligatorio'),
    apellido: z.string('El apellido es obligatorio'),
    cuil: z.stringFormat('cuil', /^(20|23|27|30|33|34)([0-9]{9}|-[0-9]{8}-[0-9])$/g, 'cuil invalido'),
    direccion: z.string('Dirección obligatoria'),
    telefono: z.stringFormat('telefono', /^[0-9]{10}$/, 'El telefono debe tener 10 números exactos, sin el 0 ni el 15'),
    mail: z.email('mail invalido'),
    contraseña: z.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/(?=.*[a-z])/, 'La contraseña debe tener al menos una letra minuscula')
        .regex(/(?=.*[A-Z])/, 'La contraseña debe tener al menos una letra mayúscula')
        .regex(/(?=.*\d)/, 'La contraseña debe tener al menos un número')
})

export const getUsuarioSchema = (tipo: string) => UsuarioSchemaBase.extend({
    cuil: UsuarioSchemaBase.shape.cuil.refine(async (cuil) => {
        const users = await prisma.usuario.findMany({ where: { cuil }, include: { tecnico: true, cliente: true, administrador: true } })
        if (users.length === 0) return true;
        
        const roleAlreadyExists = users.some(user => {
            if (tipo === 'tecnico' && user.tecnico) return true;
            if (tipo === 'cliente' && user.cliente) return true;
            if (tipo === 'administrador' && user.administrador) return true;
            return false;
        });
        
        return !roleAlreadyExists;
    }, { message: 'Este CUIL ya tiene una cuenta registrada con este rol' }),
    mail: UsuarioSchemaBase.shape.mail.refine(async (mail) => {
        const user = await prisma.usuario.findUnique({ where: { mail } })
        return !user;
    }, { message: 'El mail ya está en uso por otra cuenta' })
})

// Mantenemos UsuarioSchema como alias de la base por compatibilidad general si se requiere en otros lados
export const UsuarioSchema = UsuarioSchemaBase;

export type UsuarioType = z.infer<typeof UsuarioSchemaBase>

export const EditarUsuarioSchema = UsuarioSchemaBase.omit({ cuil: true, mail: true }).partial()
export type EditarUsuarioType = z.infer<typeof EditarUsuarioSchema>