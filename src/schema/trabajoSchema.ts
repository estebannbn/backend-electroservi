import {z} from 'zod'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const TrabajoSchema = z.object({
    fechaDesde: z.string('La fecha y hora desde es obligatoria'),
    fechaHasta: z.string('La fecha y hora hasta es obligatoria'),
    tecnicoId: z.number('El ID del técnico es obligatorio').int()
        .refine(async (tecnicoId) => {
            const tecnico = await prisma.tecnico.findUnique({where: {id: tecnicoId}})
            return tecnico
        }, {message: 'El técnico no existe'})})
export type TrabajoType = z.infer<typeof TrabajoSchema>