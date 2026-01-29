import { Router } from "express";
import { crearElectrodomesticoController, obtenerElectrodomesticoController } from "../controllers/electrodomesticoController.js";
import { validateSchema } from "../middlewares/validateSchema";
import { ElectrodomesticoSchema } from "../schema/electrodomesticoSchema.js";

const router = Router();

router.get('/', obtenerElectrodomesticoController);
router.post('/', validateSchema(ElectrodomesticoSchema), crearElectrodomesticoController);

export default router;