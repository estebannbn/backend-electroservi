// Validaciones con Zod
import {z} from 'zod'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const ElectrodomesticoSchema = z.object({
    tipo: z.enum(["AIRE_ACONDICIONADO", "LAVARROPAS", "HELADERA"], 'No es un tipo de electrodoméstico válido'),
    modelo: z.string ('Falta escribir el modelo'),
    marca: z.string ('Falta especificar la marca'),
    clienteId: z.int ('Falta especificar cliente').refine(async (data) => {
        const user = await prisma.cliente.findUnique({where: {id:data}})
        return user}, {message: 'Cliente inválido'})

})

export type ElectrodomesticoType = z.infer<typeof ElectrodomesticoSchema>