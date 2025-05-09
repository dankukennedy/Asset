import express from 'express'
import { createDisposalHandler, deleteAllDisposalHandler, deleteDisposalHandler, findDisposalHandler, updateDisposalHandler } from '../controllers/disposalController';

const router = express.Router();
router.post('/disposal', (req, res, next)=>{createDisposalHandler(req, res, next).catch(next)});
router.get('/allDisposal', (req, res, next)=>{findDisposalHandler(req, res, next).catch(next)});
router.post('/findDisposal', (req, res, next)=>{findDisposalHandler (req, res, next).catch(next)});
router.patch('/updateDisposal', (req, res, next)=>{updateDisposalHandler(req, res, next).catch(next)});
router.delete('/deleteAllDisposal', (req, res, next)=>{deleteAllDisposalHandler(req, res, next).catch(next)});
router.delete('/deleteDisposal', (req, res, next)=>{deleteDisposalHandler(req, res, next).catch(next)});

export default router