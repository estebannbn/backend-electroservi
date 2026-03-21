import { z } from 'zod'

export const ItemDeRepuestoSchema = z.object({ 
    cantidadDeRepuesto: z.number('La cantidad es obligatoria').int().positive('La cantidad debe ser un número positivo'),
    repuestoId: z.number('El ID del repuesto es obligatorio').int().positive('El ID del repuesto debe ser un número positivo'),
    servicioId: z.number('El ID del servicio es obligatorio').int().positive('El ID del servicio debe ser un número positivo')
})

export type ItemDeRepuestoType = z.infer<typeof ItemDeRepuestoSchema>;
