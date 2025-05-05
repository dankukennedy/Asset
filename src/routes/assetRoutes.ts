import express from 'express'
import { allAssetsHandler, createAssetHandler } from '../controllers/assetController';

const router = express.Router();

router.post('/asset', (req, res, next)=>{createAssetHandler(req, res, next).catch(next)});

router.get('/getAllAsset', (req, res, next)=>{allAssetsHandler(req, res, next).catch(next)});



export default router