/*
  Warnings:

  - You are about to drop the column `jenis_reklame_id` on the `Reklame_HargaDasarNilaiStrategis` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reklame_HargaDasarNilaiStrategis" DROP CONSTRAINT "Reklame_HargaDasarNilaiStrategis_jenis_reklame_id_fkey";

-- AlterTable
ALTER TABLE "Reklame_HargaDasarNilaiStrategis" DROP COLUMN "jenis_reklame_id";
