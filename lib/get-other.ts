"use server";

import { db } from "@/lib/db";

export async function getJenisPajak() {
  const jenisPajak = await db.jenisPajak.findMany();
  return jenisPajak;
}

export type JenisPajakType = NonNullable<
  Awaited<ReturnType<typeof getJenisPajak>>
>;

export async function getJenisPemeriksaan() {
  const jenisPemeriksaan = await db.jenisPemeriksaan.findMany();
  return jenisPemeriksaan;
}

export type JenisPemeriksaanType = NonNullable<
  Awaited<ReturnType<typeof getJenisPemeriksaan>>
>;

export async function getHasilPemeriksaan() {
  const hasilPemeriksaan = await db.kategoriHasilPemeriksaan.findMany();
  return hasilPemeriksaan;
}

export type HasilPemeriksaanType = NonNullable<
  Awaited<ReturnType<typeof getHasilPemeriksaan>>
>;

export async function getTim() {
  const tim = await db.timPemeriksaan.findMany();
  return tim;
}

export async function getProgressPemeriksaan() {
  const progressPemeriksaan = await db.progresPemeriksaan.findMany();
  return progressPemeriksaan;
}

export type ProgressPemeriksaanType = NonNullable<
  Awaited<ReturnType<typeof getProgressPemeriksaan>>
>;

export type TimType = NonNullable<Awaited<ReturnType<typeof getTim>>>;

export async function getKategoriHasilPemeriksaan() {
  const kategoriHasilPemeriksaan = await db.kategoriHasilPemeriksaan.findMany();
  return kategoriHasilPemeriksaan;
}

export type KategoriHasilPemeriksaanType = NonNullable<
  Awaited<ReturnType<typeof getKategoriHasilPemeriksaan>>
>;

export async function getPegawai() {
  const pegawai = await db.pegawai.findMany();
  return pegawai;
}

export type PegawaiType = NonNullable<Awaited<ReturnType<typeof getPegawai>>>;
