import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { ItemDeMaterialSchema } from './itemDeMaterialSchema'
import { ItemDeRepuestoSchema } from './itemDeRepuestoSchema'
import { ElectrodomesticoSchema } from './electrodomesticoSchema'
const prisma = new PrismaClient()

const ElectrodomesticoNestedSchema = ElectrodomesticoSchema.omit({ clienteId: true })

export const ServicioSchema = z.object({
    fechaLlegadaEstimada: z.coerce.date({ message: "Ingrese una fecha de llegada estimada" }).optional(),
    fechaLlegadaReal: z.coerce.date({ message: "Ingrese una fecha de llegada real" }).optional(),
    fechaDiagnostico: z.coerce.date({ message: "Ingrese una fecha de diagnóstico" }).optional(),
    fechaReparacion: z.coerce.date({ message: "Ingrese una fecha de reparación" }).optional(),
    fechaRetiro: z.coerce.date({ message: "Ingrese una fecha de retiro" }).optional(),
    fechaFin: z.coerce.date({ message: "Ingrese una fecha de finalización" }).optional(),
    comentario: z.string().optional(),
    tecnicoId: z.number().int().refine(async (tecnicoId) => {
        const tecnico = await prisma.tecnico.findUnique({ where: { id: tecnicoId } })
        return tecnico
    }, { message: 'El técnico no existe' }).optional(),

    clienteId: z.number().int().refine(async (clienteId) => {
        const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } })
        return cliente
    }
        , { message: 'El cliente no existe' }),
    tipoTrabajoId: z.number().int().refine(async (tipoTrabajoId) => {
        const tipoTrabajo = await prisma.tipoTrabajo.findUnique({ where: { id: tipoTrabajoId } })
        return tipoTrabajo
    }, { message: 'El tipo de trabajo no existe' }).optional(),

    electrodomesticoId: z.number().int().refine(async (electrodomesticoId) => {
        const electrodomestico = await prisma.electrodomestico.findUnique({ where: { id: electrodomesticoId } })
        return electrodomestico
    }, { message: 'El electrodoméstico no existe' }).optional(),

    electrodomestico: ElectrodomesticoNestedSchema.optional(),

    itemsMaterial: z.array(ItemDeMaterialSchema.omit({ servicioId: true })).optional(),

    itemsRepuesto: z.array(ItemDeRepuestoSchema.omit({ servicioId: true })).optional()
}).refine((data) => data.electrodomesticoId || data.electrodomestico, {
    message: 'Debe proporcionar electrodomesticoId o electrodomestico',
    path: ['electrodomesticoId'],
})

export type ServicioType = z.infer<typeof ServicioSchema>