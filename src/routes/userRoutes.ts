import express from "express";
import { activateTokenHandler, createUserHandler, loginUserHandler } from "../controllers/userControllers";

const router = express.Router();
//Post Requests
router.post('/register',  (req, res, next) => {createUserHandler(req, res, next).catch(next) });
router.post('/login',  (req, res, next) => {loginUserHandler(req, res, next).catch(next) });
router.post('/user/activate',  (req, res, next) => {activateTokenHandler(req, res, next).catch(next) });

export default router;