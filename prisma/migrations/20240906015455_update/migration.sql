/*
  Warnings:

  - You are about to drop the column `petugas_id` on the `Tim` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tim" DROP CONSTRAINT "Tim_petugas_id_fkey";

-- AlterTable
ALTER TABLE "Tim" DROP COLUMN "petugas_id";

-- CreateTable
CREATE TABLE "AnggotaTim" (
    "id" SERIAL NOT NULL,
    "petugas_id" INTEGER NOT NULL,
    "tim_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnggotaTim_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnggotaTim" ADD CONSTRAINT "AnggotaTim_petugas_id_fkey" FOREIGN KEY ("petugas_id") REFERENCES "Petugas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnggotaTim" ADD CONSTRAINT "AnggotaTim_tim_id_fkey" FOREIGN KEY ("tim_id") REFERENCES "Tim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
