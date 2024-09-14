-- AlterTable
ALTER TABLE "SKPD" ADD COLUMN     "surat_id" TEXT;

-- AlterTable
ALTER TABLE "SPTPD" ADD COLUMN     "surat_id" TEXT;

-- CreateTable
CREATE TABLE "Surat" (
    "id" TEXT NOT NULL,
    "keterangan" TEXT,

    CONSTRAINT "Surat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SPTPD" ADD CONSTRAINT "SPTPD_surat_id_fkey" FOREIGN KEY ("surat_id") REFERENCES "Surat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SKPD" ADD CONSTRAINT "SKPD_surat_id_fkey" FOREIGN KEY ("surat_id") REFERENCES "Surat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
