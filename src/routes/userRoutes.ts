import express from "express";
import { activateTokenHandler, createUserHandler, loginUserHandler, resetActivationTokenHandler, resetPasswordHandler, resetPasswordWithOTPHandler, updateUserHandler } from "../controllers/userControllers";

const router = express.Router();
//Post Requests
router.post('/register',  (req, res, next) => { createUserHandler(req, res, next).catch(next) });
router.post('/login',  (req, res, next) => { loginUserHandler(req, res, next).catch(next) });
router.post('/user/activate',  (req, res, next) => { activateTokenHandler(req, res, next).catch(next) });
router.post('/user/resetActivationToken',  (req, res, next) => { resetActivationTokenHandler(req, res, next).catch(next) });
router.post('/user/resetPasswordOTP',  (req, res, next) => { resetPasswordWithOTPHandler(req, res, next).catch(next) });
router.post('/user/resetPassword',  (req, res, next) => { resetPasswordHandler(req, res, next).catch(next) });
router.patch('/user/updateDetails',  (req, res, next) => { updateUserHandler(req, res, next).catch(next) });

export default router;