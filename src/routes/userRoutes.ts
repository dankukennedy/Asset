import express from "express";
import { createUserHandler } from "../controllers/userControllers";

const router = express.Router();
//Post Requests
router.post('/register',  (req, res, next) => {createUserHandler(req, res, next).catch(next) });

export default router;