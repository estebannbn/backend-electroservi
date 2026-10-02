import { PrismaClient } from "@prisma/client"
import { ItemDeRepuestoType } from '../schema/itemDeRepuestoSchema.js';

const prisma = new PrismaClient();

export const obtenerItemDeRepuesto = async () => {
    const itemDeRepuesto = await prisma.itemDeRepuesto.findMany();
    return itemDeRepuesto;
}
export const crearItemDeRepuesto = async (data: ItemDeRepuestoType) => {
    const itemDeRepuesto = await prisma.itemDeRepuesto.create({
        data
    });
    return itemDeRepuesto;
}
export const editarItemDeRepuesto = async (servicioId: number, repuestoId: number, data: ItemDeRepuestoType) => {
    return await prisma.itemDeRepuesto.update({
        where: { servicioId_repuestoId: { servicioId, repuestoId } },
        data
    });
}
export const eliminarItemDeRepuesto = async (servicioId: number, repuestoId: number) => {
    return await prisma.itemDeRepuesto.delete({
        where: { servicioId_repuestoId: { servicioId, repuestoId } }
    });
}
