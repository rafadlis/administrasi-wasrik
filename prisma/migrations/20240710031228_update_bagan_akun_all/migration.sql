/*
  Warnings:

  - The primary key for the `BaganAkun_All` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "BaganAkun_All" DROP CONSTRAINT "BaganAkun_All_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BaganAkun_All_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BaganAkun_All_id_seq";
