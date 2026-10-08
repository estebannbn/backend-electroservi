import { Router } from "express";
import { obtenerServicioController, crearServicioController, finalizarServicioController, cambiarEstadoServicioController } from "../controllers/servicioController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { ServicioSchema } from "../schema/servicioSchema.js";
import checkAuthMiddleware from "../middlewares/checkAuthMiddleware.js";


const router = Router();

router.get('/', obtenerServicioController);
router.post('/', validateSchema(ServicioSchema), crearServicioController);
router.put('/:id/finalizar', checkAuthMiddleware, finalizarServicioController);
router.patch('/:id/estado', checkAuthMiddleware, cambiarEstadoServicioController);

export default router;