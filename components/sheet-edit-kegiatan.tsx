"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { DaftarKegiatanPemeriksaanType } from "@/lib/get-kegiatan";

import { useHasilPemeriksaan, useTim } from "@/lib/get-other-client";
import { updateKegiatanPemeriksaan } from "@/lib/update-kegiatan";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

export function SheetEditKegiatan({
  data,
}: {
  data: DaftarKegiatanPemeriksaanType[0];
}) {
  // MARK: Data
  const { dataHasilPemeriksaan, isLoadingHasilPemeriksaan } =
    useHasilPemeriksaan();
  const { dataTim, isLoadingTim } = useTim();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="secondary">
          <Pencil className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Kegiatan</SheetTitle>
          <SheetDescription>
            Edit informasi kegiatan untuk memperbarui status dan detail
            kegiatan.
          </SheetDescription>
        </SheetHeader>
        <Tabs className="mt-6" defaultValue="pemeriksaan">
          <TabsList>
            <TabsTrigger value="pemeriksaan">Pemeriksaan</TabsTrigger>
            <TabsTrigger value="tim">Tim</TabsTrigger>
            <TabsTrigger value="wp">WP</TabsTrigger>
          </TabsList>
          {/* MARK: Pemeriksaan */}
          <TabsContent
            value="pemeriksaan"
            className="flex flex-col gap-6 mt-8 "
          >
            <fieldset className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Hasil Pemeriksaan</Label>
              <Select
                value={data.KategoriHasilPemeriksaan?.id?.toString() ?? ""}
                onValueChange={async (value) =>
                  await updateKegiatanPemeriksaan(data.id, {
                    hasil_pemeriksaan_id: parseInt(value),
                  }).then((res) => {
                    if (res.type === "success") {
                      return toast.success(res.header, {
                        description: res.message,
                      });
                    } else {
                      return toast.error(res.header, {
                        description: res.message,
                      });
                    }
                  })
                }
              >
                <SelectTrigger disabled={isLoadingHasilPemeriksaan}>
                  <SelectValue
                    placeholder={
                      isLoadingHasilPemeriksaan
                        ? "Memuat..."
                        : data.KategoriHasilPemeriksaan?.keterangan
                        ? data.KategoriHasilPemeriksaan?.keterangan
                        : "Pilih..."
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {dataHasilPemeriksaan.map((hasil) => (
                    <SelectItem key={hasil.id} value={hasil.id.toString()}>
                      {hasil.keterangan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </fieldset>
            {/* keterangan */}
            <form
              className="flex flex-col gap-6"
              onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const form = e.currentTarget;
                await updateKegiatanPemeriksaan(data.id, {
                  keterangan: (
                    form.elements.namedItem("keterangan") as HTMLTextAreaElement
                  ).value,
                }).then((res) => {
                  if (res.type === "success") {
                    return toast.success(res.header, {
                      description: res.message,
                    });
                  } else {
                    return toast.error(res.header, {
                      description: res.message,
                    });
                  }
                });
              }}
            >
              <fieldset className="flex flex-col gap-2">
                <Label className="text-muted-foreground">Keterangan</Label>
                <Textarea
                  defaultValue={data.keterangan ?? ""}
                  name="keterangan"
                  placeholder={data.keterangan ?? "Masukkan keterangan"}
                />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="text-muted-foreground">Jumlah Kenaikan</Label>
                <Input
                  defaultValue={data.jumlah_kenaikan ?? ""}
                  name="jumlah_kenaikan"
                  type="number"
                  placeholder={
                    data.jumlah_kenaikan
                      ? data.jumlah_kenaikan.toString()
                      : "Rp"
                  }
                />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="text-muted-foreground">
                  Persentase Kenaikan (%)
                </Label>
                <Input
                  defaultValue={data.persentase_kenaikan ?? ""}
                  name="persentase_kenaikan"
                  type="number"
                  placeholder={
                    data.persentase_kenaikan
                      ? data.persentase_kenaikan.toString()
                      : "%"
                  }
                />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <Label className="text-muted-foreground">
                  Estimasi Presentasi Kenaikan (%)
                </Label>
                <Input
                  defaultValue={data.estimasi_presentasi_kenaikan ?? ""}
                  name="estimasi_presentasi_kenaikan"
                  type="number"
                  placeholder={
                    data.estimasi_presentasi_kenaikan
                      ? data.estimasi_presentasi_kenaikan.toString()
                      : "%"
                  }
                />
              </fieldset>
              <Button type="submit" className="ml-auto mt-auto">
                Simpan
              </Button>
            </form>
          </TabsContent>
          {/* MARK: Tim */}
          <TabsContent value="tim" className="flex flex-col gap-4">
            <fieldset className="flex flex-col gap-2">
              <Label>Tim</Label>
              <Select
                value={data.TimPemeriksaan?.id?.toString() ?? ""}
                onValueChange={async (value) =>
                  await updateKegiatanPemeriksaan(data.id, {
                    tim_id: parseInt(value),
                  }).then((res) => {
                    if (res.type === "success") {
                      return toast.success(res.header, {
                        description: res.message,
                      });
                    } else {
                      return toast.error(res.header, {
                        description: res.message,
                      });
                    }
                  })
                }
              >
                <SelectTrigger disabled={isLoadingTim}>
                  <SelectValue
                    placeholder={
                      isLoadingTim
                        ? "Memuat..."
                        : data.TimPemeriksaan?.nama
                        ? data.TimPemeriksaan?.nama
                        : "Pilih..."
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {dataTim.map((tim) => (
                    <SelectItem key={tim.id} value={tim.id.toString()}>
                      {tim.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Separator className="my-2" />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Jabatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.TimPemeriksaan?.AnggotaTimPemeriksaan.map((anggota) => (
                    <TableRow key={anggota.Pegawai.id}>
                      <TableCell>{anggota.Pegawai.panggilan}</TableCell>
                      <TableCell>{anggota.Pegawai.jabatan}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption>Anggota Tim</TableCaption>
              </Table>
              <Button className="mt-3 ml-auto">+ Tim Baru</Button>
            </fieldset>
          </TabsContent>
          {/* MARK: Hasil */}
          <TabsContent
            value="hasil"
            className="flex flex-col gap-4"
          ></TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
