/*
  Warnings:

  - You are about to drop the column `kegiatan_id` on the `ProgresPemeriksaan` table. All the data in the column will be lost.
  - You are about to drop the `KategoriProgresKegiatan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kegiatan_pemeriksaan_id` to the `ProgresPemeriksaan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProgresPemeriksaan" DROP CONSTRAINT "ProgresPemeriksaan_kategori_progres_id_fkey";

-- DropForeignKey
ALTER TABLE "ProgresPemeriksaan" DROP CONSTRAINT "ProgresPemeriksaan_kegiatan_id_fkey";

-- AlterTable
ALTER TABLE "ProgresPemeriksaan" DROP COLUMN "kegiatan_id",
ADD COLUMN     "kegiatan_pemeriksaan_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "KategoriProgresKegiatan";

-- CreateTable
CREATE TABLE "KategoriProgresPemeriksaan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KategoriProgresPemeriksaan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProgresPemeriksaan" ADD CONSTRAINT "ProgresPemeriksaan_kategori_progres_id_fkey" FOREIGN KEY ("kategori_progres_id") REFERENCES "KategoriProgresPemeriksaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgresPemeriksaan" ADD CONSTRAINT "ProgresPemeriksaan_kegiatan_pemeriksaan_id_fkey" FOREIGN KEY ("kegiatan_pemeriksaan_id") REFERENCES "KegiatanPemeriksaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
