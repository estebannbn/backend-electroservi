// Validaciones con Zod
import {z} from 'zod'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const UsuarioSchema = z.object({
    nombre: z.string('El nombre es obligatorio'),
    apellido: z.string('El apellido es obligatorio'),
    cuil: z.stringFormat('cuil', /^(20|23|27|30|33|34)([0-9]{9}|-[0-9]{8}-[0-9])$/g, 'cuil invalido')
        .refine((cuil) => prisma.usuario.findUnique({where: {cuil}}), 'El cuil ya está en uso'),
    direccion: z.string('Dirección obligatoria'),
    telefono: z.stringFormat('telefono', /^[0-9]{9}$/, 'telefono invalido'),
    mail: z.email('mail invalido')
        .refine((mail) => prisma.usuario.findUnique({where: {mail}}), 'El mail ya está en uso'),
    contraseña: z.string()
        .min(8,'La contraseña debe tener al menos 8 caracteres')
        .regex(/(?=.*[a-z])/, 'La contraseña debe tener al menos una letra minuscula')
        .regex(/(?=.*[A-Z])/, 'La contraseña debe tener al menos una letra mayúscula')
        .regex(/(?=.*\d)/, 'La contraseña debe tener al menos un número')
})

export type UsuarioType = z.infer<typeof UsuarioSchema>