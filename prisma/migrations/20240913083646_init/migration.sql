/*
  Warnings:

  - You are about to drop the `DataReklame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InformasiKontak` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JenisPajak` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JenisReklame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JurnalDebit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JurnalKredit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KlasifikasiJalan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KlasifikasiRuang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KlasifikasiSudut` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KodeBayar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KritikSaran` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LaporMasalah` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ObjekPajak` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PengurusBadan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reklame_HargaDasarNilaiStrategis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reklame_HargaDasarUkuran` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RiwayatSetoran` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SKPD` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SPTPD` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatusAktif` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Surat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WajibPajak` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pajak_admin";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pajak_general";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pajak_surat";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pajak_wasrik";

-- DropForeignKey
ALTER TABLE "public"."DataReklame" DROP CONSTRAINT "DataReklame_jenis_reklame_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."DataReklame" DROP CONSTRAINT "DataReklame_klasifikasi_jalan_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."DataReklame" DROP CONSTRAINT "DataReklame_klasifikasi_ruang_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."DataReklame" DROP CONSTRAINT "DataReklame_klasifikasi_sudut_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."DataReklame" DROP CONSTRAINT "DataReklame_objek_pajak_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."InformasiKontak" DROP CONSTRAINT "InformasiKontak_badan_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."InformasiKontak" DROP CONSTRAINT "InformasiKontak_orang_pribadi_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."JenisReklame" DROP CONSTRAINT "JenisReklame_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."JurnalDebit" DROP CONSTRAINT "JurnalDebit_akun_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."JurnalDebit" DROP CONSTRAINT "JurnalDebit_akun_rincian_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."JurnalDebit" DROP CONSTRAINT "JurnalDebit_akun_sub_rincian_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."JurnalDebit" DROP CONSTRAINT "JurnalDebit_kode_bayar_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."JurnalDebit" DROP CONSTRAINT "JurnalDebit_objek_pajak_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."JurnalKredit" DROP CONSTRAINT "JurnalKredit_akun_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."JurnalKredit" DROP CONSTRAINT "JurnalKredit_akun_rincian_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."JurnalKredit" DROP CONSTRAINT "JurnalKredit_akun_sub_rincian_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."JurnalKredit" DROP CONSTRAINT "JurnalKredit_jurnal_debit_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."KodeBayar" DROP CONSTRAINT "KodeBayar_jenis_pajak_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."KodeBayar" DROP CONSTRAINT "KodeBayar_objek_pajak_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."KodeBayar" DROP CONSTRAINT "KodeBayar_surat_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."KodeBayar" DROP CONSTRAINT "KodeBayar_terbayar_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ObjekPajak" DROP CONSTRAINT "ObjekPajak_jenis_pajak_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ObjekPajak" DROP CONSTRAINT "ObjekPajak_kode_provinsi_fkey";

-- DropForeignKey
ALTER TABLE "public"."ObjekPajak" DROP CONSTRAINT "ObjekPajak_kode_provinsi_kode_kabupaten_fkey";

-- DropForeignKey
ALTER TABLE "public"."ObjekPajak" DROP CONSTRAINT "ObjekPajak_kode_provinsi_kode_kabupaten_kode_kecamatan_fkey";

-- DropForeignKey
ALTER TABLE "public"."ObjekPajak" DROP CONSTRAINT "ObjekPajak_kode_provinsi_kode_kabupaten_kode_kecamatan_kod_fkey";

-- DropForeignKey
ALTER TABLE "public"."ObjekPajak" DROP CONSTRAINT "ObjekPajak_wajib_pajak_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."PengurusBadan" DROP CONSTRAINT "PengurusBadan_badan_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."PengurusBadan" DROP CONSTRAINT "PengurusBadan_orang_pribadi_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reklame_HargaDasarUkuran" DROP CONSTRAINT "Reklame_HargaDasarUkuran_jenis_reklame_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."SKPD" DROP CONSTRAINT "SKPD_kode_bayar_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."SKPD" DROP CONSTRAINT "SKPD_objek_pajak_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."SKPD" DROP CONSTRAINT "SKPD_surat_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."SPTPD" DROP CONSTRAINT "SPTPD_kode_bayar_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."SPTPD" DROP CONSTRAINT "SPTPD_objek_pajak_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."SPTPD" DROP CONSTRAINT "SPTPD_surat_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."StatusAktif" DROP CONSTRAINT "StatusAktif_wajib_pajak_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."WajibPajak" DROP CONSTRAINT "WajibPajak_badan_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."WajibPajak" DROP CONSTRAINT "WajibPajak_orang_pribadi_id_fkey";

-- DropTable
DROP TABLE "public"."DataReklame";

-- DropTable
DROP TABLE "public"."InformasiKontak";

-- DropTable
DROP TABLE "public"."JenisPajak";

-- DropTable
DROP TABLE "public"."JenisReklame";

-- DropTable
DROP TABLE "public"."JurnalDebit";

-- DropTable
DROP TABLE "public"."JurnalKredit";

-- DropTable
DROP TABLE "public"."KlasifikasiJalan";

-- DropTable
DROP TABLE "public"."KlasifikasiRuang";

-- DropTable
DROP TABLE "public"."KlasifikasiSudut";

-- DropTable
DROP TABLE "public"."KodeBayar";

-- DropTable
DROP TABLE "public"."KritikSaran";

-- DropTable
DROP TABLE "public"."LaporMasalah";

-- DropTable
DROP TABLE "public"."ObjekPajak";

-- DropTable
DROP TABLE "public"."PengurusBadan";

-- DropTable
DROP TABLE "public"."Reklame_HargaDasarNilaiStrategis";

-- DropTable
DROP TABLE "public"."Reklame_HargaDasarUkuran";

-- DropTable
DROP TABLE "public"."RiwayatSetoran";

-- DropTable
DROP TABLE "public"."SKPD";

-- DropTable
DROP TABLE "public"."SPTPD";

-- DropTable
DROP TABLE "public"."StatusAktif";

-- DropTable
DROP TABLE "public"."Surat";

-- DropTable
DROP TABLE "public"."WajibPajak";

-- DropEnum
DROP TYPE "public"."UserRole";

-- CreateTable
CREATE TABLE "public"."Pegawai" (
    "id" TEXT NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "NIK" TEXT,
    "NIP" TEXT,
    "jabatan" TEXT NOT NULL,
    "tanggal_masuk_kerja" TIMESTAMP(3) NOT NULL,
    "tanggal_keluar_kerja" TIMESTAMP(3),
    "alamat" TEXT,
    "nomor_telepon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pegawai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_general"."WajibPajak" (
    "id" SERIAL NOT NULL,
    "orang_pribadi_id" TEXT,
    "badan_id" TEXT,
    "NPWPD" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WajibPajak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_general"."ObjekPajak" (
    "id" SERIAL NOT NULL,
    "nomor_objek_pajak" TEXT,
    "wajib_pajak_id" INTEGER NOT NULL,
    "jenis_pajak_id" INTEGER,
    "nama_unik" TEXT,
    "terhapus" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "RT" TEXT NOT NULL,
    "RW" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "kode_desa_kelurahan" TEXT NOT NULL,
    "kode_kabupaten" TEXT NOT NULL,
    "kode_kecamatan" TEXT NOT NULL,
    "kode_provinsi" TEXT NOT NULL,
    "koordinat" TEXT,

    CONSTRAINT "ObjekPajak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_general"."StatusAktif" (
    "id" SERIAL NOT NULL,
    "wajib_pajak_id" INTEGER NOT NULL,
    "nonaktif" TIMESTAMP(3) NOT NULL,
    "aktif_kembali" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,
    "alasan" TEXT NOT NULL,
    "referensi" TEXT,

    CONSTRAINT "StatusAktif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_general"."PengurusBadan" (
    "id" SERIAL NOT NULL,
    "badan_id" TEXT NOT NULL,
    "orang_pribadi_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jabatan" TEXT NOT NULL,

    CONSTRAINT "PengurusBadan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_general"."InformasiKontak" (
    "id" SERIAL NOT NULL,
    "badan_id" TEXT,
    "orang_pribadi_id" TEXT,
    "email" TEXT,
    "nomor_hp" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InformasiKontak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_general"."JenisPajak" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "nomor_rekening_pendapatan" TEXT,
    "periode_masa" TEXT,
    "kode_pajak" TEXT,
    "hitung_sendiri" BOOLEAN,
    "tarif" DOUBLE PRECISION,

    CONSTRAINT "JenisPajak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_admin"."KodeBayar" (
    "id" TEXT NOT NULL,
    "npwpd" TEXT NOT NULL,
    "jenis_pajak_id" INTEGER NOT NULL,
    "masa_awal" TIMESTAMP(3) NOT NULL,
    "masa_akhir" TIMESTAMP(3),
    "nominal" BIGINT NOT NULL,
    "objek_pajak_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kadaluarsa" TIMESTAMP(3) NOT NULL,
    "terbayar" TIMESTAMP(3),
    "nominal_sanksi" BIGINT,
    "terbayar_id" TEXT,
    "surat_id" INTEGER,

    CONSTRAINT "KodeBayar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_admin"."RiwayatSetoran" (
    "id" TEXT NOT NULL,
    "kode_bayar_id" TEXT,
    "referensi_lain" TEXT,
    "nominal" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiwayatSetoran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_admin"."DataReklame" (
    "id" SERIAL NOT NULL,
    "objek_pajak_id" INTEGER NOT NULL,
    "is_reklame_pihak_ketiga" BOOLEAN NOT NULL,
    "is_nilai_kontrak_wajar" BOOLEAN,
    "nilai_kontrak" BIGINT,
    "jenis_reklame_id" INTEGER NOT NULL,
    "klasifikasi_ruang_id" INTEGER NOT NULL,
    "klasifikasi_jalan_id" INTEGER NOT NULL,
    "klasifikasi_sudut_id" INTEGER NOT NULL,
    "waktu_penayangan" TIMESTAMP(3) NOT NULL,
    "waktu_penayangan_berhenti" TIMESTAMP(3) NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "ukuran_media" INTEGER NOT NULL,
    "tinggi_media" INTEGER NOT NULL,
    "is_nama_pengenal" BOOLEAN NOT NULL,
    "is_lembaga_pendidikan" BOOLEAN NOT NULL,
    "keterangan_lain" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataReklame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_admin"."JenisReklame" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "lama_masa" TEXT,
    "harga_dasar_ketinggian" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JenisReklame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_admin"."KlasifikasiRuang" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "skor" INTEGER NOT NULL,
    "skor_bobot" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KlasifikasiRuang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_admin"."KlasifikasiJalan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "skor" INTEGER NOT NULL,
    "skor_bobot" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KlasifikasiJalan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_admin"."KlasifikasiSudut" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "skor" INTEGER NOT NULL,
    "skor_bobot" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KlasifikasiSudut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_admin"."Reklame_HargaDasarUkuran" (
    "id" SERIAL NOT NULL,
    "jenis_reklame_id" INTEGER NOT NULL,
    "is_per_satuan" BOOLEAN NOT NULL,
    "satuan" TEXT NOT NULL,
    "nilai_bawah" INTEGER,
    "nilai_atas" INTEGER,
    "harga_dasar" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reklame_HargaDasarUkuran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_admin"."Reklame_HargaDasarNilaiStrategis" (
    "id" SERIAL NOT NULL,
    "nilai_bawah" INTEGER,
    "nilai_atas" INTEGER,
    "harga_dasar" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reklame_HargaDasarNilaiStrategis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_surat"."Surat" (
    "id" SERIAL NOT NULL,
    "keterangan" TEXT,
    "nomor_surat" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_surat"."SPTPD" (
    "id" SERIAL NOT NULL,
    "nomor_urut" TEXT,
    "nomor_surat" TEXT,
    "objek_pajak_id" INTEGER NOT NULL,
    "omzet" BIGINT,
    "pajak" BIGINT,
    "masa_awal" TIMESTAMP(3),
    "masa_akhir" TIMESTAMP(3),
    "keterangan" TEXT,
    "kode_bayar_id" TEXT,
    "surat_id" INTEGER NOT NULL,
    "tanggal_pembuatan" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SPTPD_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_surat"."SKPD" (
    "id" SERIAL NOT NULL,
    "nomor_urut" TEXT,
    "nomor_surat" TEXT,
    "kode_bayar_id" TEXT,
    "objek_pajak_id" INTEGER NOT NULL,
    "masa_awal" TIMESTAMP(3),
    "masa_akhir" TIMESTAMP(3),
    "dasar_pengenaan_pajak" BIGINT,
    "pajak_terhutang" BIGINT,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "surat_id" INTEGER NOT NULL,

    CONSTRAINT "SKPD_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_admin"."LaporMasalah" (
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

-- CreateTable
CREATE TABLE "pajak_admin"."KritikSaran" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "subjek" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "upvoteUser" JSONB,
    "donwvoteUser" JSONB,
    "status" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KritikSaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_admin"."JurnalDebit" (
    "id" SERIAL NOT NULL,
    "objek_pajak_id" INTEGER NOT NULL,
    "akun_objek_id" TEXT NOT NULL,
    "akun_rincian_objek_id" TEXT,
    "akun_sub_rincian_objek_id" TEXT,
    "debit" BIGINT,
    "keterangan" TEXT,
    "TerbayarAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kode_bayar_id" TEXT NOT NULL,

    CONSTRAINT "JurnalDebit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_admin"."JurnalKredit" (
    "id" SERIAL NOT NULL,
    "jurnal_debit_id" INTEGER NOT NULL,
    "akun_objek_id" TEXT NOT NULL,
    "akun_rincian_objek_id" TEXT,
    "akun_sub_rincian_objek_id" TEXT,
    "kredit" BIGINT,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JurnalKredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_wasrik"."AnggotaTimPemeriksaan" (
    "id" SERIAL NOT NULL,
    "pegawai_id" TEXT NOT NULL,
    "tim_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnggotaTimPemeriksaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_wasrik"."TimPemeriksaan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimPemeriksaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_wasrik"."JenisPemeriksaan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JenisPemeriksaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_wasrik"."KategoriHasilPemeriksaan" (
    "id" SERIAL NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KategoriHasilPemeriksaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_wasrik"."KegiatanPemeriksaan" (
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

-- CreateTable
CREATE TABLE "pajak_wasrik"."KategoriProgresPemeriksaan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KategoriProgresPemeriksaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajak_wasrik"."ProgresPemeriksaan" (
    "id" SERIAL NOT NULL,
    "surat_id" INTEGER NOT NULL,
    "kegiatan_pemeriksaan_id" INTEGER NOT NULL,
    "kategori_progres_id" INTEGER NOT NULL,
    "nomor_surat" TEXT,
    "tanggal_surat" TIMESTAMP(3),
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgresPemeriksaan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pegawai_NIK_key" ON "public"."Pegawai"("NIK");

-- CreateIndex
CREATE UNIQUE INDEX "Pegawai_NIP_key" ON "public"."Pegawai"("NIP");

-- CreateIndex
CREATE UNIQUE INDEX "WajibPajak_NPWPD_key" ON "pajak_general"."WajibPajak"("NPWPD");

-- CreateIndex
CREATE UNIQUE INDEX "Surat_nomor_surat_key" ON "pajak_surat"."Surat"("nomor_surat");

-- CreateIndex
CREATE UNIQUE INDEX "SPTPD_nomor_surat_key" ON "pajak_surat"."SPTPD"("nomor_surat");

-- AddForeignKey
ALTER TABLE "pajak_general"."WajibPajak" ADD CONSTRAINT "WajibPajak_orang_pribadi_id_fkey" FOREIGN KEY ("orang_pribadi_id") REFERENCES "public"."OrangPribadi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_general"."WajibPajak" ADD CONSTRAINT "WajibPajak_badan_id_fkey" FOREIGN KEY ("badan_id") REFERENCES "public"."Badan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_general"."ObjekPajak" ADD CONSTRAINT "ObjekPajak_wajib_pajak_id_fkey" FOREIGN KEY ("wajib_pajak_id") REFERENCES "pajak_general"."WajibPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_general"."ObjekPajak" ADD CONSTRAINT "ObjekPajak_jenis_pajak_id_fkey" FOREIGN KEY ("jenis_pajak_id") REFERENCES "pajak_general"."JenisPajak"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_general"."ObjekPajak" ADD CONSTRAINT "ObjekPajak_kode_provinsi_fkey" FOREIGN KEY ("kode_provinsi") REFERENCES "public"."Provinsi"("kode_provinsi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_general"."ObjekPajak" ADD CONSTRAINT "ObjekPajak_kode_provinsi_kode_kabupaten_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten") REFERENCES "public"."Kabupaten"("kode_provinsi", "kode_kabupaten") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_general"."ObjekPajak" ADD CONSTRAINT "ObjekPajak_kode_provinsi_kode_kabupaten_kode_kecamatan_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten", "kode_kecamatan") REFERENCES "public"."Kecamatan"("kode_provinsi", "kode_kabupaten", "kode_kecamatan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_general"."ObjekPajak" ADD CONSTRAINT "ObjekPajak_kode_provinsi_kode_kabupaten_kode_kecamatan_kod_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten", "kode_kecamatan", "kode_desa_kelurahan") REFERENCES "public"."DesaKelurahan"("kode_provinsi", "kode_kabupaten", "kode_kecamatan", "kode_desa_kelurahan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_general"."StatusAktif" ADD CONSTRAINT "StatusAktif_wajib_pajak_id_fkey" FOREIGN KEY ("wajib_pajak_id") REFERENCES "pajak_general"."WajibPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_general"."PengurusBadan" ADD CONSTRAINT "PengurusBadan_badan_id_fkey" FOREIGN KEY ("badan_id") REFERENCES "public"."Badan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_general"."PengurusBadan" ADD CONSTRAINT "PengurusBadan_orang_pribadi_id_fkey" FOREIGN KEY ("orang_pribadi_id") REFERENCES "public"."OrangPribadi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_general"."InformasiKontak" ADD CONSTRAINT "InformasiKontak_badan_id_fkey" FOREIGN KEY ("badan_id") REFERENCES "public"."Badan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_general"."InformasiKontak" ADD CONSTRAINT "InformasiKontak_orang_pribadi_id_fkey" FOREIGN KEY ("orang_pribadi_id") REFERENCES "public"."OrangPribadi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."KodeBayar" ADD CONSTRAINT "KodeBayar_jenis_pajak_id_fkey" FOREIGN KEY ("jenis_pajak_id") REFERENCES "pajak_general"."JenisPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."KodeBayar" ADD CONSTRAINT "KodeBayar_objek_pajak_id_fkey" FOREIGN KEY ("objek_pajak_id") REFERENCES "pajak_general"."ObjekPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."KodeBayar" ADD CONSTRAINT "KodeBayar_terbayar_id_fkey" FOREIGN KEY ("terbayar_id") REFERENCES "pajak_admin"."RiwayatSetoran"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."KodeBayar" ADD CONSTRAINT "KodeBayar_surat_id_fkey" FOREIGN KEY ("surat_id") REFERENCES "pajak_surat"."Surat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."DataReklame" ADD CONSTRAINT "DataReklame_objek_pajak_id_fkey" FOREIGN KEY ("objek_pajak_id") REFERENCES "pajak_general"."ObjekPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."DataReklame" ADD CONSTRAINT "DataReklame_jenis_reklame_id_fkey" FOREIGN KEY ("jenis_reklame_id") REFERENCES "pajak_admin"."JenisReklame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."DataReklame" ADD CONSTRAINT "DataReklame_klasifikasi_ruang_id_fkey" FOREIGN KEY ("klasifikasi_ruang_id") REFERENCES "pajak_admin"."KlasifikasiRuang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."DataReklame" ADD CONSTRAINT "DataReklame_klasifikasi_jalan_id_fkey" FOREIGN KEY ("klasifikasi_jalan_id") REFERENCES "pajak_admin"."KlasifikasiJalan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."DataReklame" ADD CONSTRAINT "DataReklame_klasifikasi_sudut_id_fkey" FOREIGN KEY ("klasifikasi_sudut_id") REFERENCES "pajak_admin"."KlasifikasiSudut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."JenisReklame" ADD CONSTRAINT "JenisReklame_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "pajak_admin"."JenisReklame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."Reklame_HargaDasarUkuran" ADD CONSTRAINT "Reklame_HargaDasarUkuran_jenis_reklame_id_fkey" FOREIGN KEY ("jenis_reklame_id") REFERENCES "pajak_admin"."JenisReklame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_surat"."SPTPD" ADD CONSTRAINT "SPTPD_objek_pajak_id_fkey" FOREIGN KEY ("objek_pajak_id") REFERENCES "pajak_general"."ObjekPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_surat"."SPTPD" ADD CONSTRAINT "SPTPD_kode_bayar_id_fkey" FOREIGN KEY ("kode_bayar_id") REFERENCES "pajak_admin"."KodeBayar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_surat"."SPTPD" ADD CONSTRAINT "SPTPD_surat_id_fkey" FOREIGN KEY ("surat_id") REFERENCES "pajak_surat"."Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_surat"."SKPD" ADD CONSTRAINT "SKPD_objek_pajak_id_fkey" FOREIGN KEY ("objek_pajak_id") REFERENCES "pajak_general"."ObjekPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_surat"."SKPD" ADD CONSTRAINT "SKPD_kode_bayar_id_fkey" FOREIGN KEY ("kode_bayar_id") REFERENCES "pajak_admin"."KodeBayar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_surat"."SKPD" ADD CONSTRAINT "SKPD_surat_id_fkey" FOREIGN KEY ("surat_id") REFERENCES "pajak_surat"."Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."JurnalDebit" ADD CONSTRAINT "JurnalDebit_kode_bayar_id_fkey" FOREIGN KEY ("kode_bayar_id") REFERENCES "pajak_admin"."KodeBayar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."JurnalDebit" ADD CONSTRAINT "JurnalDebit_objek_pajak_id_fkey" FOREIGN KEY ("objek_pajak_id") REFERENCES "pajak_general"."ObjekPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."JurnalDebit" ADD CONSTRAINT "JurnalDebit_akun_objek_id_fkey" FOREIGN KEY ("akun_objek_id") REFERENCES "public"."BaganAkun_Objek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."JurnalDebit" ADD CONSTRAINT "JurnalDebit_akun_rincian_objek_id_fkey" FOREIGN KEY ("akun_rincian_objek_id") REFERENCES "public"."BaganAkun_RincianObjek"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."JurnalDebit" ADD CONSTRAINT "JurnalDebit_akun_sub_rincian_objek_id_fkey" FOREIGN KEY ("akun_sub_rincian_objek_id") REFERENCES "public"."BaganAkun_SubRincianObjek"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."JurnalKredit" ADD CONSTRAINT "JurnalKredit_akun_objek_id_fkey" FOREIGN KEY ("akun_objek_id") REFERENCES "public"."BaganAkun_Objek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."JurnalKredit" ADD CONSTRAINT "JurnalKredit_akun_rincian_objek_id_fkey" FOREIGN KEY ("akun_rincian_objek_id") REFERENCES "public"."BaganAkun_RincianObjek"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."JurnalKredit" ADD CONSTRAINT "JurnalKredit_akun_sub_rincian_objek_id_fkey" FOREIGN KEY ("akun_sub_rincian_objek_id") REFERENCES "public"."BaganAkun_SubRincianObjek"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_admin"."JurnalKredit" ADD CONSTRAINT "JurnalKredit_jurnal_debit_id_fkey" FOREIGN KEY ("jurnal_debit_id") REFERENCES "pajak_admin"."JurnalDebit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_wasrik"."AnggotaTimPemeriksaan" ADD CONSTRAINT "AnggotaTimPemeriksaan_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "public"."Pegawai"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_wasrik"."AnggotaTimPemeriksaan" ADD CONSTRAINT "AnggotaTimPemeriksaan_tim_id_fkey" FOREIGN KEY ("tim_id") REFERENCES "pajak_wasrik"."TimPemeriksaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_wasrik"."KegiatanPemeriksaan" ADD CONSTRAINT "KegiatanPemeriksaan_jenis_pajak_id_fkey" FOREIGN KEY ("jenis_pajak_id") REFERENCES "pajak_general"."JenisPajak"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_wasrik"."KegiatanPemeriksaan" ADD CONSTRAINT "KegiatanPemeriksaan_jenis_pemeriksaan_id_fkey" FOREIGN KEY ("jenis_pemeriksaan_id") REFERENCES "pajak_wasrik"."JenisPemeriksaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_wasrik"."KegiatanPemeriksaan" ADD CONSTRAINT "KegiatanPemeriksaan_hasil_pemeriksaan_id_fkey" FOREIGN KEY ("hasil_pemeriksaan_id") REFERENCES "pajak_wasrik"."KategoriHasilPemeriksaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_wasrik"."KegiatanPemeriksaan" ADD CONSTRAINT "KegiatanPemeriksaan_tim_id_fkey" FOREIGN KEY ("tim_id") REFERENCES "pajak_wasrik"."TimPemeriksaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_wasrik"."ProgresPemeriksaan" ADD CONSTRAINT "ProgresPemeriksaan_kategori_progres_id_fkey" FOREIGN KEY ("kategori_progres_id") REFERENCES "pajak_wasrik"."KategoriProgresPemeriksaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pajak_wasrik"."ProgresPemeriksaan" ADD CONSTRAINT "ProgresPemeriksaan_kegiatan_pemeriksaan_id_fkey" FOREIGN KEY ("kegiatan_pemeriksaan_id") REFERENCES "pajak_wasrik"."KegiatanPemeriksaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
