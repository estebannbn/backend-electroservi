import { PrismaClient, Prisma } from "@prisma/client";
import { ServicioType } from "../schema/servicioSchema";

const prisma = new PrismaClient();

// Trae también los datos de electrodoméstico
export const obtenerServicio = async (clienteId?: number) => {
    const whereClause = clienteId ? { clienteId } : {};
    const servicio = await prisma.servicio.findMany({
        where: whereClause,
        include: { electrodomestico: true }
    });
    return servicio;
}

export const crearServicio = async (data: ServicioType) => {
    const { itemsMaterial, itemsRepuesto, electrodomestico, ...restoDatos } = data;

    const nuevoServicio = await prisma.servicio.create({
        data: {
            ...restoDatos,
            electrodomestico: electrodomestico
                ? { create: electrodomestico }
                : undefined,
            itemsMaterial: itemsMaterial && itemsMaterial.length > 0 ? {
                createMany: { data: itemsMaterial }
            } : undefined,
            itemsRepuesto: itemsRepuesto && itemsRepuesto.length > 0 ? {
                createMany: { data: itemsRepuesto }
            } : undefined
        } as Prisma.ServicioUncheckedCreateInput
    });
    return nuevoServicio;
}