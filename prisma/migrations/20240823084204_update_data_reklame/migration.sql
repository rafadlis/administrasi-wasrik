/*
  Warnings:

  - Added the required column `is_reklame_pihak_ketiga` to the `DataReklame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataReklame" ADD COLUMN     "is_nilai_kontrak_wajar" BOOLEAN,
ADD COLUMN     "is_reklame_pihak_ketiga" BOOLEAN NOT NULL,
ADD COLUMN     "nilai_kontrak" BIGINT;
