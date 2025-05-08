import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError} from 'zod'
import { createRoomSchema, findRoomSchema, updateRoomSchema } from "../model/roomDataTypes";
import { createRoom, deleteAllRoom, deleteRoom, findAllRooms, findRoom, updateRoom } from "../services/roomService";

type Rooms = Prisma.RoomsGetPayload<{}>


  type ApiResponse<T = any> = {
    success: boolean;
     message: string;
     data?: T;
    asset?: T | T[];
    errors?: Array<{
      field: string;
      message: string;
    }>;
};

export const createRoomHandler  = async(req:Request, res:Response<ApiResponse<Rooms>>, next:NextFunction) =>{
    try {

        const validate =  createRoomSchema.parse(req.body)
        const result = await createRoom(validate)
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message})
          }
         return  res.status(201).json({success:result.success, message:result.message, data:result.room})
      } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return res.status(400).json({success:false, message:'Create Room validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}
export const  findRoomHandler  = async(req:Request, res:Response<ApiResponse<Rooms>>, next:NextFunction) =>{
    try {

        const validate =  findRoomSchema.parse(req.body)
        const result = await  findRoom(validate)
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message})
          }
         return  res.status(201).json({success:result.success, message:result.message, data:result.room})
      } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return res.status(400).json({success:false, message:'Create Room validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}
export const updateRoomHandler  = async(req:Request, res:Response<ApiResponse<Rooms>>, next:NextFunction) =>{
    try {

        const validate =  updateRoomSchema.parse(req.body)
        const result = await updateRoom(validate)
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message})
          }
         return  res.status(201).json({success:result.success, message:result.message, data:result.room})
      } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return res.status(400).json({success:false, message:'Create Room validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}
export const findAllRoomsHandler  = async(req:Request, res:Response<ApiResponse<Rooms[]>>, next:NextFunction) =>{
    try {

        const result = await findAllRooms()
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message})
          }
         return  res.status(201).json({success:result.success, message:result.message, data:result.rooms})
      } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return res.status(400).json({success:false, message:'Create Room validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}
export const deleteRoomHandler  = async(req:Request, res:Response<ApiResponse<Rooms>>, next:NextFunction) =>{
    try {

        const validate =  findRoomSchema.parse(req.body)
        const result = await  deleteRoom(validate)
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message})
          }
         return  res.status(201).json({success:result.success, message:result.message, data:result.room})
      } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return res.status(400).json({success:false, message:'Create Room validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}
export const deleteAllRoomHandler  = async(req:Request, res:Response<ApiResponse<Rooms[]>>, next:NextFunction) =>{
    try {


        const result = await deleteAllRoom()
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message})
          }
         return  res.status(201).json({success:result.success, message:result.message, data:result.rooms})
      } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return res.status(400).json({success:false, message:'Create Room validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}