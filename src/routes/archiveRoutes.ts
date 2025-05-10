import express from 'express'
import { allArchiveHandler,  createArchiveHandler,  deleteAllArchiveHandler, deleteArchiveHandler, findArchiveHandler, updateArchiveHandler } from '../controllers/archiveController';

const router = express.Router();
router.post('/archive', (req, res, next)=>{createArchiveHandler(req, res, next).catch(next)});
router.get('/allArchive', (req, res, next)=>{allArchiveHandler(req, res, next).catch(next)});
router.post('/findArchive', (req, res, next)=>{findArchiveHandler (req, res, next).catch(next)});
router.patch('/updateArchive', (req, res, next)=>{updateArchiveHandler(req, res, next).catch(next)});
router.delete('/deleteArchive', (req, res, next)=>{deleteAllArchiveHandler(req, res, next).catch(next)});
router.delete('/deleteArchive', (req, res, next)=>{deleteArchiveHandler(req, res, next).catch(next)});

export default router