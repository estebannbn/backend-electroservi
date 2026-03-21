import { z } from 'zod'

export const ItemDeMaterialSchema = z.object({ 
    cantidadDeMaterial: z.number('La cantidad es obligatoria').int().positive('La cantidad debe ser un número positivo'),
    materialId: z.number('El ID del material es obligatorio').int().positive('El ID del material debe ser un número positivo'),
    servicioId: z.number('El ID del servicio es obligatorio').int().positive('El ID del servicio debe ser un número positivo')})

export type ItemDeMaterialType = z.infer<typeof ItemDeMaterialSchema>;
