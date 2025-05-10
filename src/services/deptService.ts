import prisma from '../catalyst/prisma';
import { deptSchemaInput, findDeptIdSchemaInput, updateDeptSchemaInput } from '../model/deptDataTypes';
import {Department} from '@prisma/client'

export const createDepartment = async(input:deptSchemaInput):Promise<{success:boolean; message:string; department?:Department}> => {
    try {
         const findDept = await prisma.department.findUnique({
            where:{name:input.name}
         })

         if(findDept) throw new Error('department name already exist');
         const blockExists = await prisma.block.findUnique({
            where: { id: input.blockId }
          });
          if (!blockExists) {
            return {success:false, message:`Block with ID ${input.blockId} not found`}
          }
          const userExists = await prisma.user.findUnique({
            where: { id: input.userId }
          });
          if (!userExists) {
            return {success:false, message:`User with ID ${input.userId} not found`}
          }
         const department = await prisma.department.create({
            data: {
                name: input.name,
                blockId: input.blockId,
                createdById: input.userId
              },
              include: {
                createdBy: true,
                deptBlock: true
              }
         })


        return {success:true, message:'department created successfully', department}
    } catch (error) {
        throw error
    }
}

export  const findDepartmentById = async(input:findDeptIdSchemaInput):Promise<{success:boolean; message:string; department?:Department}> => {
    try {
        const department = await prisma.department.findUnique({
            where:{id:input.id},
            include:{
                deptBlock:{
                    select:{
                        name:true
                    },
                }

            }

        })

        if(!department) return {success:false, message:'cannot find department with that id '}

        return {success:true, message:'find department successfully',department}
    } catch (error) {
        throw error
    }
}

export const allDepartment = async():Promise<{success:boolean; message:string; departments?:Department[]}> => {
    try {
         const departments = await prisma.department.findMany({

            include: {
                 deptBlock:{
                    select:{
                      name:true
                   }
               }
          },
            orderBy: { name: 'asc' }

         })
          if(!departments) return { success:false, message:'cannot find all departments'}

          return {success:true, message:'successfully find all department', departments}
    } catch (error) {
        throw error
    }
}

export const updateDepartment = async(input:updateDeptSchemaInput):Promise<{success:boolean; message:string; department?:Department}> => {
    try {
        const findDept = await prisma.department.findUnique({
            where:{id:input.id}
        })
         if(!findDept) throw new Error('department cannot be found with that id')

        const department =  await prisma.department.update({
            where:{id:input.id},
            data:{
                ...(input.name && { name: input.name }),
                ...(input.blockId && { blockId: input.blockId })
            },include:{deptBlock:{select:{name:true}}}
        })
        return { success:true, message:'department updated successfully ',department}
    } catch (error) {
    throw error
    }
}

export const deleteDepartment = async(input:findDeptIdSchemaInput):Promise<{success:boolean; message:string; department?:Department}> => {
    try {
         const findDept = await prisma.department.findUnique({
            where:{id:input.id},include:{deptBlock:{select:{name:true}}}
         })
         if(!findDept){
            return { success:false, message:' no department found with Id'}
         }

         const department = await prisma.department.delete({
            where:{id:input.id},include:{deptBlock:{select:{name:true}}}
         })

        return {success:true, message:'department deleted successfully',department}
    } catch (error:unknown) {
        throw error
    }
}

export const deleteAllDepartment = async():Promise<{success:boolean; message:string; departments?:Department[]}> => {
     try {
         const departments = await prisma.department.deleteMany();

         if(departments.count ===0 ){
            return {success:false, message:'No Department records to be deleted'}
         }
         if(!departments) {
            return {success:false, message:'All Department Not Deleted'}
         }

         return{ success:true, message:'All Department Deleted Successfully', departments:[]}
     } catch (error:unknown) {
        throw error
     }
}