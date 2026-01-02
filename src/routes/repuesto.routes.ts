import { Router } from "express";
import { obtenerRepuestoController } from "../controllers/repuestoController.js";


const router = Router();

router.get('/', obtenerRepuestoController);

export default router;