/*
  Warnings:

  - The primary key for the `SKPD` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SKPD` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SKPD" DROP CONSTRAINT "SKPD_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SKPD_pkey" PRIMARY KEY ("id");
