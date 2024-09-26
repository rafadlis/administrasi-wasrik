"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DokumentasiPemeriksaanType, JurnalPemeriksaanType } from "./get-other";

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

  revalidatePath("/", "layout");
  return {
    header: "Berhasil Menambahkan Tim",
    message: "Silahkan cek di halaman tim",
    type: "success",
  };
}

export async function createJurnalPemeriksaan(
  kegiatan_pemeriksaan_id: number,
  tanggal: string,
  nama: string,
  lokasi: string,
  keterangan: string
) {
  try {
    await db.jurnalPemeriksaan.create({
      data: {
        tanggal: new Date(tanggal),
        nama: nama,
        lokasi: lokasi,
        keterangan: keterangan,
        kegiatan_pemeriksaan_id: kegiatan_pemeriksaan_id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      header: "Gagal Menambahkan Jurnal",
      message: "Coba lagi atau hubungi admin",
      type: "error",
    };
  }

  revalidatePath("/", "layout");
  return {
    header: "Berhasil Menambahkan Jurnal",
    message: "Silahkan cek di halaman jurnal",
    type: "success",
  };
}

export async function updateJurnalPemeriksaan(
  id: number | bigint,
  data: Partial<JurnalPemeriksaanType[0]>
) {
  try {
    await db.jurnalPemeriksaan.update({
      where: { id: id },
      data: { ...data },
    });
  } catch (error) {
    console.log(error);
    return {
      header: "Gagal Mengubah Jurnal",
      message: "Coba lagi atau hubungi admin",
      type: "error",
    };
  }

  revalidatePath("/", "layout");
  return {
    header: "Berhasil Mengubah Jurnal",
    message: "Silahkan cek di halaman jurnal",
    type: "success",
  };
}

export async function createDokumentasiJurnal(
  data: Partial<DokumentasiPemeriksaanType[0]>
) {
  try {
    await db.dokumentasiPemeriksaan.create({
      data: { ...data },
    });
  } catch (error) {
    console.log(error);
    return {
      header: "Gagal Menambahkan Dokumentasi",
      message: "Coba lagi atau hubungi admin",
      type: "error",
    };
  }

  revalidatePath("/", "layout");
  return {
    header: "Berhasil Menambahkan Dokumentasi",
    message: "Silahkan cek di halaman jurnal",
    type: "success",
  };
}

export async function deleteJurnalPemeriksaan(id: number) {
  let data;
  try {
    data = await db.jurnalPemeriksaan.delete({
      where: { id: id },
    });
  } catch (error) {
    console.log(error);
    return {
      header: "Gagal Menghapus Jurnal",
      message: "Coba lagi atau hubungi admin",
      type: "error",
      deletedData: null,
    };
  }

  revalidatePath("/", "layout");
  return {
    header: "Berhasil Menghapus Jurnal",
    message: "Silahkan cek di halaman jurnal",
    type: "success",
    deletedData: data,
  };
}

export async function undoDeleteJurnalPemeriksaan(
  data: JurnalPemeriksaanType[0]
) {
  try {
    await db.jurnalPemeriksaan.create({
      data: { ...data },
    });
  } catch (error) {
    console.log(error);
    return {
      header: "Gagal Mengembalikan Jurnal",
      message: "Coba lagi atau hubungi admin",
      type: "error",
    };
  }

  revalidatePath("/", "layout");
  return {
    header: "Berhasil Mengembalikan Jurnal",
    message: "Silahkan cek di halaman jurnal",
    type: "success",
  };
}
