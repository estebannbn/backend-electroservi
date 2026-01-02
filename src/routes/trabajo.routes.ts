import { Router } from "express";
import { obtenerTrabajoController } from "../controllers/trabajoController.js";


const router = Router();

router.get('/', obtenerTrabajoController);

export default router;