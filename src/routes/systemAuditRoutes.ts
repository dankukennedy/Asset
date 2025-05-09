import express from 'express'
import { allSystemAuditHandler, createSystemAuditHandler, deleteAllSystemAuditHandler, deleteSystemAuditHandler, findSystemAuditHandler, updateSystemAuditHandler } from '../controllers/systemAuditController';

const router = express.Router();

router.post('/audit', (req, res, next)=>{ createSystemAuditHandler(req, res, next).catch(next)});
router.post('/findAudit', (req, res, next)=>{findSystemAuditHandler(req, res, next).catch(next)});
router.get('/allAudits', (req, res, next)=>{allSystemAuditHandler(req, res, next).catch(next)});
router.patch('/updateAudit', (req, res, next)=>{updateSystemAuditHandler(req, res, next).catch(next)});
router.delete('/deleteAudit', (req, res, next)=>{deleteSystemAuditHandler(req, res, next).catch(next)});
router.delete('/deleteAllAudits', (req, res, next)=>{ deleteAllSystemAuditHandler(req, res, next).catch(next)});

export default router