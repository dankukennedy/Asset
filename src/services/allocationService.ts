import prisma from '../catalyst/prisma';
import {Allocation} from '@prisma/client'
import { createAllocationSchemaInput, findAllocationSchemaInput, updateAllocationSchemaInput } from '../model/allocationDataTypes';

export const createAllocation = async(input:createAllocationSchemaInput):Promise<{success:boolean; message:string,allocation?:Allocation}> =>{
    try {

        const findAsset = await prisma.allocation.findUnique({
            where:{assetId:input.assetId}
        })
        if(findAsset){
            return {success:false, message:'Asset already Allocated found'}
        }

       const allocation = await prisma.allocation.create({
        data:{
            userDeptId: input.userDeptId,
            unit: input.unit,
            assetId: input.usernameId,
            usernameId: input.usernameId,
            labelId: input.labelId,
        },include:{label:true}
       })

       if(!allocation){
        return {success:false, message:'Allocation cannot be created'}
       }

        return {success:true, message:'Allocation Successfully created', allocation}
    } catch (error:unknown) {
        throw error
    }
}

export const findAllocation = async(input:findAllocationSchemaInput):Promise<{success:boolean; message:string,allocation?:Allocation}> =>{
    try {

         const allocation =  await prisma.allocation.findUnique({
            where:{id:input.id},include:{label:true}
         })
         if(!allocation){
            return {success:false, message:'Allocation not found with Id'}
         }

        return {success:true, message:'Allocation Successfully created', allocation}
    } catch (error:unknown) {
        throw error
    }
}

export const findAllAllocation = async():Promise<{success:boolean; message:string,allocation?:Allocation[]}> =>{
    try {

         const allocation =  await prisma.allocation.findMany({
            include:{label:true}
         })
         if(!allocation){
            return {success:false, message:'All Allocations not be found'}
         }
         
         if(allocation.length === 0){
            return {success:false, message:'No Allocations not found '}
         }

        return {success:true, message:'Allocation Successfully created', allocation}
    } catch (error:unknown) {
        throw error
    }
}


export const updateAllocation = async(input:updateAllocationSchemaInput):Promise<{success:boolean; message:string,allocation?:Allocation}> =>{
    try {
        const findAllocation = await prisma.allocation.findUnique({
            where:{id:input.id},include:{label:true}
        })

        if(!findAllocation){
            return {success:false, message:'Allocation not found'}
        }
       
        const updateData = {
            ...(input.assetId && { asset: { connect: { id: input.assetId } } }),
            ...(input.labelId && { room: { connect: { id: input.labelId } } }),
            ...(input.usernameId && { assetUser: { connect: { id: input.usernameId } } }),
            ...(input.userDeptId && { department: { connect: { id: input.userDeptId } } }),
            ...(input.unit && { unit: input.unit }),
          };


          // Check if there's actually data to update
          if (Object.keys(updateData).length === 0) {
            return { success: false, message: 'No valid fields provided for update' };
          }
      
          // Perform the update
          const allocation = await prisma.allocation.update({
            where: { id: input.id },
            data: updateData,
            include:{label:true}
          });

          
        return {success:true, message:'Allocation Successfully created', allocation}
    } catch (error:unknown) {
        throw error
    }
}


export const deleteAllocation = async(input:findAllocationSchemaInput):Promise<{success:boolean; message:string,allocation?:Allocation}> =>{
    try {

     const findAllocation  = await prisma.allocation.findUnique({
        where:{ id: input.id},include:{label:true}
     })

     if(!findAllocation){
        return {success:false, message:'Allocation not found'}
     }

     const allocation =  await prisma.allocation.delete({
        where:{id :input.id}
     })

        return {success:true, message:'Allocation Successfully created', allocation}
    } catch (error:unknown) {
        throw error
    }
}


export const deleteAllAllocation = async():Promise<{success:boolean; message:string,allocation?:Allocation[]}> =>{
    try {
        
        const  allocation = await prisma.allocation.deleteMany();

        if(allocation.count===0){
           return {success:false, message:'No Allocation Found to be deleted', }
        }
        if(allocation){
           return {success:false, message:'All Allocation cannot be deleted', }
        }

        return {success:true, message:'Allocation Successfully created', allocation:[]}
    } catch (error:unknown) {
        throw error
    }
}


