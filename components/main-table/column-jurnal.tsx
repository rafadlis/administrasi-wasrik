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
import { updateJurnalPemeriksaan } from "@/lib/new-other";
import { toast } from "sonner";

export function KolomJurnal({
  data,
}: {
  data: DaftarKegiatanPemeriksaanType[0];
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button size="icon" variant="secondary">
          <BookMarked className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="left" className="w-full">
        <Table className="w-full">
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
                  {jurnal.tanggal.toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>{jurnal.nama}</TableCell>
                <TableCell>{jurnal.lokasi}</TableCell>
                <TableCell className="flex gap-2">
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size="icon" variant="secondary">
                        <PencilLine className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-prose">
                      <form
                        className="flex flex-col gap-2"
                        action={async (formData) => {
                          const keterangan = formData.get("keterangan");
                          if (typeof keterangan === "string") {
                            await updateJurnalPemeriksaan(
                              jurnal.id,
                              keterangan
                            ).then((res) => {
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
