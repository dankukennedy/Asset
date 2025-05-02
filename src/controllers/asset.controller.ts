// src/controllers/asset.controller.ts
import { Request, Response } from 'express';
import * as assetService from '../services/asset.service';
import { CreateAssetDto } from '../dtos/asset.dto';

export const createAsset = async (req: Request, res: Response) => {
  try {
    const asset = await assetService.createAsset(req.body as CreateAssetDto);
    res.status(201).json(asset);
  } catch (error:unknown) {
    if(error instanceof Error){
      res.status(400).json({ error: error.message });
    }else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getAllAssets = async (req: Request, res: Response) => {
  try {
    const assets = await assetService.getAssets(req.query);
    res.json(assets);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Add other controller methods (getById, update, delete, etc.)