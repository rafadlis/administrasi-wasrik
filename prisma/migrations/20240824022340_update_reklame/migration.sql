/*
  Warnings:

  - You are about to alter the column `nilai_bawah` on the `Reklame_HargaDasarNilaiStrategis` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `nilai_atas` on the `Reklame_HargaDasarNilaiStrategis` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `nilai_bawah` on the `Reklame_HargaDasarUkuran` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `nilai_atas` on the `Reklame_HargaDasarUkuran` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Reklame_HargaDasarNilaiStrategis" ALTER COLUMN "nilai_bawah" DROP NOT NULL,
ALTER COLUMN "nilai_bawah" SET DATA TYPE INTEGER,
ALTER COLUMN "nilai_atas" DROP NOT NULL,
ALTER COLUMN "nilai_atas" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Reklame_HargaDasarUkuran" ALTER COLUMN "nilai_bawah" DROP NOT NULL,
ALTER COLUMN "nilai_bawah" SET DATA TYPE INTEGER,
ALTER COLUMN "nilai_atas" DROP NOT NULL,
ALTER COLUMN "nilai_atas" SET DATA TYPE INTEGER;
