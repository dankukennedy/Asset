// prisma/seed.ts
import { PrismaClient, AssetClass } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.asset.createMany({
    data: [
      {
        assetTag: 'IT-COMP-001',
        class: AssetClass.COMPUTER,
        model: 'Dell OptiPlex 7080',
        manufacturer: 'Dell',
        serialNumber: 'CN-1234567-89',
        cpu: 'Intel Core i7-10700',
        ram: '16GB DDR4',
        storage: '512GB SSD',
        os: 'Windows 10 Pro',
        purchaseDate: new Date('2023-01-15'),
        purchasePrice: 899.99,
        location: 'Finance Department'
      },
      {
        assetTag: 'IT-PRN-001',
        class: AssetClass.PRINTER,
        model: 'HP LaserJet Pro M404n',
        manufacturer: 'HP',
        serialNumber: 'ABC123XYZ456',
        consumables: 'HP 83A Black Toner',
        resolution: '600x600 dpi',
        purchaseDate: new Date('2023-02-20'),
        location: 'Reception'
      }
    ]
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });