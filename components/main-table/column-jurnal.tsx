import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  BookImage,
  BookMarked,
  BookOpenText,
  ImagePlus,
  PencilLine,
} from "lucide-react";
import { DaftarKegiatanPemeriksaanType } from "@/lib/get-kegiatan";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  createDokumentasiJurnal,
  createJurnalPemeriksaan,
  updateJurnalPemeriksaan,
} from "@/lib/new-other";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { uploadDokumen } from "@/lib/file-action";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function KolomJurnal({
  data,
}: {
  data: DaftarKegiatanPemeriksaanType[0];
}) {
  const [isJurnalOpen, setIsJurnalOpen] = useState(false);
  return (
    <Popover open={isJurnalOpen} onOpenChange={setIsJurnalOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant={isJurnalOpen ? "default" : "ghost"}
          className="relative group"
        >
          <BookMarked className="w-4 h-4" />
          <div
            className={`${
              data.JurnalPemeriksaan.length > 0
                ? "bg-primary text-primary-foreground"
                : "bg-destructive text-destructive-foreground"
            } absolute -top-0.5 -right-0.5 text-[0.5rem] rounded-full w-3 h-3 flex items-center justify-center ${
              isJurnalOpen ? "opacity-0" : "opacity-100"
            } transition-all`}
          >
            {data.JurnalPemeriksaan.length}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="left" className="w-full">
        <div className="flex justify-between items-center">
          <div className="font-semibold">Jurnal Pemeriksaan</div>
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" size="sm">
                + Tambah Jurnal
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              {/* MARK: + jurnal */}
              <form
                className="flex flex-col gap-3"
                action={async (formData) => {
                  console.log(formData);
                  const tanggal = formData.get("tanggal");
                  const nama = formData.get("nama");
                  const lokasi = formData.get("lokasi");
                  const keterangan = formData.get("keterangan");
                  if (
                    typeof tanggal === "string" &&
                    typeof nama === "string" &&
                    typeof lokasi === "string" &&
                    typeof keterangan === "string"
                  ) {
                    await createJurnalPemeriksaan(
                      data.id,
                      tanggal,
                      nama,
                      lokasi,
                      keterangan
                    ).then((res) => {
                      if (res.type === "success") {
                        toast.success(res.header, {
                          description: res.message,
                        });
                        setIsJurnalOpen(false);
                      } else {
                        toast.error(res.header, {
                          description: res.message,
                        });
                      }
                    });
                  }
                }}
              >
                <fieldset className="flex flex-col gap-2">
                  <Label className="text-muted-foreground">Tanggal</Label>
                  <Input type="date" name="tanggal" />
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <Label className="text-muted-foreground">Nama Kegiatan</Label>
                  <Input type="text" name="nama" />
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <Label className="text-muted-foreground">Lokasi</Label>
                  <Input type="text" name="lokasi" />
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <Label className="text-muted-foreground">Keterangan</Label>
                  <Textarea name="keterangan" />
                </fieldset>
                <Button type="submit" className="ml-auto">
                  Simpan
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>
        <Table className="w-full mt-3">
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Nama Kegiatan</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Keterangan</TableHead>
              <TableHead>Dokumentasi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.JurnalPemeriksaan.sort(
              (a, b) => b.tanggal.getTime() - a.tanggal.getTime()
            ).map((jurnal) => (
              <TableRow key={jurnal.id}>
                <TableCell>
                  {/* MARK: edit tanggal */}
                  <Popover>
                    <PopoverTrigger
                      className={`"text-left underline-offset-4 hover:underline ${
                        jurnal.tanggal.toLocaleDateString("id-ID")
                          ? ""
                          : "text-muted-foreground"
                      }`}
                    >
                      {jurnal.tanggal.toLocaleDateString("id-ID") ||
                        "klik untuk edit"}
                    </PopoverTrigger>
                    <PopoverContent>
                      <form
                        className="flex flex-col gap-2"
                        action={async (formData) => {
                          const tanggal = formData.get("tanggal");
                          if (typeof tanggal === "string") {
                            await updateJurnalPemeriksaan(jurnal.id, {
                              tanggal: new Date(tanggal),
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
                        <Input
                          type="date"
                          name="tanggal"
                          defaultValue={
                            jurnal.tanggal.toISOString().split("T")[0]
                          }
                        />
                        <Button type="submit">Simpan</Button>
                      </form>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <Popover>
                    {/* MARK: edit nama */}
                    <PopoverTrigger
                      className={`"text-left underline-offset-4 hover:underline ${
                        jurnal.nama ? "" : "text-muted-foreground"
                      }`}
                    >
                      {jurnal.nama || "klik untuk edit"}
                    </PopoverTrigger>
                    <PopoverContent>
                      <form
                        className="flex flex-col gap-2"
                        action={async (formData) => {
                          const nama = formData.get("nama");
                          if (typeof nama === "string") {
                            await updateJurnalPemeriksaan(jurnal.id, {
                              nama: nama,
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
                        <Input
                          type="text"
                          name="nama"
                          placeholder={jurnal.nama || "Nama"}
                          defaultValue={jurnal.nama}
                        />
                        <Button type="submit">Simpan</Button>
                      </form>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  {/* MARK: edit lokasi */}
                  <Popover>
                    <PopoverTrigger className="text-left underline-offset-4 hover:underline">
                      {jurnal.lokasi}
                    </PopoverTrigger>
                    <PopoverContent>
                      <form
                        className="flex flex-col gap-2"
                        action={async (formData) => {
                          const lokasi = formData.get("lokasi");
                          if (typeof lokasi === "string") {
                            await updateJurnalPemeriksaan(jurnal.id, {
                              lokasi: lokasi,
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
                        <Input
                          type="text"
                          name="lokasi"
                          defaultValue={jurnal.lokasi}
                        />
                        <Button type="submit">Simpan</Button>
                      </form>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell className="flex gap-2">
                  {/* MARK: keterangan */}
                  {jurnal.keterangan && (
                    <Popover>
                      <PopoverTrigger>
                        <Button size="icon" variant="secondary">
                          <BookOpenText className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-full max-w-prose"
                        align="end"
                        side="bottom"
                      >
                        <div className="text-sm ">{jurnal.keterangan}</div>
                      </PopoverContent>
                    </Popover>
                  )}
                  {/* MARK: edit keterangan */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size="icon" variant="secondary">
                        <PencilLine className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-full max-w-prose"
                      align="end"
                      side="bottom"
                    >
                      <form
                        className="flex flex-col gap-2"
                        action={async (formData) => {
                          const keterangan = formData.get("keterangan");
                          if (typeof keterangan === "string") {
                            await updateJurnalPemeriksaan(jurnal.id, {
                              keterangan: keterangan,
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
                        <fieldset className="flex flex-col gap-2">
                          <Label>Keterangan</Label>
                          <Textarea
                            name="keterangan"
                            defaultValue={jurnal.keterangan}
                            className="w-[400px] h-[200px]"
                          />
                        </fieldset>
                        <Button type="submit">Simpan</Button>
                      </form>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                {/* MARK: dokumentasi */}
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        type="button"
                        className="mr-2"
                      >
                        <ImagePlus className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <form
                        className="flex flex-col gap-2"
                        action={async (formData) => {
                          const file = formData.get("file");
                          if (file) {
                            const fileName = `Jurnal/${jurnal.tanggal
                              .toLocaleDateString("id-ID")
                              .replaceAll("/", "-")} - ${data.nama_wp} - ${
                              jurnal.lokasi
                            } - ${jurnal.nama}`;
                            await uploadDokumen(fileName, file as File).then(
                              async (res) => {
                                if (res.type === "success") {
                                  await createDokumentasiJurnal({
                                    file_url: res.data?.fullPath,
                                    jurnal_id: jurnal.id,
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
                        <Label>Dokumentasi</Label>
                        <Input type="file" name="file" required />
                        <Button type="submit">Simpan</Button>
                      </form>
                    </PopoverContent>
                  </Popover>
                  {/* MARK: view gallery */}
                  <Dialog>
                    <DialogTrigger>
                      <Button size="icon" variant="secondary">
                        <BookImage className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh]">
                      <DialogHeader>
                        <DialogTitle>Galeri Jurnal</DialogTitle>
                        <DialogDescription>
                          Daftar foto dari jurnal pemeriksaan
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-[70vh] w-full rounded-md border">
                        <div className="grid grid-cols-2 gap-4 p-4">
                          {jurnal.DokumentasiPemeriksaan.map((dok) => (
                            <figure key={dok.id} className="relative">
                              <Dialog>
                                <DialogTrigger>
                                  <div className="overflow-hidden rounded-md">
                                    <Image
                                      src={
                                        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${dok.file_url}` ||
                                        ""
                                      }
                                      alt="Dokumentasi"
                                      className="h-[200px] w-full object-cover transition-all hover:scale-105"
                                      width={300}
                                      height={200}
                                    />
                                  </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl max-h-screen flex items-center justify-center">
                                  <Image
                                    src={
                                      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${dok.file_url}` ||
                                      ""
                                    }
                                    alt="Dokumentasi Full View"
                                    className="max-w-full max-h-[90vh] object-contain"
                                    width={1200}
                                    height={900}
                                  />
                                </DialogContent>
                              </Dialog>
                              <figcaption className="mt-2 text-xs text-muted-foreground">
                                {dok.file_url}
                              </figcaption>
                            </figure>
                          ))}
                        </div>
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PopoverContent>
    </Popover>
  );
}
