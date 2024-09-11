/*
  Warnings:

  - You are about to drop the column `status` on the `KegiatanPemeriksaan` table. All the data in the column will be lost.
  - You are about to drop the column `nomor_surat_tugas` on the `Tim` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_surat_tugas` on the `Tim` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KegiatanPemeriksaan" DROP COLUMN "status",
ADD COLUMN     "nomor_surat_tugas" TEXT,
ADD COLUMN     "progress_id" INTEGER,
ADD COLUMN     "tgl_surat_tugas" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Tim" DROP COLUMN "nomor_surat_tugas",
DROP COLUMN "tgl_surat_tugas";

-- DropEnum
DROP TYPE "StatusPemeriksaan";

-- CreateTable
CREATE TABLE "ProgressPemeriksaan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgressPemeriksaan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KegiatanPemeriksaan" ADD CONSTRAINT "KegiatanPemeriksaan_progress_id_fkey" FOREIGN KEY ("progress_id") REFERENCES "ProgressPemeriksaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
