import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const TipoTrabajoSchema = z.object({
    denominacion: z.string('La denominación es obligatoria').min(1, 'La denominación no puede estar vacía'),
    precio: z.number('El precio es obligatorio').positive('El precio debe ser un número positivo'),
    porcentajeTecnico: z.number('El porcentaje para el técnico es obligatorio').min(0, 'El porcentaje para el técnico debe ser al menos 0').max(100, 'El porcentaje para el técnico no puede ser mayor a 100'),
    porcentajeRepuesto: z.number('El porcentaje para el repuesto es obligatorio').min(0, 'El porcentaje para el repuesto debe ser al menos 0').max(100, 'El porcentaje para el repuesto no puede ser mayor a 100')})

export type TipoTrabajoType = z.infer<typeof TipoTrabajoSchema>

