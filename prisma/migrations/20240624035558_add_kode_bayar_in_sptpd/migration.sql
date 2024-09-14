-- AlterTable
ALTER TABLE "SPTPD" ADD COLUMN     "kode_bayar_id" TEXT;

-- AddForeignKey
ALTER TABLE "SPTPD" ADD CONSTRAINT "SPTPD_kode_bayar_id_fkey" FOREIGN KEY ("kode_bayar_id") REFERENCES "KodeBayar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
