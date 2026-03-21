import { PrismaClient } from "@prisma/client";
import { ItemDeMaterialType } from "../schema/itemDeMaterialSchema";

const prisma = new PrismaClient();

export const obtenerItemDeMaterial = async() => {
    const itemDeMaterial = await prisma.itemDeMaterial.findMany();
    return itemDeMaterial;
}
export const crearItemDeMaterial = async(data: ItemDeMaterialType) => {
    const itemDeMaterial = await prisma.itemDeMaterial.create({
        data
    });
    return itemDeMaterial;
}
