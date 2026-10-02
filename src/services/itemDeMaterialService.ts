import { PrismaClient } from "@prisma/client";
import { ItemDeMaterialType } from "../schema/itemDeMaterialSchema";

const prisma = new PrismaClient();

export const obtenerItemDeMaterial = async () => {
    const itemDeMaterial = await prisma.itemDeMaterial.findMany();
    return itemDeMaterial;
}
export const crearItemDeMaterial = async (data: ItemDeMaterialType) => {
    const itemDeMaterial = await prisma.itemDeMaterial.create({
        data
    });
    return itemDeMaterial;
}
export const editarItemDeMaterial = async (servicioId: number, materialId: number, data: ItemDeMaterialType) => {
    return await prisma.itemDeMaterial.update({
        where: { servicioId_materialId: { servicioId, materialId } },
        data
    });
}
export const eliminarItemDeMaterial = async (servicioId: number, materialId: number) => {
    return await prisma.itemDeMaterial.delete({
        where: { servicioId_materialId: { servicioId, materialId } }
    });
}
