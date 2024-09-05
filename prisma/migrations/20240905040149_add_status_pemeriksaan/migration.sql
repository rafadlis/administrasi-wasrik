-- CreateEnum
CREATE TYPE "StatusPemeriksaan" AS ENUM ('DALAM_PROSES', 'SELESAI');

-- AlterTable
ALTER TABLE "KegiatanPemeriksaan" ADD COLUMN     "status" "StatusPemeriksaan" NOT NULL DEFAULT 'DALAM_PROSES';
