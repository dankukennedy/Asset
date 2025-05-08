import express from 'express'
import { createAssetUserHandler, deleteAllAssetUserHandler, deleteAssetUserHandler, findAllAssetUserHandler, findAssetUserHandler, updateAssetUserHandler } from '../controllers/assetUserController';

const router = express.Router();

router.post('/assetUser', (req, res, next)=>{createAssetUserHandler(req, res, next).catch(next)});
router.delete('/deleteAssetUser', (req, res, next)=>{deleteAssetUserHandler(req, res, next).catch(next)});
router.delete('/deleteAllAssetUser', (req, res, next)=>{deleteAllAssetUserHandler(req, res, next).catch(next)});
router.post('/findAssetUser', (req, res, next)=>{findAssetUserHandler(req, res, next).catch(next)});
router.get('/findAllAssetUser', (req, res, next)=>{findAllAssetUserHandler(req, res, next).catch(next)});
router.patch('/updateAssetUser', (req, res, next)=>{updateAssetUserHandler(req, res, next).catch(next)});

export default router