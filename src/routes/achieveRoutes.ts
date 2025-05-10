import express from 'express'
import { allAchieveHandler, createAchieveHandler, deleteAchieveHandler, deleteAllAchieveHandler, findAchieveHandler, updateAchieveHandler } from '../controllers/achieveController';

const router = express.Router();
router.post('/achieve', (req, res, next)=>{createAchieveHandler(req, res, next).catch(next)});
router.get('/allAchieve', (req, res, next)=>{allAchieveHandler(req, res, next).catch(next)});
router.post('/findAchieve', (req, res, next)=>{findAchieveHandler (req, res, next).catch(next)});
router.patch('/updateAchieve', (req, res, next)=>{updateAchieveHandler(req, res, next).catch(next)});
router.delete('/deleteAllAchieve', (req, res, next)=>{deleteAllAchieveHandler(req, res, next).catch(next)});
router.delete('/deleteAchieve', (req, res, next)=>{deleteAchieveHandler(req, res, next).catch(next)});

export default router