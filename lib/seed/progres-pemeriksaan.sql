DELETE FROM "ProgressPemeriksaan";

INSERT INTO "ProgressPemeriksaan" (id, nama, keterangan, "createdAt", "updatedAt") VALUES
(1, 'SP', 'Surat Pemberitahuan', now(), now()),
(2, 'ST', 'Surat Tugas', now(), now()),
(3, 'BAP', 'Berita Acara Pemeriksaan', now(), now()),
(4, 'BAHP', 'Berita Acara Hasil Pemeriksaan', now(), now()),
(5, 'LHP', 'Laporan Hasil Pemeriksaan', now(), now()),
(6, 'Selesai', 'Selesai', now(), now());