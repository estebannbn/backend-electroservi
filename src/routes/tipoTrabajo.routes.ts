import { Router } from "express";
import { obtenerTipoTrabajoController } from "../controllers/tipoTrabajoController.js";


const router = Router();

router.get('/', obtenerTipoTrabajoController);

export default router;