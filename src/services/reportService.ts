import prisma from '../catalyst/prisma';
import {Report} from '@prisma/client'
import {  } from '../model/archiveDataTypes';
import { createReportSchemaInput, findReportSchemaInput, updateReportSchemaInput } from '../model/reportDataTypes';

export const  createReport = async(input:createReportSchemaInput):Promise<{success:boolean; message:string; report?:Report}> =>{
   try {
       const asset = await prisma.asset.findUnique({
        where:{id:input.reportId}
       })
       if(!asset){
        return {success:false, message:'Asset Id Found'}
       }
       const user = await prisma.user.findUnique({
        where:{id:input.createdById}
       })
       if(!user){
        return {success:false, message:'Create By user not found'}
       }
       const report = await prisma.report.create({
        data:{
            createdById:input.createdById,
             name:input.name,
             reportId:input.reportId
        }
       })

    return  {success:true, message:'Report Successfully create', report}
   } catch (error) {
     throw error
   }
}
export const  findReport = async(input:findReportSchemaInput):Promise<{success:boolean; message:string; report?:Report}> =>{
   try {
     const report = await prisma.report.findUnique({
        where:{id:input.id}
       })
       if(!report){
         return {success:false, message:'No Report Id Found'}
       }

    return  {success:true, message:'Report Successfully create', report}
   } catch (error) {
     throw error
   }
}
export const  allReport = async():Promise<{success:boolean; message:string; report?:Report[]}> =>{
   try {
      const report = await prisma.report.findMany()
      if(!report){
        return { success:false, message:'All Report cannot be Deleted'}
      }
      if(report.length===0){
        return {success:false, message:'No Report Found'}
      }

    return  {success:true, message:'Report Successfully create', report}
   } catch (error) {
     throw error
   }
}
export const  updateReport = async(input:updateReportSchemaInput):Promise<{success:boolean; message:string; report?:Report}> =>{
   try {
        const findReport =   await prisma.report.findUnique({
            where:{id:input.id}
        })
        if(!findReport){
            return { success:false, message:'No Report Id found '}
        }
         const updateData = {
            // createdById: string;
            // reportId
            ...(input.name && {name:input.name}),
            ...(input.createdById && {createdBy:{connect:{id:input.createdById}}}),
            ...(input.reportId && {report:{connect:{id:input.reportId}}}),
         }

         const report = await prisma.report.update({
            where:{id:input.id},
            data:updateData,
         })

    return  {success:true, message:'Report Successfully create', report}
   } catch (error) {
     throw error
   }
}



export const  deleteReport = async(input:findReportSchemaInput):Promise<{success:boolean; message:string; report?:Report}> =>{
   try {
       const report = await prisma.report.delete({
        where:{id:input.id}
       })
       if(!report){
         return {success:false, message:'No Report Id Found'}
       }

    return  {success:true, message:'Report Successfully create', report}
   } catch (error) {
     throw error
   }
}
export const  deleteAllReport = async():Promise<{success:boolean; message:string; report?:Report[]}> =>{
   try {
       const report = await prisma.report.deleteMany()
       if(!report){
        return { success:false, message:'All Report not deleted'}
       }
       if(report.count===0){
        return {success:false, message:'No Report Record Found'}
       }

    return  {success:true, message:'Report Successfully create', report:[]}
   } catch (error) {
     throw error
   }
}