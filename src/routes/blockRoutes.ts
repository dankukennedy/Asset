import express from 'express'
import { createBlockHandler, findAllBlocksHandler, findBlockHandler, updateBlockByIdHandler } from '../controllers/blockController';

const router = express.Router();

router.post('/block', (req, res, next)=>{createBlockHandler(req, res, next).catch(next)});
router.post('/findBlock', (req, res, next)=>{findBlockHandler(req, res, next).catch(next)});
router.get('/allBlocks', (req, res, next)=>{findAllBlocksHandler(req, res, next).catch(next)});
router.patch('/updateBlocks', (req, res, next)=>{updateBlockByIdHandler(req, res, next).catch(next)});

export default router