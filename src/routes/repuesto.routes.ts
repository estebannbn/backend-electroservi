import { Router } from "express";
import { crearRepuestoController, obtenerRepuestoController,  } from "../controllers/repuestoController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { repuestoSchema } from "../schema/repuestoSchema.js";

const router = Router();

router.get('/', obtenerRepuestoController);
router.post('/', validateSchema(repuestoSchema), crearRepuestoController);

export default router;