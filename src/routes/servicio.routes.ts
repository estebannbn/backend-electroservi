import { Router } from "express";
import { obtenerServicioController } from "../controllers/servicioController.js";



const router = Router();

router.get('/', obtenerServicioController);

export default router;