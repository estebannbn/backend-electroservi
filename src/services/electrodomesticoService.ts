import { PrismaClient } from "@prisma/client";
import { CrearElectrodomesticoInput } from "../Interfaces/electrodomestico";

const prisma = new PrismaClient();

export const obtenerElectrodomestico = async() => {
    const electrodomestico = await prisma.electrodomestico.findMany();
    return electrodomestico;
}
export const crearElectrodomestico = async(data: CrearElectrodomesticoInput) => {
    const electrodomestico = await prisma.electrodomestico.create({
        data
    });
    return electrodomestico;
}