import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { BookMarked, BookOpenText, PencilLine } from "lucide-react";
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
  createJurnalPemeriksaan,
  updateJurnalPemeriksaan,
} from "@/lib/new-other";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { useState } from "react";

export function KolomJurnal({
  data,
}: {
  data: DaftarKegiatanPemeriksaanType[0];
}) {
  const [isNewJurnalOpen, setIsNewJurnalOpen] = useState(false);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="secondary">
          <BookMarked className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="left" className="w-full">
        <div className="flex justify-between items-center">
          <div className="font-semibold">Jurnal Pemeriksaan</div>
          <Popover open={isNewJurnalOpen} onOpenChange={setIsNewJurnalOpen}>
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
                        setIsNewJurnalOpen(false);
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
                  <Label className="text-muted-foreground">Nama</Label>
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
              <TableHead>Nama</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Keterangan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.JurnalPemeriksaan.map((jurnal) => (
              <TableRow key={jurnal.id}>
                <TableCell>
                  {/* MARK: edit tanggal */}
                  <Popover>
                    <PopoverTrigger className="text-left underline-offset-4 hover:underline">
                      {jurnal.tanggal.toLocaleDateString("id-ID")}
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
                          defaultValue={jurnal.tanggal.toLocaleDateString(
                            "id-ID"
                          )}
                        />
                        <Button type="submit">Simpan</Button>
                      </form>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <Popover>
                    {/* MARK: edit nama */}
                    <PopoverTrigger className="text-left underline-offset-4 hover:underline">
                      {jurnal.nama}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PopoverContent>
    </Popover>
  );
}
