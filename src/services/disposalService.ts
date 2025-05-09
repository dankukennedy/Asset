import prisma from '../catalyst/prisma';
import {Disposal} from '@prisma/client'
import { createDisposalSchemaInput, findDisposalSchemaInput, updateDisposalSchemaInput } from '../model/disposalDataTypes';

export const createDisposal = async(input:createDisposalSchemaInput):Promise<{success:boolean; message:string; disposal?:Disposal}>=>{
     try {
         const findAsset = await prisma.asset.findUnique({
            where:{id:input.disposeId}
         })
         if(!findAsset){
            return {success:false, message:'Asset to Dispose Id not found'}
         }
         const disposal = await prisma.disposal.create({
            data:{
                userTransferTo:input.userTransferTo,
                createdBy:{connect:{id:input.createdById}},
                dispose:{connect:{id:input.disposeId}},
                disposeDate:input.disposeDate
            }
         })
        return {success:true, message:'Disposal Created Successfully', disposal}
     } catch (error) {
        throw error
     }
}
export const findDisposal = async(input:findDisposalSchemaInput):Promise<{success:boolean; message:string; disposal?:Disposal}>=>{
     try {
            const disposal = await prisma.disposal.findUnique({
                where:{id:input.id}
            })
            if(!disposal){
                return {success:false, message:'Disposal Id Not Found '}
            }
        return {success:true, message:'Disposal Created Successfully', disposal}
     } catch (error) {
        throw error
     }
}
export const allDisposal = async():Promise<{success:boolean; message:string; disposal?:Disposal[]}>=>{
     try {
         const disposal = await prisma.disposal.findMany()

         if(disposal.length===0){
            return {success:false, message:'No Disposal Record Found'}
         }
         if(!disposal){
            return {success:false, message:'No Disposal Found '}
         }

        return {success:true, message:'Disposal Created Successfully', disposal}
     } catch (error) {
        throw error
     }
}
export const updateDisposal = async(input:updateDisposalSchemaInput):Promise<{success:boolean; message:string; disposal?:Disposal}>=>{
     try {
         const findDisposal = await prisma.disposal.findUnique({
            where:{id:input.id}
         })
         if(!findDisposal){
            return {success:false, message:'No Disposal Id Found'}
         }
            const updateData = {
                ...(input.createdById && {createdBy:{connect:{id:input.createdById}}}),
                ...(input.disposeId && {dispose:{connect:{id:input.disposeId}}}),
                ...(input.userTransferTo && {userTransferTo:input.userTransferTo}),
                ...(input.disposeDate && {disposeDate:input.disposeDate}),
            }

            const disposal =  await prisma.disposal.update({
                where:{id:input.id},
                data:updateData,
            })

        return {success:true, message:'Disposal Updated Successfully', disposal}
     } catch (error) {
        throw error
     }
}
export const deleteDisposal = async(input:findDisposalSchemaInput):Promise<{success:boolean; message:string; disposal?:Disposal}>=>{
     try {
           const FindDisposal = await prisma.disposal.findUnique({
            where:{id:input.id}
           })
           if(!FindDisposal){
            return {success:false, message:'No Disposal Id Found', }
           }
           const disposal = await prisma.disposal.delete({
            where:{id:input.id}
           })
        return {success:true, message:'Disposal Deleted Successfully', disposal}
     } catch (error) {
        throw error
     }
}
export const deleteAllDisposal = async():Promise<{success:boolean; message:string; disposal?:Disposal[]}>=>{
     try {
         const disposal = await prisma.disposal.deleteMany()
         if(!disposal){
            return { success:false, message:'Delete All Disposal Fail'}
         }
         if(disposal.count===0){
            return { success:false, message:' Disposal Record Found To be Deleted'}
         }
        return {success:true, message:'Disposal Created Successfully', disposal:[]}
     } catch (error) {
        throw error
     }
}