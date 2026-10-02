import { Router } from 'express';
import { crearItemDeMaterialController, obtenerItemDeMaterialController, editarItemDeMaterialController, eliminarItemDeMaterialController } from '../controllers/itemDeMaterialController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { ItemDeMaterialSchema } from '../schema/itemDeMaterialSchema.js';

const router = Router();

router.get('/', obtenerItemDeMaterialController);
router.post('/', validateSchema(ItemDeMaterialSchema), crearItemDeMaterialController);
router.put('/:servicioId/:materialId', validateSchema(ItemDeMaterialSchema), editarItemDeMaterialController);
router.delete('/:servicioId/:materialId', eliminarItemDeMaterialController);

export default router;

