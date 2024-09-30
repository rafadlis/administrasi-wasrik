"use client";

import { DaftarKegiatanPemeriksaanType } from "@/lib/get-kegiatan";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Ellipsis } from "lucide-react";
import { deleteKegiatan, undoDeleteKegiatan } from "@/lib/new-kegiatan";
import { toast } from "sonner";
import { SheetEditKegiatan } from "../sheet-edit-kegiatan";
import { KolomProgres } from "./column-progres";
import { KolomJurnal } from "./column-jurnal";
import { updateKegiatanPemeriksaan } from "@/lib/update-kegiatan";
import { KolomHasilPemeriksaan } from "./column-hasil-pemeriksaan";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

// Define a recursive type for countable fields
type CountableField<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? [CountableField<U>]
    : T[K] extends object
    ? CountableField<T[K]>
    : boolean;
};

// Specify which fields to count, including nested ones
const fieldsToCount: CountableField<DaftarKegiatanPemeriksaanType[0]> = {
  masa_pajak_awal: true,
  masa_pajak_akhir: true,
  kategori_hasil_pemeriksaan_id: true,
  keterangan: true,
  tim_id: true,
  ProgresPemeriksaan: [
    {
      tanggal_surat: true,
      nomor_surat: true,
      file_url: true,
    },
  ],
};

function countNullValues<T extends object>(
  obj: T,
  fields: CountableField<T>
): number {
  let count = 0;
  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = fields[key];
      if (obj[key as keyof T] === null) {
        count++;
      } else if (Array.isArray(obj[key as keyof T]) && Array.isArray(value)) {
        (obj[key as keyof T] as unknown[]).forEach((item) => {
          count += countNullValues(item as object, value[0]);
        });
      } else if (typeof value === "object" && value !== null) {
        count += countNullValues(
          obj[key as keyof T] as object,
          value as CountableField<object>
        );
      }
    }
  }
  return count;
}

function countAllValues<T extends object>(
  obj: T,
  fields: CountableField<T>
): number {
  let count = 0;
  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = fields[key];
      if (typeof value === "boolean") {
        count++;
      } else if (Array.isArray(obj[key as keyof T]) && Array.isArray(value)) {
        (obj[key as keyof T] as unknown[]).forEach((item) => {
          count += countAllValues(item as object, value[0]);
        });
      } else if (typeof value === "object" && value !== null) {
        count += countAllValues(
          obj[key as keyof T] as object,
          value as CountableField<object>
        );
      }
    }
  }
  return count;
}

