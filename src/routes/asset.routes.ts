// src/routes/asset.routes.ts
import { Router } from 'express';
import * as assetController from '../controllers/asset.controller';

const router = Router();

router.post('/assets', assetController.createAsset);
router.get('/assets', assetController.getAllAssets);
// router.get('/assets/:id', assetController.getAssetById);
// router.put('/assets/:id', assetController.updateAsset);
// router.delete('/assets/:id', assetController.deleteAsset);
// router.get('/assets/class/:class', assetController.getAssetsByClass);

export default router;