/*
  Warnings:

  - The values [DALAM_PROSES] on the enum `StatusPemeriksaan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusPemeriksaan_new" AS ENUM ('PROSES', 'BATAL', 'SELESAI');
ALTER TABLE "KegiatanPemeriksaan" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "KegiatanPemeriksaan" ALTER COLUMN "status" TYPE "StatusPemeriksaan_new" USING ("status"::text::"StatusPemeriksaan_new");
ALTER TYPE "StatusPemeriksaan" RENAME TO "StatusPemeriksaan_old";
ALTER TYPE "StatusPemeriksaan_new" RENAME TO "StatusPemeriksaan";
DROP TYPE "StatusPemeriksaan_old";
ALTER TABLE "KegiatanPemeriksaan" ALTER COLUMN "status" SET DEFAULT 'PROSES';
COMMIT;

-- AlterTable
ALTER TABLE "KegiatanPemeriksaan" ALTER COLUMN "status" SET DEFAULT 'PROSES';
