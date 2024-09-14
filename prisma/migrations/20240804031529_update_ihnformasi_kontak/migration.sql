-- AlterTable
ALTER TABLE "InformasiKontak" ADD COLUMN     "status" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "nomor_hp" DROP NOT NULL;
