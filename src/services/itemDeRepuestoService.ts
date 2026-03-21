import { PrismaClient } from "@prisma/client"
import { ItemDeRepuestoType } from '../schema/itemDeRepuestoSchema';

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
