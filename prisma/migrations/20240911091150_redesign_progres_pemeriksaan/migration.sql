/*
  Warnings:

  - You are about to drop the column `nomor_surat_tugas` on the `KegiatanPemeriksaan` table. All the data in the column will be lost.
  - You are about to drop the column `progress_id` on the `KegiatanPemeriksaan` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_surat_tugas` on the `KegiatanPemeriksaan` table. All the data in the column will be lost.
  - You are about to drop the `ProgressPemeriksaan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KegiatanPemeriksaan" DROP CONSTRAINT "KegiatanPemeriksaan_progress_id_fkey";

-- AlterTable
ALTER TABLE "KegiatanPemeriksaan" DROP COLUMN "nomor_surat_tugas",
DROP COLUMN "progress_id",
DROP COLUMN "tgl_surat_tugas";

-- DropTable
DROP TABLE "ProgressPemeriksaan";

-- CreateTable
CREATE TABLE "KategoriProgresKegiatan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KategoriProgresKegiatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgresKegiatan" (
    "id" SERIAL NOT NULL,
    "kegiatan_id" INTEGER NOT NULL,
    "kategori_progres_id" INTEGER NOT NULL,
    "nomor_surat" TEXT,
    "tanggal_surat" TIMESTAMP(3),
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgresKegiatan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProgresKegiatan" ADD CONSTRAINT "ProgresKegiatan_kategori_progres_id_fkey" FOREIGN KEY ("kategori_progres_id") REFERENCES "KategoriProgresKegiatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgresKegiatan" ADD CONSTRAINT "ProgresKegiatan_kegiatan_id_fkey" FOREIGN KEY ("kegiatan_id") REFERENCES "KegiatanPemeriksaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
