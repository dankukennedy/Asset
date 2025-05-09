import express from 'express'
import { AllDecoHandler, createDecoHandler, deleteAllDecoHandler, deleteDecoHandler, fineDecoHandler, updateDecoHandler } from '../controllers/DecommissionController';

const router = express.Router();

router.post('/deco', (req, res, next)=>{createDecoHandler(req, res, next).catch(next)});
router.post('/findDeco', (req, res, next)=>{fineDecoHandler(req, res, next).catch(next)});
router.get('/allDeco', (req, res, next)=>{AllDecoHandler(req, res, next).catch(next)});
router.patch('/updateDeco', (req, res, next)=>{updateDecoHandler(req, res, next).catch(next)});
router.delete('/deleteDeco', (req, res, next)=>{deleteDecoHandler(req, res, next).catch(next)});
router.delete('/deleteAllDeco', (req, res, next)=>{deleteAllDecoHandler(req, res, next).catch(next)});

export default router