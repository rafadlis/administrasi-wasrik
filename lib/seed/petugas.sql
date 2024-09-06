DELETE FROM "AnggotaTim";
DELETE FROM "Tim";
DELETE FROM "Petugas";

INSERT INTO "Tim" (id, nama, "createdAt", "updatedAt") VALUES
(1,'Normal', now(), now());
INSERT INTO "Petugas" (id, nama,panggilan, "createdAt", "updatedAt") VALUES
(1, 'Dewi Martia Ningsih, SE., M.Si', 'Bu Dewi', now(), now()),
(2, 'Ati Rahmawati, SE.,M.Si', 'Bu Ati', now(), now()),
(3, 'Lilis Yulia, S.Ip,.M.M', 'Bu Lilis', now(), now()),
(4, 'Mochamad Hendriyanto Bagjawibowo, SH., MH', 'Pa Hendri', now(), now()),
(5, 'R. Rahmat Fadli Sadikin, A.Md.Apj', 'Fadli', now(), now()),
(6, 'Rio Fauzi Resmana, SE', 'PaRio', now(), now()),
(7, 'Rida Aprianny, SE', 'Bu Rida', now(), now()),
(8, 'Kiki Mustikawati', 'Bu QQ', now(), now());
INSERT INTO "AnggotaTim" (petugas_id, tim_id, "createdAt", "updatedAt") VALUES
(1,1, now(), now()),
(2,1, now(), now()),
(4,1, now(), now()),
(5,1, now(), now());