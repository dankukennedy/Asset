import express from 'express'
import { allTransfersHandler, createTransferHandler, deleteAllTransfersHandler, deleteTransferHandler, findTransferHandler, updateTransferHandler } from '../controllers/transferController';

const router = express.Router();

router.post('/transfer', (req, res, next)=>{createTransferHandler(req, res, next).catch(next)});
router.post('/findTransfer', (req, res, next)=>{findTransferHandler(req, res, next).catch(next)});
router.get('/allTransfers', (req, res, next)=>{ allTransfersHandler(req, res, next).catch(next)});
router.patch('/updateTransfer', (req, res, next)=>{updateTransferHandler(req, res, next).catch(next)});
router.delete('/deleteTransfer', (req, res, next)=>{deleteTransferHandler(req, res, next).catch(next)});
router.delete('/deleteAllTransfers', (req, res, next)=>{deleteAllTransfersHandler(req, res, next).catch(next)});

export default router