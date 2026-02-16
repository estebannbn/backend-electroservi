import {z} from "zod";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export const PagoSchema = z.object({
    monto: z.number('El monto es obligatorio'),
    tecnicoId: z.number('El ID del técnico es obligatorio').int()
        .refine(async (tecnicoId) => {
            const tecnico = await prisma.tecnico.findUnique({where: {id: tecnicoId}})
            return tecnico}, {message: 'El técnico no existe'})

})

export type PagoType = z.infer<typeof PagoSchema>