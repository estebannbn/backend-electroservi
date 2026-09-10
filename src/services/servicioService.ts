import { PrismaClient, Prisma } from "@prisma/client";
import { ServicioType } from "../schema/servicioSchema";

const prisma = new PrismaClient();

// Trae también los datos de electrodoméstico
export const obtenerServicio = async (clienteId?: number, tecnicoId?: number) => {
    const whereClause: any = {};
    if (clienteId) whereClause.clienteId = clienteId;
    if (tecnicoId) whereClause.tecnicoId = tecnicoId;
    const servicio = await prisma.servicio.findMany({
        where: whereClause,
        include: { electrodomestico: true }
    });
    return servicio;
}

export const crearServicio = async (data: ServicioType) => {
    let { itemsMaterial, itemsRepuesto, electrodomestico, clienteId, tecnicoId, tipoTrabajoId, electrodomesticoId, ...restoDatos } = data;

    if (!tecnicoId) {
        const tecnicoDisponible = await prisma.tecnico.findFirst({
            where: { estado: 'DISPONIBLE' }
        });

        if (tecnicoDisponible) {
            tecnicoId = tecnicoDisponible.id;
            await prisma.tecnico.update({
                where: { id: tecnicoId },
                data: { estado: 'OCUPADO' }
            });
        }
    }

    const nuevoServicio = await prisma.servicio.create({
        data: {
            ...restoDatos,
            cliente: { connect: { id: clienteId } },
            ...(tecnicoId ? { tecnico: { connect: { id: tecnicoId } } } : {}),
            ...(tipoTrabajoId ? { tipoTrabajo: { connect: { id: tipoTrabajoId } } } : {}),
            ...(electrodomestico ? { electrodomestico: { create: electrodomestico } } : {}),
            ...(electrodomesticoId && !electrodomestico ? { electrodomestico: { connect: { id: electrodomesticoId } } } : {}),
            ...(itemsMaterial && itemsMaterial.length > 0 ? { itemsMaterial: { createMany: { data: itemsMaterial } } } : {}),
            ...(itemsRepuesto && itemsRepuesto.length > 0 ? { itemsRepuesto: { createMany: { data: itemsRepuesto } } } : {})
        }
    });
    return nuevoServicio;
}