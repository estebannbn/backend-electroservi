import { Router } from "express";
import { obtenerPagoController } from "../controllers/pagoController.js";

const router = Router();

router.get('/', obtenerPagoController);

export default router;