/*
  Warnings:

  - You are about to drop the `ProgresKegiatan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProgresKegiatan" DROP CONSTRAINT "ProgresKegiatan_kategori_progres_id_fkey";

-- DropForeignKey
ALTER TABLE "ProgresKegiatan" DROP CONSTRAINT "ProgresKegiatan_kegiatan_id_fkey";

-- DropTable
DROP TABLE "ProgresKegiatan";

-- CreateTable
CREATE TABLE "ProgresPemeriksaan" (
    "id" SERIAL NOT NULL,
    "kegiatan_id" INTEGER NOT NULL,
    "kategori_progres_id" INTEGER NOT NULL,
    "nomor_surat" TEXT,
    "tanggal_surat" TIMESTAMP(3),
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgresPemeriksaan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProgresPemeriksaan" ADD CONSTRAINT "ProgresPemeriksaan_kategori_progres_id_fkey" FOREIGN KEY ("kategori_progres_id") REFERENCES "KategoriProgresKegiatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgresPemeriksaan" ADD CONSTRAINT "ProgresPemeriksaan_kegiatan_id_fkey" FOREIGN KEY ("kegiatan_id") REFERENCES "KegiatanPemeriksaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
