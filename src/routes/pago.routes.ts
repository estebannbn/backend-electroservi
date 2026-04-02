import { Router } from "express";
import { obtenerPagoController, crearPagoController } from "../controllers/pagoController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { PagoSchema } from "../schema/pagoSchema.js";

const router = Router();

router.get('/', obtenerPagoController);
router.post('/', validateSchema(PagoSchema), crearPagoController);

export default router;