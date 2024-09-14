-- AlterTable
ALTER TABLE "JurnalKredit" ALTER COLUMN "keterangan" DROP NOT NULL;

-- CreateTable
CREATE TABLE "LaporMasalah" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "subjek" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "upvoteUser" JSONB,
    "donwvoteUser" JSONB,
    "status" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LaporMasalah_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LaporMasalah" ADD CONSTRAINT "LaporMasalah_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
