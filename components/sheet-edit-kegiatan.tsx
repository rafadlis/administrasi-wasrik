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

import {
  useHasilPemeriksaan,
  useJenisPemeriksaan,
  useTim,
} from "@/lib/get-other-client";
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
import { Input } from "./ui/input";

export function SheetEditKegiatan({
  data,
}: {
  data: DaftarKegiatanPemeriksaanType[0];
}) {
  // MARK: Data
  const { dataJenisPemeriksaan, isLoadingJenisPemeriksaan } =
    useJenisPemeriksaan();
  const { dataHasilPemeriksaan, isLoadingHasilPemeriksaan } =
    useHasilPemeriksaan();
  const { dataTim, isLoadingTim } = useTim();

  // MARK: Function
  const handleJenisPemeriksaanChange = async (value: string) => {
    await updateKegiatanPemeriksaan(data.id, {
      jenis_pemeriksaan_id: parseInt(value),
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
  };

  const handleHasilPemeriksaanChange = async (value: string) => {
    await updateKegiatanPemeriksaan(data.id, {
      hasil_pemeriksaan_id: parseInt(value),
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
  };

  const handleTimChange = async (value: string) => {
    await updateKegiatanPemeriksaan(data.id, {
      tim_id: parseInt(value),
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
  };

  const handleTanggalAwalChange = async (value: string) => {
    await updateKegiatanPemeriksaan(data.id, {
      tgl_pemeriksaan_mulai: new Date(value),
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
  };

  const handleTanggalAkhirChange = async (value: string) => {
    await updateKegiatanPemeriksaan(data.id, {
      tgl_pemeriksaan_selesai: new Date(value),
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
  };

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
        <Tabs className="mt-6" defaultValue="kegiatan">
          <TabsList>
            <TabsTrigger value="kegiatan">Kegiatan</TabsTrigger>
            <TabsTrigger value="tim">Tim</TabsTrigger>
            <TabsTrigger value="wp">WP</TabsTrigger>
            <TabsTrigger value="hasil">Hasil</TabsTrigger>
            <TabsTrigger value="dokumen">Dok</TabsTrigger>
          </TabsList>
          {/* MARK: Kegiatan */}
          <TabsContent value="kegiatan" className="flex flex-col gap-4 mt-6 ">
            <fieldset className="flex flex-col gap-2">
              <Label>Tanggal Awal</Label>
              <Input
                type="date"
                value={
                  data.tgl_pemeriksaan_mulai
                    ? data.tgl_pemeriksaan_mulai.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => handleTanggalAwalChange(e.target.value)}
              />
              <Label>Tanggal Akhir</Label>
              <Input
                type="date"
                value={
                  data.tgl_pemeriksaan_selesai
                    ? data.tgl_pemeriksaan_selesai.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => handleTanggalAkhirChange(e.target.value)}
              />
            </fieldset>
            <fieldset className="flex flex-col gap-2">
              <Label>Jenis Pemeriksaan</Label>
              <Select
                value={data.jenis_pemeriksaan_id?.toString() ?? ""}
                onValueChange={handleJenisPemeriksaanChange}
              >
                <SelectTrigger disabled={isLoadingJenisPemeriksaan}>
                  <SelectValue
                    placeholder={
                      isLoadingJenisPemeriksaan
                        ? "Memuat..."
                        : data.jenis_pemeriksaan?.nama
                        ? data.jenis_pemeriksaan?.nama
                        : "Pilih..."
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {dataJenisPemeriksaan.map((jenis) => (
                    <SelectItem key={jenis.id} value={jenis.id.toString()}>
                      {jenis.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </fieldset>
          </TabsContent>
          {/* MARK: Tim */}
          <TabsContent value="tim" className="flex flex-col gap-4">
            <fieldset className="flex flex-col gap-2">
              <Label>Tim</Label>
              <Select
                value={data.tim?.id?.toString() ?? ""}
                onValueChange={handleTimChange}
              >
                <SelectTrigger disabled={isLoadingTim}>
                  <SelectValue
                    placeholder={
                      isLoadingTim
                        ? "Memuat..."
                        : data.tim?.nama
                        ? data.tim?.nama
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
                  {data.tim?.anggota_tim.map((anggota) => (
                    <TableRow key={anggota.petugas.id}>
                      <TableCell>{anggota.petugas.panggilan}</TableCell>
                      <TableCell>{anggota.petugas.jabatan}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption>Anggota Tim</TableCaption>
              </Table>
              <Button className="mt-3 ml-auto">+ Tim Baru</Button>
            </fieldset>
          </TabsContent>
          {/* MARK: Hasil */}
          <TabsContent value="hasil" className="flex flex-col gap-4">
            <fieldset className="flex flex-col gap-2">
              <Label>Hasil Pemeriksaan</Label>
              <Select
                value={data.hasil_pemeriksaan?.id?.toString() ?? ""}
                onValueChange={handleHasilPemeriksaanChange}
              >
                <SelectTrigger disabled={isLoadingHasilPemeriksaan}>
                  <SelectValue
                    placeholder={
                      isLoadingHasilPemeriksaan
                        ? "Memuat..."
                        : data.hasil_pemeriksaan?.keterangan
                        ? data.hasil_pemeriksaan?.keterangan
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
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
