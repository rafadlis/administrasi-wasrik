/*
  Warnings:

  - You are about to alter the column `ukuran_media` on the `DataReklame` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `is_lembaga_pendidikan` to the `DataReklame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_nama_pengenal` to the `DataReklame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tinggi_media` to the `DataReklame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataReklame" ADD COLUMN     "is_lembaga_pendidikan" BOOLEAN NOT NULL,
ADD COLUMN     "is_nama_pengenal" BOOLEAN NOT NULL,
ADD COLUMN     "tinggi_media" INTEGER NOT NULL,
ALTER COLUMN "ukuran_media" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "Reklame_HargaDasarUkuran" (
    "id" SERIAL NOT NULL,
    "jenis_reklame_id" INTEGER NOT NULL,
    "is_per_satuan" BOOLEAN NOT NULL,
    "satuan" TEXT NOT NULL,
    "nilai_bawah" DOUBLE PRECISION NOT NULL,
    "nilai_atas" DOUBLE PRECISION NOT NULL,
    "harga_dasar" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reklame_HargaDasarUkuran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reklame_HargaDasarNilaiStrategis" (
    "id" SERIAL NOT NULL,
    "jenis_reklame_id" INTEGER NOT NULL,
    "nilai_bawah" DOUBLE PRECISION NOT NULL,
    "nilai_atas" DOUBLE PRECISION NOT NULL,
    "harga_dasar" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reklame_HargaDasarNilaiStrategis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reklame_HargaDasarUkuran" ADD CONSTRAINT "Reklame_HargaDasarUkuran_jenis_reklame_id_fkey" FOREIGN KEY ("jenis_reklame_id") REFERENCES "JenisReklame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reklame_HargaDasarNilaiStrategis" ADD CONSTRAINT "Reklame_HargaDasarNilaiStrategis_jenis_reklame_id_fkey" FOREIGN KEY ("jenis_reklame_id") REFERENCES "JenisReklame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
