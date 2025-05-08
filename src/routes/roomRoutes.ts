import express from 'express'
import { createRoomHandler, deleteAllRoomHandler, deleteRoomHandler, findAllRoomsHandler, findRoomHandler, updateRoomHandler } from '../controllers/roomController';

const router = express.Router();
router.post('/createRoom', (req, res, next)=>{createRoomHandler(req, res, next).catch(next)});
router.get('/allAllRooms', (req, res, next)=>{findAllRoomsHandler(req, res, next).catch(next)});
router.post('/findRoom', (req, res, next)=>{findRoomHandler (req, res, next).catch(next)});
router.patch('/updateRoom', (req, res, next)=>{updateRoomHandler(req, res, next).catch(next)});
router.delete('/deleteAllRooms', (req, res, next)=>{deleteAllRoomHandler(req, res, next).catch(next)});
router.delete('/deleteRoom', (req, res, next)=>{deleteRoomHandler(req, res, next).catch(next)});

export default router