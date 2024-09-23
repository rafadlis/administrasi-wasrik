"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FolderOpen } from "lucide-react";
import { DaftarKegiatanPemeriksaanType } from "@/lib/get-kegiatan";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { ScanEye } from "lucide-react";
import { Trash } from "lucide-react";
import { deleteDokumen, uploadDokumen } from "@/lib/file-action";
import { toast } from "sonner";
import { updateProgresPemeriksaan } from "@/lib/update-kegiatan";
import Link from "next/link";

export function KolomProgres({
  data,
}: {
  data: DaftarKegiatanPemeriksaanType[0];
}) {
  return (
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
                          progres.nomor_surat &&
                          progres.tanggal_surat &&
                          progres.file_url
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                      <div
                        className={`absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75 ${
                          progres.nomor_surat &&
                          progres.tanggal_surat &&
                          progres.file_url
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                    </div>
                    <div>{progres.KategoriProgresPemeriksaan?.nama}</div>
                  </div>
                </TableCell>
                {/* MARK: NS */}
                <TableCell>
                  <Popover>
                    <PopoverTrigger
                      className={`hover:underline underline-offset-4 ${
                        progres.nomor_surat ? "" : "text-muted-foreground"
                      }`}
                    >
                      {progres.nomor_surat || "Klik untuk edit"}
                    </PopoverTrigger>
                    <PopoverContent>
                      <form
                        className="flex flex-col gap-2"
                        action={async (formData) => {
                          const nomorSurat = formData.get("nomor_surat");
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
                        progres.tanggal_surat ? "" : "text-muted-foreground"
                      }`}
                    >
                      {progres.tanggal_surat?.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }) || "Klik untuk edit"}
                    </PopoverTrigger>
                    <PopoverContent>
                      <form
                        className="flex flex-col gap-2"
                        action={async (formData) => {
                          const tanggalSurat = formData.get("tanggal_surat");
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
                    {progres.file_url === null && (
                      <PopoverTrigger>
                        <Button size="icon" variant="secondary">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                    )}
                    <PopoverContent>
                      <form
                        className="flex flex-col gap-2"
                        action={async (formData) => {
                          const file = formData.get("file");
                          if (file) {
                            const kategoriNama =
                              progres.KategoriProgresPemeriksaan?.nama || "";
                            const nomorSurat =
                              progres.nomor_surat?.replace(/\//g, ".") || "";
                            const fileName = `${kategoriNama} - ${nomorSurat} - ${
                              data.nama_wp
                            } - ${data.NPWPD || "no NPWPD"}`;
                            await uploadDokumen(fileName, file as File).then(
                              async (res) => {
                                if (res.type === "success") {
                                  await updateProgresPemeriksaan(progres.id, {
                                    file_url: res.data?.fullPath,
                                  }).then((res) => {
                                    toast.success(res.header, {
                                      description: res.message,
                                    });
                                  });
                                } else {
                                  toast.error(res.header, {
                                    description: res.message,
                                  });
                                }
                              }
                            );
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
                  {/* MARK: Lihat dok */}
                  {progres.file_url && (
                    <Button
                      size="icon"
                      variant="secondary"
                      disabled={progres.file_url === null}
                      asChild
                    >
                      <Link
                        href={
                          progres.file_url
                            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${progres.file_url}`
                            : "#"
                        }
                        target="_blank"
                      >
                        <ScanEye className="w-4 h-4" />
                      </Link>
                    </Button>
                  )}
                  {/* MARK:Delete Dokumen */}
                  {progres.file_url && (
                    <Button
                      size="icon"
                      variant="destructive"
                      disabled={progres.file_url === null}
                      onClick={async () => {
                        if (progres.file_url) {
                          await deleteDokumen(progres.file_url).then(
                            async (res) => {
                              if (res.type === "success") {
                                await updateProgresPemeriksaan(progres.id, {
                                  file_url: null,
                                }).then((res) => {
                                  toast.success(res.header, {
                                    description:
                                      res.message + "file berhasil dihapus",
                                  });
                                });
                              } else {
                                toast.error(res.header, {
                                  description: res.message,
                                });
                              }
                            }
                          );
                        }
                      }}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PopoverContent>
    </Popover>
  );
}
