/*
  Warnings:

  - You are about to drop the column `jangka_waktu_penayangan` on the `DataReklame` table. All the data in the column will be lost.
  - Added the required column `waktu_penayangan_berhenti` to the `DataReklame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataReklame" DROP COLUMN "jangka_waktu_penayangan",
ADD COLUMN     "waktu_penayangan_berhenti" TIMESTAMP(3) NOT NULL;
