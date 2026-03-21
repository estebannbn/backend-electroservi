import { Router } from 'express';
import { crearItemDeMaterialController, obtenerItemDeMaterialController } from '../controllers/itemDeMaterialController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { ItemDeMaterialSchema } from '../schema/itemDeMaterialSchema.js';

const router = Router();

router.get('/', obtenerItemDeMaterialController);
router.post('/', validateSchema(ItemDeMaterialSchema), crearItemDeMaterialController);

export default router;

