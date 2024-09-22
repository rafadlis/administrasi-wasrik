"use client";

import { DaftarKegiatanPemeriksaanType } from "@/lib/get-kegiatan";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { deleteKegiatan, undoDeleteKegiatan } from "@/lib/new-kegiatan";
import { toast } from "sonner";
import { SheetEditKegiatan } from "../sheet-edit-kegiatan";
import { KolomProgres } from "./column-progres";
import { KolomJurnal } from "./column-jurnal";

// TODO: tambah Progress: SP, ST, BA Pertemuan, BAHP, LHP
// TODO: tambah hasil: skpdkb, Nota Dinas, Bimbingan
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
      accessorKey: "wajibPajak",
      header: "Wajib Pajak",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex flex-col">
            <span>{data.nama_wp}</span>
            <span className="text-xs text-muted-foreground">{data.NPWPD}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "objekPajak",
      header: "Objek Pajak",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex flex-col">
            {data.JenisPajak?.nama}
            <span className="text-xs text-muted-foreground">
              {data.masa_pajak_awal?.toLocaleDateString("id-ID", {
                month: "2-digit",
                year: "numeric",
              })}
              -
              {data.masa_pajak_akhir?.toLocaleDateString("id-ID", {
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
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
            <span>{data.TimPemeriksaan?.nama}</span>
            <span className="text-sm text-muted-foreground">
              {data.TimPemeriksaan?.AnggotaTimPemeriksaan?.map(
                (petugas) => petugas.Pegawai.panggilan
              ).join(", ")}
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
        return (
          <Badge
            variant={
              data.ProgresPemeriksaan?.some(
                (progres) =>
                  progres.KategoriProgresPemeriksaan?.nama === "Selesai"
              )
                ? "default"
                : "outline"
            }
          >
            {data.KategoriHasilPemeriksaan?.keterangan || "Belum ada"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "menu",
      header: "Menu",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex gap-2">
            {/* MARK: Progres */}
            <KolomProgres data={data} />
            <KolomJurnal data={data} />
            <SheetEditKegiatan data={data} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                  <Ellipsis className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  disabled={data.ProgresPemeriksaan?.some(
                    (progres) =>
                      progres.KategoriProgresPemeriksaan?.nama === "Selesai"
                  )}
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
