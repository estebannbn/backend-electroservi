import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const TrabajoSchema = z.object({
    fechaDesde: z.coerce.date({ message: 'La fecha y hora desde es obligatoria' }),
    fechaHasta: z.coerce.date({ message: 'La fecha y hora hasta es obligatoria' }).optional(),
    tecnicoId: z.number('El ID del técnico es obligatorio').int()
        .refine(async (tecnicoId) => {
            const tecnico = await prisma.tecnico.findUnique({ where: { id: tecnicoId } })
            return tecnico
        }, { message: 'El técnico no existe' }),
    servicioId: z.number('El ID del servicio es obligatorio').int()
        .refine(async (servicioId) => {
            const servicio = await prisma.servicio.findUnique({ where: { id: servicioId } })
            return servicio
        }, { message: 'El servicio no existe' })
})
export type TrabajoType = z.infer<typeof TrabajoSchema>