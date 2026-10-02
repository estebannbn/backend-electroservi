import { Router } from 'express';
import { crearItemDeRepuestoController, obtenerItemDeRepuestoController, editarItemDeRepuestoController, eliminarItemDeRepuestoController } from '../controllers/itemDeRepuestoController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { ItemDeRepuestoSchema } from '../schema/itemDeRepuestoSchema.js';

const router = Router();

router.get('/', obtenerItemDeRepuestoController);
router.post('/', validateSchema(ItemDeRepuestoSchema), crearItemDeRepuestoController);
router.put('/:servicioId/:repuestoId', validateSchema(ItemDeRepuestoSchema), editarItemDeRepuestoController);
router.delete('/:servicioId/:repuestoId', eliminarItemDeRepuestoController);

export default router;