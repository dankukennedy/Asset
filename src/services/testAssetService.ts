// src/services/asset.service.ts
import { PrismaClient, Asset, AssetClass, AssetStatus } from '@prisma/client';
import { CreateAssetDto, UpdateAssetDto } from '../dtos/assetDto';

const prisma = new PrismaClient();

export const createAsset = async (data: CreateAssetDto): Promise<Asset> => {
  return await prisma.asset.create({
    data: {
      ...data,
      status: data.status || AssetStatus.ACTIVE
    }
  });
};

export const getAssets = async (filters?: {
  class?: AssetClass;
  status?: AssetStatus;
  location?: string;
}): Promise<Asset[]> => {
  return await prisma.asset.findMany({
    where: filters
  });
};

export const getAssetById = async (id: string): Promise<Asset | null> => {
  return await prisma.asset.findUnique({
    where: { id }
  });
};

export const updateAsset = async (
  id: string,
  data: UpdateAssetDto
): Promise<Asset> => {
  return await prisma.asset.update({
    where: { id },
    data
  });
};

export const deleteAsset = async (id: string): Promise<Asset> => {
  return await prisma.asset.delete({
    where: { id }
  });
};

// Specialized queries
export const getAssetsByClass = async (assetClass: AssetClass): Promise<Asset[]> => {
  return await prisma.asset.findMany({
    where: { class: assetClass }
  });
};

export const getAssetsDueForMaintenance = async (): Promise<Asset[]> => {
  return await prisma.asset.findMany({
    where: { 
      status: AssetStatus.ACTIVE,
      warrantyExpiry: {
        lte: new Date(new Date().setMonth(new Date().getMonth() + 1)) // Expiring in next month
      }
    }
  });
};