export const columnsPelaksanaan: ColumnDef<DaftarKegiatanPemeriksaanType[0]>[] =
  [
    // MARK: Waktu Pemeriksaan
    {
      accessorKey: "waktuKegiatan",
      header: "Waktu Kegiatan",
      cell: ({ row }) => {
        const data = row.original;
        const hasValidDates = data.ProgresPemeriksaan.some(
          (progres) => progres.tanggal_surat
        );

        if (!hasValidDates) {
          return <Badge variant="destructive">Belum ada tanggal</Badge>;
        }

        const maxDate = data.ProgresPemeriksaan.reduce((maxDate, progres) => {
          const currentDate = progres.tanggal_surat;
          return currentDate && currentDate > maxDate ? currentDate : maxDate;
        }, new Date(0));

        const minDate = data.ProgresPemeriksaan.reduce((minDate, progres) => {
          const currentDate = progres.tanggal_surat;
          return currentDate && currentDate < minDate ? currentDate : minDate;
        }, new Date());

        // Calculate the number of days between maxDate and minDate
        const daysDifference = Math.ceil(
          (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        return (
          <div className="flex flex-row gap-2 items-center min-w-44">
            <Badge
              variant={`${
                daysDifference > 90
                  ? "destructive"
                  : daysDifference > 60
                  ? "warning"
                  : daysDifference < 30
                  ? "default"
                  : "outline"
              }`}
            >
              {daysDifference}
              <span className="text-xs text-muted-foreground">h</span>
            </Badge>
            <div className="flex flex-col">
              <span>
                {minDate.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="text-xs text-muted-foreground">
                s/d{" "}
                {maxDate.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        );
      },
    },

    // MARK: Masa Pajak
    {
      accessorKey: "masaPajak",
      header: "Masa Pajak",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <Popover>
            <PopoverTrigger className="flex flex-col min-w-28">
              {data.masa_pajak_awal?.toLocaleDateString("id-ID", {
                month: "long",
                year: "numeric",
              })}
              <span className="text-xs text-muted-foreground">
                {`s/d ${data.masa_pajak_akhir?.toLocaleDateString("id-ID", {
                  month: "long",
                  year: "numeric",
                })}`}
              </span>
            </PopoverTrigger>
            <PopoverContent>
              <form
                className="flex flex-col gap-3"
                action={async (formData) => {
                  const masaPajakAwal = formData.get("masa_pajak_awal");
                  const masaPajakAkhir = formData.get("masa_pajak_akhir");
                  await updateKegiatanPemeriksaan(data.id, {
                    masa_pajak_awal: new Date(masaPajakAwal as string),
                    masa_pajak_akhir: new Date(masaPajakAkhir as string),
                  }).then((res) => {
                    if (res.type === "success") {
                      toast.success(res.header, {
                        description: res.message,
                      });
                    } else if (res.type === "warning") {
                      toast.warning(res.header, {
                        description: res.message,
                      });
                    } else {
                      toast.error(res.header, {
                        description: res.message,
                      });
                    }
                  });
                }}
              >
                <fieldset className="flex flex-col gap-1">
                  <Label className=" text-muted-foreground">
                    Masa Pajak Awal
                  </Label>
                  <Input
                    type="date"
                    name="masa_pajak_awal"
                    defaultValue={
                      data.masa_pajak_awal?.toISOString().split("T")[0]
                    }
                  />
                </fieldset>
                <fieldset className="flex flex-col gap-1">
                  <Label className="text-muted-foreground">
                    Masa Pajak Akhir
                  </Label>
                  <Input
                    type="date"
                    name="masa_pajak_akhir"
                    defaultValue={
                      data.masa_pajak_akhir?.toISOString().split("T")[0]
                    }
                  />
                </fieldset>
                <Button type="submit">Simpan</Button>
              </form>
            </PopoverContent>
          </Popover>
        );
      },
    },
    // MARK: Wajib Pajak
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
    // MARK: Objek Pajak
    {
      accessorKey: "jenisPajak",
      header: "Jenis Pajak",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div>
            <div className="hidden xl:block">{data.JenisPajak?.nama}</div>
            <Badge variant="outline" className="xl:hidden">
              {data.JenisPajak?.kode_pajak}
            </Badge>
          </div>
        );
      },
    },

    // MARK: Hasil Pemeriksaan
    {
      accessorKey: "hasilPemeriksaan",
      header: "Hasil Pemeriksaan",
      cell: ({ row }) => {
        const data = row.original;
        return <KolomHasilPemeriksaan data={data} />;
      },
    },
    // MARK: Status Progres
    {
      accessorKey: "statusProgres",
      header: () => <div className="print:hidden">Status Progres</div>,
      cell: ({ row }) => {
        const data = row.original;
        const countNull = countNullValues(data, fieldsToCount);
        const countAll = countAllValues(data, fieldsToCount);
        const countDone = countAll - countNull;
        const precentageDone = (countDone / countAll) * 100;
        return (
          <div className="flex flex-col gap-1 w-32 print:hidden">
            <span className="flex flex-row justify-between">
              <span className="text-xs">{precentageDone.toFixed(0)}%</span>
              <span className="text-xs text-muted-foreground">
                {countDone} / {countAll}
              </span>
            </span>
            <Progress
              value={precentageDone}
              max={100}
              className={`${
                precentageDone === 100
                  ? "[&>*]:bg-green-500"
                  : precentageDone > 60
                  ? "[&>*]:bg-primary bg-primary/15"
                  : "[&>*]:bg-destructive bg-destructive/15"
              }`}
            />
          </div>
        );
      },
    },

    // MARK: Menu
    {
      accessorKey: "menu",
      header: () => <div className="print:hidden">Menu</div>,
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex gap-2 print:hidden">
            {/* MARK: Progres */}
            <KolomProgres data={data} />
            <KolomJurnal data={data} />
            <SheetEditKegiatan data={data} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="relative text-muted-foreground hover:text-foreground"
                >
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
