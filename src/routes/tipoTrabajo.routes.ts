import { Router } from "express";
import { obtenerTipoTrabajoController, crearTipoTrabajoController } from "../controllers/tipoTrabajoController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { TipoTrabajoSchema } from "../schema/tipoTrabajoSchema.js";

const router = Router();

router.get('/', obtenerTipoTrabajoController);
router.post('/', validateSchema(TipoTrabajoSchema), crearTipoTrabajoController);

export default router;