import express from 'express'
import { allDepartmentHandler, createDepartmentHandler, deleteAllDepartmentHandler, deleteDepartmentHandler, findDepartmentByIdHandler, updateDepartmentHandler } from '../controllers/deptController';

const router = express.Router();

router.post('/department', (req, res, next)=>{createDepartmentHandler(req, res, next).catch(next)});
router.post('/findDepartment', (req, res, next)=>{findDepartmentByIdHandler(req, res, next).catch(next)});
router.get('/allDepartment', (req, res, next)=>{allDepartmentHandler(req, res, next).catch(next)});
router.patch('/updateDepartment', (req, res, next)=>{ updateDepartmentHandler(req, res, next).catch(next)});
router.delete('/deleteDepartment', (req, res, next)=>{ deleteDepartmentHandler(req, res, next).catch(next)});
router.delete('/deleteAllDepartment', (req, res, next)=>{ deleteAllDepartmentHandler(req, res, next).catch(next)});


export default router