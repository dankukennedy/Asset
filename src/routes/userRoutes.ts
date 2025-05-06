import express from "express";
import { activateTokenHandler, allUsersHandler, createUserHandler, deleteAllUsersHandler, deleteUserByIdHandler, findUserByIdHandler, loginUserHandler, resetActivationTokenHandler, resetPasswordHandler, resetPasswordWithOTPHandler, updateUserHandler } from "../controllers/userControllers";

const router = express.Router();
//Post Requests
router.post('/register',  (req, res, next) => { createUserHandler(req, res, next).catch(next) });
router.post('/login',  (req, res, next) => { loginUserHandler(req, res, next).catch(next) });
router.post('/user/activate',  (req, res, next) => { activateTokenHandler(req, res, next).catch(next) });
router.post('/user/resetActivationToken',  (req, res, next) => { resetActivationTokenHandler(req, res, next).catch(next) });
router.post('/user/resetPasswordOTP',  (req, res, next) => { resetPasswordWithOTPHandler(req, res, next).catch(next) });
router.post('/user/resetPassword',  (req, res, next) => { resetPasswordHandler(req, res, next).catch(next) });
router.patch('/user/updateDetails',  (req, res, next) => { updateUserHandler(req, res, next).catch(next) });
router.post('/user/findUser',  (req, res, next) => { findUserByIdHandler(req, res, next).catch(next) });
router.get('/user/allUser',  (req, res, next) => { allUsersHandler(req, res, next).catch(next) });
router.delete('/user/deleteUser',  (req, res, next) => { deleteUserByIdHandler(req, res, next).catch(next) });
router.delete('/user/deleteAllUser',  (req, res, next) => { deleteAllUsersHandler(req, res, next).catch(next) });

export default router;