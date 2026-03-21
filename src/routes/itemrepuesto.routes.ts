import { Router } from 'express';
import { crearItemDeRepuestoController, obtenerItemDeRepuestoController } from '../controllers/itemDeRepuestoController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { ItemDeRepuestoSchema } from '../schema/itemDeRepuestoSchema.js';

const router = Router();

router.get('/', obtenerItemDeRepuestoController);
router.post('/', validateSchema(ItemDeRepuestoSchema), crearItemDeRepuestoController);

export default router;