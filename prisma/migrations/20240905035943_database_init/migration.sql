/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "Petugas" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "NIP" TEXT,
    "NIK" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Petugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tim" (
    "id" SERIAL NOT NULL,
    "petugas_id" INTEGER NOT NULL,
    "nomor_surat_tugas" TEXT,
    "tgl_surat_tugas" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JenisPajak" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JenisPajak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JenisPemeriksaan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JenisPemeriksaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KategoriHasilPemeriksaan" (
    "id" SERIAL NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KategoriHasilPemeriksaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KegiatanPemeriksaan" (
    "id" SERIAL NOT NULL,
    "tgl_pemeriksaan_mulai" TIMESTAMP(3),
    "tgl_pemeriksaan_selesai" TIMESTAMP(3),
    "NPWPD" TEXT,
    "nama_wp" TEXT,
    "masa_pajak_awal" TIMESTAMP(3),
    "masa_pajak_akhir" TIMESTAMP(3),
    "keterangan" TEXT,
    "jumlah_kenaikan" INTEGER,
    "persentase_kenaikan" DOUBLE PRECISION,
    "estimasi_presentasi_kenaikan" DOUBLE PRECISION,
    "jenis_pajak_id" INTEGER,
    "jenis_pemeriksaan_id" INTEGER,
    "hasil_pemeriksaan_id" INTEGER,
    "tim_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KegiatanPemeriksaan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tim" ADD CONSTRAINT "Tim_petugas_id_fkey" FOREIGN KEY ("petugas_id") REFERENCES "Petugas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KegiatanPemeriksaan" ADD CONSTRAINT "KegiatanPemeriksaan_jenis_pajak_id_fkey" FOREIGN KEY ("jenis_pajak_id") REFERENCES "JenisPajak"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KegiatanPemeriksaan" ADD CONSTRAINT "KegiatanPemeriksaan_jenis_pemeriksaan_id_fkey" FOREIGN KEY ("jenis_pemeriksaan_id") REFERENCES "JenisPemeriksaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KegiatanPemeriksaan" ADD CONSTRAINT "KegiatanPemeriksaan_hasil_pemeriksaan_id_fkey" FOREIGN KEY ("hasil_pemeriksaan_id") REFERENCES "KategoriHasilPemeriksaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KegiatanPemeriksaan" ADD CONSTRAINT "KegiatanPemeriksaan_tim_id_fkey" FOREIGN KEY ("tim_id") REFERENCES "Tim"("id") ON DELETE SET NULL ON UPDATE CASCADE;
