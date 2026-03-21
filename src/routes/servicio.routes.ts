import { Router } from "express";
import { obtenerServicioController, crearServicioController } from "../controllers/servicioController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { ServicioSchema } from "../schema/servicioSchema.js";


const router = Router();

router.get('/', obtenerServicioController);
router.post('/', validateSchema(ServicioSchema), crearServicioController);

export default router;