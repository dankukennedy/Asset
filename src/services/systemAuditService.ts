import prisma from '../catalyst/prisma';
import {SystemAudit} from '@prisma/client'
import { createSystemAuditSchemaInput, findSystemAuditSchemaInput, updateSystemAuditSchemaInput } from '../model/systemAuditDataTypes';


export const createSystemAudit = async(input:createSystemAuditSchemaInput):Promise<{success:boolean; message:string,systemAudit?:SystemAudit}>=>{
    try {
         const  findUser = await prisma.user.findUnique({
            where:{id:input.createdById}
         })
         if(!findUser){
            return {success:false, message:'No Created user found'}
         }
         const  findAsset = await prisma.asset.findUnique({
            where:{id:input.auditId}
         })
         if(!findAsset){
            return {success:false, message:'No assets found with specified id'}
         }
         const findAudit =  await prisma.systemAudit.findFirst({
            where:{auditId:input.auditId}
         })

         if(findAudit){
            return {success:false, message:'Assets audit already created found with specified id'}
         }
         const systemAudit = await prisma.systemAudit.create({
            data:{
                status:input.status,
                remarks:input.remarks,
                createdBy:{connect:{id:input.createdById}},
                audit:{connect:{id:input.auditId}}
            }
         })

        return {success:true, message:'Delete All System Audit ', systemAudit}
    } catch (error) {
        throw error
    }

}

export const findSystemAudit = async(input:findSystemAuditSchemaInput):Promise<{success:boolean; message:string,systemAudit?:SystemAudit}>=>{
    try {
   
         const  systemAudit = await prisma.systemAudit.findUnique({
            where:{id:input.id}, 
         })
         if(!systemAudit){
            return {success:false, message:'No System Audit found with specified id'}
         }

        return {success:true, message:'Delete All System Audit ', systemAudit}
    } catch (error) {
        throw error
    }

}

export const updateSystemAudit = async(input:updateSystemAuditSchemaInput):Promise<{success:boolean; message:string,systemAudit?:SystemAudit}>=>{
    try {
        const  findAudit = await prisma.systemAudit.findUnique({
            where:{id:input.id}
        })
        if(!findAudit){
            return {success:true, message:'System Audit id cannot found '}
        }
        const updataData = {
           ...( input.status && {status:input.status}),
           ...( input.remarks && {status:input.remarks}),
           ...( input.auditId && {audit:{connect:{id:input.auditId}}}),
           ...(input.createdById && {created:{connect:{id:input.createdById}}})
        }
        const systemAudit = await prisma.systemAudit.update({
            where:{id:input.id},
            data:updataData
        })
        return {success:true, message:'Delete All System Audit ', systemAudit}
    } catch (error) {
        throw error
    }

}

export const allSystemAudit = async():Promise<{success:boolean; message:string,systemAudit?:SystemAudit[]}>=>{
    try {
        const systemAudit = await prisma.systemAudit.findMany()
        if(!systemAudit) {
            return {success:false, message:' No System Audit not found ', systemAudit}
        }
        if(systemAudit.length===0){
            return {success:false, message:' No System Audit Records found ', systemAudit}
        }
        return {success:true, message:'Delete All System Audit ', systemAudit}
    } catch (error) {
        throw error
    }

}

export const deleteSystemAudit = async(input:findSystemAuditSchemaInput):Promise<{success:boolean; message:string,systemAudit?:SystemAudit}>=>{
    try {
        const findAudit = await prisma.systemAudit.findUnique({
            where:{id:input.id}
        })
        if(!findAudit){
            return {success:true, message:' System Audit id not found ', }
        }
        const systemAudit = await prisma.systemAudit.delete({
            where:{id:input.id}
        })
        return {success:true, message:'Delete All System Audit ', systemAudit}
    } catch (error) {
        throw error
    }

}

export const deleteAllSystemAudit = async():Promise<{success:boolean; message:string,systemAudit?:SystemAudit[]}>=>{
    try {
          const systemAudit = await prisma.systemAudit.deleteMany()
          if(!systemAudit){
            return {success:false, message:'All System Audit cannot be deleted'}
          }
          if(systemAudit.count===0){
            return { success:false, message:'No System Audit record found'}
          }
        return {success:true, message:'Delete All System Audit ', systemAudit:[]}
    } catch (error) {
        throw error
    }

}


