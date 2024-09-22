"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTim(data: { nama: string; anggota: string[] }) {
  try {
    const tim = await db.timPemeriksaan.create({
      data: {
        nama: data.nama,
      },
    });

    await db.anggotaTimPemeriksaan.createMany({
      data: data.anggota.map((id) => ({
        pegawai_id: id,
        tim_id: tim.id,
        updatedAt: new Date(),
      })),
    });
  } catch (error) {
    revalidatePath("/");
    return {
      header: "Gagal Menambahkan Tim",
      message: "Coba lagi atau hubungi admin",
      type: "error",
    };
  }

  revalidatePath("/");
  return {
    header: "Berhasil Menambahkan Tim",
    message: "Silahkan cek di halaman tim",
    type: "success",
  };
}

export async function updateJurnalPemeriksaan(
  id: number | bigint,
  keterangan: string
) {
  try {
    await db.jurnalPemeriksaan.update({
      where: { id: id },
      data: { keterangan: keterangan },
    });
  } catch (error) {
    console.log(error);
    return {
      header: "Gagal Mengubah Jurnal",
      message: "Coba lagi atau hubungi admin",
      type: "error",
    };
  }

  revalidatePath("/");
  return {
    header: "Berhasil Mengubah Jurnal",
    message: "Silahkan cek di halaman jurnal",
    type: "success",
  };
}
