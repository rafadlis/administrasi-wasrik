"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DaftarLHPType } from "@/lib/get-surat";
export const columnsDaftarLHP: ColumnDef<DaftarLHPType[0]>[] = [
  {
    accessorKey: "nomor_surat",
    header: "Nomor Surat",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex flex-col">
          <span>{data.nomor_surat}</span>
          <span className="text-xs text-muted-foreground">
            TMT: {data.tanggal_surat?.toLocaleDateString("id-ID")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "nama_wp",
    header: "Nama WP",
    cell: ({ row }) => {
      const data = row.original;
      return <div>{data.KegiatanPemeriksaan.nama_wp}</div>;
    },
  },
  {
    accessorKey: "jenis_wp",
    header: "Jenis WP",
    cell: ({ row }) => {
      const data = row.original;
      return <div>{data.file_url}</div>;
    },
  },
];
