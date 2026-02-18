import { Router } from "express";
import { crearMaterialController, obtenerMaterialController } from "../controllers/materialController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { materialSchema } from "../schema/materialSchema.js";


const router = Router();

router.get('/', obtenerMaterialController);
router.post('/', validateSchema(materialSchema), crearMaterialController);

export default router;