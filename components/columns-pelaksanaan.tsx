"use client";

import { DaftarKegiatanPemeriksaanType } from "@/lib/get-kegiatan";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { Ellipsis, FolderOpen } from "lucide-react";
import { deleteKegiatan, undoDeleteKegiatan } from "@/lib/new-kegiatan";
import { toast } from "sonner";
import { SheetEditKegiatan } from "./sheet-edit-kegiatan";

export const columnsPelaksanaan: ColumnDef<DaftarKegiatanPemeriksaanType[0]>[] =
  [
    {
      accessorKey: "terakhirDiubah",
      header: "Terakhir Diubah",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex flex-col">
            {data.updatedAt?.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
            <span className="text-xs text-muted-foreground">
              {data.updatedAt?.toLocaleTimeString("id-ID")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "tanggalKegiatan",
      header: "Waktu Kegiatan",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex flex-col">
            <span>
              {data.tgl_pemeriksaan_mulai?.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="text-sm text-muted-foreground">
              Sampai:{" "}
              {data.tgl_pemeriksaan_selesai?.toLocaleTimeString("id-ID")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "jenisKegiatan",
      header: "Jenis Kegiatan",
      cell: ({ row }) => {
        const data = row.original;
        return <span>{data.jenis_pemeriksaan?.nama}</span>;
      },
    },
    {
      accessorKey: "wajibPajak",
      header: "Wajib Pajak",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex flex-col">
            <span>{data.nama_wp}</span>
            <span className="text-sm text-muted-foreground">{data.NPWPD}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <Badge
            variant={
              data.status === "PROSES"
                ? "outline"
                : data.status === "BATAL"
                ? "destructive"
                : "default"
            }
            className="capitalize"
          >
            {data.status === "PROSES"
              ? "Proses"
              : data.status === "BATAL"
              ? "Dibatalkan"
              : "Selesai"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "tim",
      header: "Tim",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex flex-col">
            <span>{data.tim?.nama}</span>
            <span className="text-sm text-muted-foreground">
              {data.tim?.anggota_tim
                ?.map((petugas) => petugas.petugas.panggilan)
                .join(", ")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "hasilPemeriksaan",
      header: "Hasil Pemeriksaan",
      cell: ({ row }) => {
        const data = row.original;
        return <span>{data.hasil_pemeriksaan?.keterangan}</span>;
      },
    },
    {
      accessorKey: "menu",
      header: "Menu",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex gap-2">
            <Button size="icon" variant="secondary" asChild>
              <Link href={`#`}>
                <FolderOpen className="w-4 h-4" />
              </Link>
            </Button>
            <SheetEditKegiatan data={data} />
            {/* MARK: Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                  <Ellipsis className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  disabled={
                    data.status === "BATAL" || data.status === "SELESAI"
                  }
                  onClick={async () => {
                    await deleteKegiatan(data.id).then((res) => {
                      toast(res.header, {
                        description: res.message,
                        cancel: true,
                        action: {
                          label: "Batal",
                          onClick: async () => {
                            await undoDeleteKegiatan(res.deletedData).then(
                              (res) => {
                                toast(res.header, {
                                  description: res.message,
                                });
                              }
                            );
                            toast.dismiss();
                          },
                        },
                      });
                    });
                  }}
                >
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
