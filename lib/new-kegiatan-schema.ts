import { z } from "zod";

export const newKegiatanSchema = z
  .object({
    tgl_pemeriksaan_mulai: z.date(),
    is_selesai: z.boolean(),
    tgl_pemeriksaan_selesai: z.date().optional(),
    NPWPD: z.string().min(1).optional(),
    nama_wp: z.string().min(1),
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
  })
  .refine(
    (data) => {
      if (data.is_selesai && !data.tgl_pemeriksaan_selesai) {
        return false;
      }
      return true;
    },
    {
      message: "Tanggal selesai harus diisi jika kegiatan selesai",
      path: ["tgl_pemeriksaan_selesai"],
    }
  );
