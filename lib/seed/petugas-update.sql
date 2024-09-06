-- Update Tim table
UPDATE "Tim" SET nama = 'Normal', "updatedAt" = now() WHERE id = 1;
INSERT INTO "Tim" (id, nama, "createdAt", "updatedAt")
SELECT 1, 'Normal', now(), now()
WHERE NOT EXISTS (SELECT 1 FROM "Tim" WHERE id = 1);

-- Update Petugas table
UPDATE "Petugas" SET
  nama = CASE id
    WHEN 1 THEN 'Dewi Martia Ningsih, SE., M.Si'
    WHEN 2 THEN 'Ati Rahmawati, SE.,M.Si'
    WHEN 3 THEN 'Lilis Yulia, S.Ip,.M.M'
    WHEN 4 THEN 'Mochamad Hendriyanto Bagjawibowo, SH., MH'
    WHEN 5 THEN 'R. Rahmat Fadli Sadikin, A.Md.Apj'
    WHEN 6 THEN 'Rio Fauzi Resmana, SE'
    WHEN 7 THEN 'Rida Aprianny, SE'
    WHEN 8 THEN 'Kiki Mustikawati'
  END,
  panggilan = CASE id
    WHEN 1 THEN 'Bu Dewi'
    WHEN 2 THEN 'Bu Ati'
    WHEN 3 THEN 'Bu Lilis'
    WHEN 4 THEN 'Pa Hendri'
    WHEN 5 THEN 'Fadli'
    WHEN 6 THEN 'PaRio'
    WHEN 7 THEN 'Bu Rida'
    WHEN 8 THEN 'Bu QQ'
  END,
  "updatedAt" = now()
WHERE id BETWEEN 1 AND 8;

INSERT INTO "Petugas" (id, nama, panggilan, "createdAt", "updatedAt")
SELECT id, nama, panggilan, now(), now()
FROM (VALUES
  (1, 'Dewi Martia Ningsih, SE., M.Si', 'Bu Dewi'),
  (2, 'Ati Rahmawati, SE.,M.Si', 'Bu Ati'),
  (3, 'Lilis Yulia, S.Ip,.M.M', 'Bu Lilis'),
  (4, 'Mochamad Hendriyanto Bagjawibowo, SH., MH', 'Pa Hendri'),
  (5, 'R. Rahmat Fadli Sadikin, A.Md.Apj', 'Fadli'),
  (6, 'Rio Fauzi Resmana, SE', 'PaRio'),
  (7, 'Rida Aprianny, SE', 'Bu Rida'),
  (8, 'Kiki Mustikawati', 'Bu QQ')
) AS new_petugas(id, nama, panggilan)
WHERE NOT EXISTS (SELECT 1 FROM "Petugas" WHERE id = new_petugas.id);

-- Update AnggotaTim table
UPDATE "AnggotaTim" SET "updatedAt" = now()
WHERE (petugas_id = 1 AND tim_id = 1)
   OR (petugas_id = 2 AND tim_id = 1)
   OR (petugas_id = 4 AND tim_id = 1)
   OR (petugas_id = 5 AND tim_id = 1);

INSERT INTO "AnggotaTim" (petugas_id, tim_id, "createdAt", "updatedAt")
SELECT petugas_id, tim_id, now(), now()
FROM (VALUES (1,1), (2,1), (4,1), (5,1)) AS new_anggota(petugas_id, tim_id)
WHERE NOT EXISTS (
  SELECT 1 FROM "AnggotaTim"
  WHERE petugas_id = new_anggota.petugas_id AND tim_id = new_anggota.tim_id
);