import { Router } from "express";
import { obtenerMaterialController } from "../controllers/materialController.js";


const router = Router();

router.get('/', obtenerMaterialController);

export default router;