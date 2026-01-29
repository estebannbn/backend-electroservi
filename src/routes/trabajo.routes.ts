import { Router } from "express";
import { crearTrabajoController, obtenerTrabajoController } from "../controllers/trabajoController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { TrabajoSchema } from "../schema/trabajoSchema.js";


const router = Router();

router.get('/', obtenerTrabajoController);
router.post('/', validateSchema(TrabajoSchema), crearTrabajoController);
export default router;