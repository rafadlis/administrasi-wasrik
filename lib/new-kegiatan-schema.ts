import { z } from "zod";

export const newKegiatanSchema = z.object({
  NPWPD: z.string().min(1).optional(),
  nama_wp: z.string().min(3),
  jenis_pajak_id: z.coerce.number(),
  masa_pajak_awal: z.date().optional(),
  masa_pajak_akhir: z.date().optional(),
  keterangan: z.string().optional(),
  jumlah_kenaikan: z.coerce.number().optional(),
  persentase_kenaikan: z.coerce.number().optional(),
  estimasi_presentasi_kenaikan: z.coerce.number().optional(),
  jenis_pemeriksaan_id: z.coerce.number().optional(),
  hasil_pemeriksaan_id: z.coerce.number().optional(),
  tim_id: z.coerce.number().optional(),
  status: z.string().optional(),
});
