import { Router } from "express";
import { crearMaterialController, editarMaterialController, obtenerMaterialController } from "../controllers/materialController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { materialSchema } from "../schema/materialSchema.js";


const router = Router();

router.get('/', obtenerMaterialController);
router.post('/', validateSchema(materialSchema), crearMaterialController);
router.put('/:id', validateSchema(materialSchema), editarMaterialController);

export default router;