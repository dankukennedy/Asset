import express from 'express'
import { allAssetsHandler, createAssetHandler, deleteAssetByIdHandler, findAssetByIdHandler, updateAssetByIdHandler } from '../controllers/assetController';

const router = express.Router();

router.post('/asset', (req, res, next)=>{createAssetHandler(req, res, next).catch(next)});

router.get('/getAllAsset', (req, res, next)=>{allAssetsHandler(req, res, next).catch(next)});
router.post('/getAssetById', (req, res, next)=>{findAssetByIdHandler(req, res, next).catch(next)});
router.delete('/delAssetById', (req, res, next)=>{deleteAssetByIdHandler(req, res, next).catch(next)});
router.patch('/updateAssetById', (req, res, next)=>{updateAssetByIdHandler(req, res, next).catch(next)});



export default router