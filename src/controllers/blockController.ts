import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError} from 'zod'
import { blockSchema, findBlockIdSchema, updateBlockSchema} from "../model/blockDataTypes";
import { createBlock, findAllBlocks, findBlockId, updateBlockById } from "../services/blockService";


type Block = Prisma.BlockGetPayload<{}>


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


export const createBlockHandler =  async(req:Request, res:Response<ApiResponse<Block>>, next:NextFunction) =>{
   try {
      const validate = blockSchema.parse(req.body);
      const result  = await  createBlock(validate);
      if(!result){
        return res.status(200).json({success: true, message: 'No block found',data:result['']  });
      }
      res.status(201).json({success:result.success, message:result.message, data:result.passBlock})
   } catch (error) {
    if(error instanceof ZodError){
        const errorMessages = error.errors.map(err =>({
            field: err.path.join('.'),
            message: err.message
        }))
        res.status(400).json({success:false, message:'creating Block validation Fail', errors: errorMessages});
        return
    }
    if(error instanceof Error){
        res.status(400).json({success:false, message:error.message});
        return
    }
    next(error);
   }
}

export const  findBlockHandler =  async(req:Request, res:Response<ApiResponse<Block>>, next:NextFunction) =>{
   try {
      const validate = findBlockIdSchema.parse(req.body);
      const result  = await  findBlockId(validate);
      if(!result){
        return res.status(200).json({success: true, message: 'No block found',data:result['']  });
      }
      res.status(201).json({success:result.success, message:result.message, data:result.block})
   } catch (error) {
    if(error instanceof ZodError){
        const errorMessages = error.errors.map(err =>({
            field: err.path.join('.'),
            message: err.message
        }))
        res.status(400).json({success:false, message:'Finding Block validation Fail', errors: errorMessages});
        return
    }
    if(error instanceof Error){
        res.status(400).json({success:false, message:error.message});
        return
    }
    next(error);
   }
}

export const findAllBlocksHandler =  async(req:Request, res:Response<ApiResponse<Block[]>>, next:NextFunction) =>{
   try {
      const result  = await  findAllBlocks();
      if(!result){
        return res.status(200).json({success: true, message: 'No block found',data:result['']  });
      }
      res.status(201).json({success:result.success, message:result.message, data:result.blocks})
   } catch (error) {
    if(error instanceof ZodError){
        const errorMessages = error.errors.map(err =>({
            field: err.path.join('.'),
            message: err.message
        }))
        res.status(400).json({success:false, message:'Find All Block validation Fail', errors: errorMessages});
        return
    }
    if(error instanceof Error){
        res.status(400).json({success:false, message:error.message});
        return
    }
    next(error);
   }
}

export const updateBlockByIdHandler =  async(req:Request, res:Response<ApiResponse<Block>>, next:NextFunction) =>{
      try {
           const validate  = updateBlockSchema.parse(req.body);
           const  result = await updateBlockById(validate);

           if(!result){
            res.status(200).json({success:false, message:'no block can be found to be updated', data:result['']})
           }
           res.status(201).json({success:result.success, message:result.message, data:result.updateBock})
      } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            res.status(400).json({success:false, message:'Update Block validation Fail', errors: errorMessages});
            return
        }
        if(error instanceof Error){
            res.status(400).json({success:false, message:error.message});
            return
        }
        next(error);
      }
}