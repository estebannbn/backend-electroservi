// Validaciones con Zod
import {z} from 'zod'

const estadosTecnico = ['DISPONIBLE', 'OCUPADO']

const validarContraseña =  (contraseña: string) :boolean =>{
    if(contraseña.length < 8) return false;
    if (!/[a-z]/.test(contraseña)) return false
    if (!/[A-Z]/.test(contraseña)) return false
    if (!/\d/.test(contraseña)) return false
    return true
}

const errorContraseña =  (contraseña: string) :string =>{
    if(contraseña.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (!/[a-z]/.test(contraseña)) return 'La contraseña debe tener al menos una letra minuscula'
    if (!/[A-Z]/.test(contraseña)) return 'La contraseña debe tener al menos una letra mayúscula'
    if (!/\d/.test(contraseña)) return 'La contraseña debe tener al menos un número'
    return 'error'
}

const Usuario = z.object({
    nombre: z.string('El nombre es obligatorio'),
    apellido: z.string('El apellido es obligatorio'),
    cuil: z.stringFormat('cuil', /^(20|23|27|30|33|34)([0-9]{9}|-[0-9]{8}-[0-9])$/g, 'cuil invalido'),
    direccion: z.string('Dirección obligatoria'),
    telefono: z.stringFormat('telefono', /^[0-9]{9}$/, 'telefono invalido'),
    mail: z.email('mail invalido'),
    contraseña: z.string()
        .min(8,'La contraseña debe tener al menos 8 caracteres')
        .regex(/(!=.*[a-z])/, 'La contraseña debe tener al menos una letra minuscula')
        .regex(/(!=.*[A-Z])/, 'La contraseña debe tener al menos una letra mayúscula')
        .regex(/!=.\d]/, 'La contraseña debe tener al menos un número'),
    estado: z.enum(estadosTecnico, 'Estado tecnico invalido').optional()
})

export type UsuarioType = z.infer<typeof Usuario>