import express from 'express'
import { createAllocationHandler, deleteAllAllocationHandler, deleteAllocationHandler, findAllAllocationHandler, findAllocationHandler, updateAllocationHandler } from '../controllers/allocationController';

const router = express.Router();

router.post('/allocation', (req, res, next)=>{createAllocationHandler(req, res, next).catch(next)});
router.post('/findAllocation', (req, res, next)=>{findAllocationHandler(req, res, next).catch(next)});
router.get('/allAllocation', (req, res, next)=>{findAllAllocationHandler(req, res, next).catch(next)});
router.patch('/updateAllocation', (req, res, next)=>{updateAllocationHandler(req, res, next).catch(next)});
router.delete('/deleteAllocation', (req, res, next)=>{deleteAllocationHandler(req, res, next).catch(next)});
router.delete('/deleteAllAllocation', (req, res, next)=>{deleteAllAllocationHandler(req, res, next).catch(next)});

export default router