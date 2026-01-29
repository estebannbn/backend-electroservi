import { PrismaClient } from "@prisma/client";
import { ElectrodomesticoType } from "../schema/electrodomesticoSchema";

const prisma = new PrismaClient();

export const obtenerElectrodomestico = async() => {
    const electrodomestico = await prisma.electrodomestico.findMany();
    return electrodomestico;
}
export const crearElectrodomestico = async(data: ElectrodomesticoType) => {
    const electrodomestico = await prisma.electrodomestico.create({
        data
    });
    return electrodomestico;
}