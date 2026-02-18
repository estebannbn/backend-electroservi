import { z } from 'zod'

export const materialSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    cantidadActual: z.number().min(1, "La cantidad actual es requerida y debe ser 1 como minimo"),
    cantidadAlerta: z.number().min(1, "La cantidad de alerta es requerida y debe ser 1 como minimo"),
    precioVentaActual: z.number("El precio de venta actual es requerido"),
})

export type MaterialType = z.infer<typeof materialSchema>;