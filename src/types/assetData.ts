import prima from "../catalyst/prisma"
import { AssetClass, AssetStatus } from '@prisma/client';


export interface CreateAssetData {
    assetTag: string;
    class: AssetClass;
    model: string;
    manufacturer: string;
    serialNumber: string;
    status?: AssetStatus;
    purchaseDate?: Date;
    purchasePrice?: number;
    warrantyExpiry?: Date;
    location?: string;
    assignedTo?: string;
    notes?: string;
    // Computer fields
    cpu?: string;
    ram?: string;
    storage?: string;
    os?: string;
    // Network fields
    ports?: number;
    macAddress?: string;
    ipAddress?: string;
    // Printer fields
    consumables?: string;
    resolution?: string;
}

export type CreateAssetDataInput = Partial<CreateAssetData >;