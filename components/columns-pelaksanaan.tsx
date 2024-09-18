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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis, FolderOpen, ScanEye, Upload } from "lucide-react";
import { deleteKegiatan, undoDeleteKegiatan } from "@/lib/new-kegiatan";
import { toast } from "sonner";
import { SheetEditKegiatan } from "./sheet-edit-kegiatan";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { updateProgresPemeriksaan } from "@/lib/update-kegiatan";
import { uploadDokumen } from "@/lib/new-file";

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
              s.d.{" "}
              {data.tgl_pemeriksaan_selesai?.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
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
        return <span>{data.JenisPemeriksaan?.nama}</span>;
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
            {data.KategoriHasilPemeriksaan?.keterangan}
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
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="secondary">
                  <FolderOpen className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" side="left" className="w-full">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Diubah</TableHead>
                      <TableHead>Proses</TableHead>
                      <TableHead>Nomor Surat</TableHead>
                      <TableHead>Tanggal Surat</TableHead>
                      <TableHead>Dokumen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.ProgresPemeriksaan?.sort((a, b) => {
                      return (
                        (a.KategoriProgresPemeriksaan?.id ?? 0) -
                        (b.KategoriProgresPemeriksaan?.id ?? 0)
                      );
                    }).map((progres) => (
                      <TableRow key={progres.id}>
                        <TableCell className="text-muted-foreground">
                          {progres.updatedAt?.toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </TableCell>
                        {/* MARK: kategori */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  progres.nomor_surat && progres.tanggal_surat
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                }`}
                              ></div>
                              <div
                                className={`absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75 ${
                                  progres.nomor_surat && progres.tanggal_surat
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                }`}
                              ></div>
                            </div>
                            <div>
                              {progres.KategoriProgresPemeriksaan?.nama}
                            </div>
                          </div>
                        </TableCell>
                        {/* MARK: NS */}
                        <TableCell>
                          <Popover>
                            <PopoverTrigger
                              className={`hover:underline underline-offset-4 ${
                                progres.nomor_surat
                                  ? ""
                                  : "text-muted-foreground"
                              }`}
                            >
                              {progres.nomor_surat || "Klik untuk edit"}
                            </PopoverTrigger>
                            <PopoverContent>
                              <form
                                className="flex flex-col gap-2"
                                action={async (formData) => {
                                  const nomorSurat =
                                    formData.get("nomor_surat");
                                  if (typeof nomorSurat === "string") {
                                    await updateProgresPemeriksaan(progres.id, {
                                      nomor_surat: nomorSurat,
                                    }).then((res) => {
                                      if (res.type === "success") {
                                        toast.success(res.header, {
                                          description: res.message,
                                        });
                                      } else {
                                        toast.error(res.header, {
                                          description: res.message,
                                        });
                                      }
                                    });
                                  }
                                }}
                              >
                                <Label>Nomor Surat</Label>
                                <Input
                                  id="nomor_surat"
                                  name="nomor_surat"
                                  type="text"
                                  placeholder="Masukkan Nomor Surat"
                                />
                                <Button type="submit">Simpan</Button>
                              </form>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                        {/* MARK: TS */}
                        <TableCell>
                          <Popover>
                            <PopoverTrigger
                              className={`hover:underline underline-offset-4 ${
                                progres.tanggal_surat
                                  ? ""
                                  : "text-muted-foreground"
                              }`}
                            >
                              {progres.tanggal_surat?.toLocaleDateString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              ) || "Klik untuk edit"}
                            </PopoverTrigger>
                            <PopoverContent>
                              <form
                                className="flex flex-col gap-2"
                                action={async (formData) => {
                                  const tanggalSurat =
                                    formData.get("tanggal_surat");
                                  if (typeof tanggalSurat === "string") {
                                    await updateProgresPemeriksaan(progres.id, {
                                      tanggal_surat: new Date(tanggalSurat),
                                    }).then((res) => {
                                      if (res.type === "success") {
                                        toast.success(res.header, {
                                          description: res.message,
                                        });
                                      } else {
                                        toast.error(res.header, {
                                          description: res.message,
                                        });
                                      }
                                    });
                                  }
                                }}
                              >
                                <Label>Tanggal Surat</Label>
                                <Input
                                  id="tanggal_surat"
                                  name="tanggal_surat"
                                  type="date"
                                  placeholder="Masukkan Tanggal Surat"
                                />
                                <Button type="submit">Simpan</Button>
                              </form>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                        {/* MARK: Dokumen */}
                        <TableCell className="flex gap-2">
                          <Popover>
                            <PopoverTrigger>
                              <Button size="icon" variant="secondary">
                                <Upload className="w-4 h-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <form
                                className="flex flex-col gap-2"
                                action={async (formData) => {
                                  const file = formData.get("file");
                                  if (file) {
                                    const kategoriNama =
                                      progres.KategoriProgresPemeriksaan
                                        ?.nama || "";
                                    const nomorSurat =
                                      progres.nomor_surat || "";
                                    const fileName = `${kategoriNama}${nomorSurat}`;
                                    await uploadDokumen(
                                      fileName,
                                      progres.id,
                                      file as File
                                    ).then(async (res) => {
                                      if (res.type === "success") {
                                        await updateProgresPemeriksaan(
                                          progres.id,
                                          {
                                            file_url: res.data?.fullPath,
                                          }
                                        ).then((res) => {
                                          toast.success(res.header, {
                                            description: res.message,
                                          });
                                        });
                                      } else {
                                        toast.error(res.header, {
                                          description: res.message,
                                        });
                                      }
                                    });
                                  }
                                }}
                              >
                                <Label>Dokumen</Label>
                                <Input
                                  id="file"
                                  name="file"
                                  type="file"
                                  placeholder="Masukkan Dokumen"
                                  className="cursor-pointer"
                                />
                                <Button type="submit">Simpan</Button>
                              </form>
                            </PopoverContent>
                          </Popover>
                          <Button
                            size="icon"
                            variant="secondary"
                            disabled={progres.file_url === null}
                          >
                            <ScanEye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </PopoverContent>
            </Popover>
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
