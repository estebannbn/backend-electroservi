import { Request, Response } from "express";
import { crearServicio, finalizarServicio, obtenerServicio } from "../services/servicioService.js";
import { ServicioType } from "../schema/servicioSchema.js";

// Trae los servicios por cliente
// Podria ser modificado si los CU lo requieren
export const obtenerServicioController = async (_req: Request, res: Response) => {
    const clienteId = _req.query.clienteId ? parseInt(_req.query.clienteId as string) : undefined;
    const tecnicoId = _req.query.tecnicoId ? parseInt(_req.query.tecnicoId as string) : undefined;
    const id = _req.query.id ? parseInt(_req.query.id as string) : undefined;
    const tecnicoEmail = _req.query.tecnicoEmail as string | undefined;
    const servicio = await obtenerServicio(clienteId, tecnicoId, id, tecnicoEmail);
    res.json(servicio);
}

export const crearServicioController = async (_req: Request<null, null, ServicioType>, res: Response) => {
    try {
        const servicio = await crearServicio(_req.body);
        res.status(201).json(servicio);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el servicio' });
    }
}

export const finalizarServicioController = async (
    req: Request<{ id: string }, unknown, { comentario?: string }>,
    res: Response
) => {
    if (req.user?.tipo !== 'tecnico') {
        return res.status(403).json({ error: 'Solo el técnico asignado puede finalizar el servicio' });
    }

    const servicioId = Number(req.params.id);
    if (!Number.isInteger(servicioId) || servicioId <= 0) {
        return res.status(400).json({ error: 'ID de servicio inválido' });
    }

    if (req.body?.comentario !== undefined && typeof req.body.comentario !== 'string') {
        return res.status(400).json({ error: 'El comentario debe ser texto' });
    }

    try {
        const servicio = await finalizarServicio(servicioId, req.user.id, req.body?.comentario?.trim());
        if (!servicio) {
            return res.status(404).json({ error: 'No hay un trabajo activo asignado para este servicio' });
        }
        return res.json({ servicio });
    } catch (error) {
        console.error('Error al finalizar servicio:', error);
        return res.status(500).json({ error: 'No se pudo finalizar el servicio' });
    }
}