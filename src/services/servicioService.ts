import { PrismaClient, Prisma } from "@prisma/client";
import { ServicioType } from "../schema/servicioSchema";

const prisma = new PrismaClient();

export const obtenerServicio = async() => {
    const servicio = await prisma.servicio.findMany();
    return servicio;
}

export const crearServicio = async(data: ServicioType) => {
    const { itemsMaterial, itemsRepuesto, ...restoDatos } = data;
    
    const nuevoServicio = await prisma.servicio.create({
        data: {
            ...restoDatos,
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