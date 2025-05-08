import prisma from '../catalyst/prisma';
import { Block } from '@prisma/client';
import { blockSchemaInput, findBlockIdSchemaInput, updateBlockSchemaInput } from '../model/blockDataTypes';

export const createBlock = async(input:blockSchemaInput):Promise<{success:boolean; message:string; passBlock:Block}> => {
  try {
        const block = await prisma.block.findUnique({
            where:{name:input.name}
        })

        if(block) throw new Error('block entered already existed');

        const passBlock = await prisma.block.create({
            data: {
                name: input.name,
                createdBy: {
                  connect: {
                    id: input.userId
                  }
                }
              },
              include: {
                createdBy: true
              }


        })

    return {success:true, message:'block created successfully', passBlock}
  } catch (error) {
    throw error
  }

}

export const findBlockId =  async(input:findBlockIdSchemaInput):Promise<{success:boolean; message:string;  block?:Block}> => {
    try {
           const block =  await  prisma.block.findUnique({
            where:{id:input.id},
            include:{departments:{
                select:{
                    name:true
                }
            }}
           })

           if(!block) return {success:false, message:'block not found'}

        return {success:true, message:'block find successfully', block}
    } catch (error:unknown) {
        throw error
    }
}

export const findAllBlocks =  async():Promise<{success:boolean; message:string;  blocks?:Block[]}> => {
    try {
           const blocks =  await  prisma.block.findMany({
            include:{departments:{
                select:{
                    name:true,
                },
                orderBy: { name: 'asc' }
            }}
           })

           if(!blocks) return {success:false, message:'block not found'}

        return {success:true, message:'block find successfully', blocks}
    } catch (error:unknown) {
        throw error
    }
}


export const updateBlockById =  async(input:updateBlockSchemaInput):Promise<{success:boolean; message:string;  updateBock?:Block}> => {
    try {
         const findBlock = await prisma.block.findUnique({
            where:{id:input.id}
         })
         if(!findBlock) return {success:false,message:'block cannot be found with id'}

         const updateBock = await prisma.block.update({
            where:{id:input.id},
            data:{
                ...(input.name && { name: input.name }),
            }
         })
        return { success:true, message:'block updated successfully', updateBock}
    } catch (error:unknown) {
        throw error
    }
}

export const deleteBlockById =  async(input:findBlockIdSchemaInput):Promise<{success:boolean; message:string;  block?:Block}> => {

    try {
        const findBlock = await prisma.block.findUnique({
            where:{id:input.id}
        })
         if(!findBlock) {
            return {success:false, message:'no block Id found with specific'}
         }
          const block = await prisma.block.delete({
            where:{id:input.id}
          })
        return { success:true, message:'Block deleted successfully',block}
    } catch (error:unknown) {
        throw error
    }
}

export const deleteAllBlocks = async():Promise<{success: boolean; message: string;  blocks?: Block[];}> => {
    try {
      const blocks =  await prisma.block.deleteMany();
      if(blocks.count === 0)
        {
             return{success:false, message:'No block records to be deleted'}
         }

      if(!blocks)
        { 
            return{success:false, message:' No blocks to be deleted'}
        }

        return {success: true, message: 'All blocks deleted successfully', blocks: []}
    } catch (error:unknown) {
        throw error
    }
}
