import prisma from '../catalyst/prisma';
import { Decommission } from '@prisma/client';
import { createDecoSchemaInput, findDecoSchemaInput, updateDecoSchemaInput } from '../model/decommissionDataTypes';


export const createDeco = async(input:createDecoSchemaInput):Promise<{success:boolean; message:string; deco?:Decommission}> =>{
    try {
         const findUser = await prisma.user.findUnique({
            where:{id:input.createdById}
         })
         if(!findUser){
           return {success:false, message:'Created by User Does not exist'}
         }
         const deco = await prisma.decommission.create({
            data:{
                dateOfDec:input.dateOfDec,
                reason:input.reason,
                createdBy:{connect:{id:input.createdById}},
                decommission:{connect:{id:input.decoId}}
            }
         })
        return {success:true, message:'Decommission Successfully Created',deco}
    } catch (error) {
        throw error
    }
}

export const fineDeco = async(input:findDecoSchemaInput):Promise<{success:boolean; message:string; deco?:Decommission}> =>{
    try {
        const deco = await  prisma.decommission.findUnique({
            where:{id:input.id}
        })
         if(!deco){
            return {success:false, message:'No Decommission Id found '}
         }
        return {success:true, message:'Decommission Successfully Created', deco}
    } catch (error) {
        throw error
    }
}

export const AllDeco = async():Promise<{success:boolean; message:string; deco?:Decommission[]}> =>{
    try {
         const deco = await prisma.decommission.findMany()
         if(!deco){
            return {success:false, message:'No Decommission Found'}
         }
         if(deco.length===0){
            return {success:false, message:'No Decommission Record Found'}
         }

        return {success:true, message:'All Decommission Successfully Found',deco}
    } catch (error) {
        throw error
    }
}

export const deleteDeco = async(input:findDecoSchemaInput):Promise<{success:boolean; message:string; deco?:Decommission}> =>{
    try {
        const deco = await prisma.decommission.findUnique({
            where:{id:input.id}
        })
        if(!deco){
            return {success:false, message:'No Decommission Id Found'}
        }
        return {success:true, message:'Decommission Successfully Deleted', deco}
    } catch (error) {
        throw error
    }
}

export const deleteAllDeco = async():Promise<{success:boolean; message:string; deco?:Decommission[]}> =>{
    try {
          const deco = await prisma.decommission.deleteMany()
          if(deco.count===0){
            return {success:false, message:'No Decommission Records Found'}
          }
          if(!deco){
            return {success:false, message:'No Decommission Records Found'}
          }
        return {success:true, message:'All Decommission Successfully Deleted', deco:[]}
    } catch (error) {
        throw error
    }
}

export const updateDeco = async(input:updateDecoSchemaInput):Promise<{success:boolean; message:string; deco?:Decommission}> =>{
    try {
          const findDeco = await prisma.decommission.findUnique({
            where:{id:input.id}
           })
           if(!findDeco){
            return {success:false, message:'Decommission Id Not Found'}
           }
           
           const updateData ={
            ...(input.reason && {reason:input.reason}),
            ...(input.dateOfDec && {dateOfDec:input.dateOfDec}),
            ...(input.createdById && {createdBy:{connect:{id:input.createdById}}}),
            ...(input.decoId && {decommission:{connect:{id:input.decoId}}}),
           }

         const deco = await prisma.decommission.update({
            where:{id:input.id},
            data:updateData,
         })
        return {success:true, message:'Decommission Successfully Updated',deco}
    } catch (error) {
        throw error
    }
}

