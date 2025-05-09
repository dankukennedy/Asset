import prisma from '../catalyst/prisma';
import { Transfer } from '@prisma/client';
import { createTransferSchemaInput, findTransferSchemaInput, updateTransferSchemaInput } from '../model/transferDataTypes';

export const createTransfer = async(input:createTransferSchemaInput):Promise<{success:boolean; message:string,transfer?: Transfer}> =>{
    try {

        const findAssetUser = await prisma.assetUser.findUnique({
            where:{id:input.userTransferToId}
        })
        console.log(input.userTransferToId)
        if(!findAssetUser){
            return { success:false, message:`Asset user to transfer to does not exist with Id`,}
        }


        const transfer =  await prisma.transfer.create({
            data:{
                userTransferTo:{ connect:{id:input.userTransferToId}},
                transferDate: input.transferDate,
                createdBy:{ connect:{id: input.createdById}},
            },include: {
                userTransferTo: true,
                createdBy: true
              }
        })

         return { success:true, message:'Asset Transfer to Asset User Successfully', transfer}
    } catch (error:unknown) {
        throw error
    }
}


export const findTransfer = async(input:findTransferSchemaInput):Promise<{success:boolean; message:string,transfer?: Transfer}> =>{
    try {
          const transfer =  await prisma.transfer.findUnique({
            where:{id: input.id}, include:{userTransferTo:true,},
          })
          if(!transfer){
            return { success:false, message:'Transfer does not Exist'}
          }

        return { success:true, message:'Transfer Successfully Found', transfer}
    } catch (error:unknown) {
        throw error
    }
}


export const updateTransfer = async(input:updateTransferSchemaInput):Promise<{success:boolean; message:string,transfer?: Transfer}> =>{
    try {
            const transferExist = await prisma.transfer.findUnique({
                where:{id: input.id}
            })
            if(!transferExist){
                return { success:false, message:'Transfer Id does not exist'}
            }

        const updateData = {
                ...(input.userTransferToId && {userTransferTo: {connect:{id:input.userTransferToId}} }),
                ...(input.createdById && {createdBy: {connect:{id:input.createdById}} }),
                ...(input.transferDate && {transferDate:input.transferDate }), 
          }

          // Check if there's actually data to update
          if (Object.keys(updateData).length === 0) {
            return { success: false, message: 'No valid fields provided for update' };
          }
            const transfer = await prisma.transfer.update({
                where:{id:input.id},
                data:updateData,
            })
        return { success:true, message:'Transfer Updated Successfully', transfer}
    } catch (error:unknown) {
        throw error
    }
}


export const deleteTransfer = async(input:findTransferSchemaInput):Promise<{success:boolean; message:string,transfer?: Transfer}> =>{
    try {
         const transfer = await prisma.transfer.findUnique({
            where:{id: input.id},include:{userTransferTo:true,}
         })
         if(!transfer){
            return { success:false, message:'Transfer id does not exist'}
         }
        return { success:true, message:' Transfer Deleted Successfully', transfer}
    } catch (error:unknown) {
        throw error
    }
}


export const allTransfers = async():Promise<{success:boolean; message:string,transfer?: Transfer[]}> =>{
    try {
        const transfer = await prisma.transfer.findMany({
            include:{userTransferTo:true,}
        })
        if(!transfer){
            return { success:false, message:'Transfers cannot be found'}
        }
        if(transfer.length===0){
            return { success:false, message:'No Transfers records can be found ', transfer}
        }
        return { success:true, message:'All Transfers Found Successfully', transfer}
    } catch (error:unknown) {
        throw error
    }
}


export const deleteAllTransfers = async():Promise<{success:boolean; message:string,transfer?: Transfer[]}> =>{
    try {
           const transfer = await prisma.transfer.deleteMany()
           if(!transfer){
            return { success:false, message:'All Transfers cannot be deleted'}
           }
           if(transfer.count===0){
            return { success:false, message:'No Transfers Found be deleted'}
           }
        return { success:true, message:'All Transfers Deleted Successfully', transfer:[]}
    } catch (error:unknown) {
        throw error
    }
}

