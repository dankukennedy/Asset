import express from 'express'
import { allReportHandler, createReportHandler, deleteAllReportHandler, deleteReportHandler, findReportHandler, updateReportHandler } from '../controllers/reportController';

const router = express.Router();
router.post('/report', (req, res, next)=>{createReportHandler(req, res, next).catch(next)});
router.get('/allReport', (req, res, next)=>{allReportHandler(req, res, next).catch(next)});
router.post('/findReport', (req, res, next)=>{findReportHandler (req, res, next).catch(next)});
router.patch('/updateReport', (req, res, next)=>{updateReportHandler(req, res, next).catch(next)});
router.delete('/deleteAllReport', (req, res, next)=>{deleteAllReportHandler(req, res, next).catch(next)});
router.delete('/deleteReport', (req, res, next)=>{deleteReportHandler(req, res, next).catch(next)});

export default router