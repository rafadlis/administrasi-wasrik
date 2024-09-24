import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useHasilPemeriksaan } from "@/lib/get-other-client";
import { DaftarKegiatanPemeriksaanType } from "@/lib/get-kegiatan";
import { updateKegiatanPemeriksaan } from "@/lib/update-kegiatan";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
export function KolomHasilPemeriksaan({
  data,
}: {
  data: DaftarKegiatanPemeriksaanType[0];
}) {
  const { dataHasilPemeriksaan } = useHasilPemeriksaan();
  return (
    <Popover>
      <PopoverTrigger>
        <Badge
          variant={
            data.KategoriHasilPemeriksaan?.keterangan === "Kurang Bayar"
              ? "default"
              : data.KategoriHasilPemeriksaan?.keterangan === "Lebih Bayar" ||
                !data.KategoriHasilPemeriksaan?.keterangan
              ? "destructive"
              : "outline"
          }
        >
          {data.KategoriHasilPemeriksaan?.keterangan || "Belum ada"}
        </Badge>
      </PopoverTrigger>
      <PopoverContent>
        <Label className="text-muted-foreground">Pilih Hasil Pemeriksaan</Label>
        <Select
          name="hasil_pemeriksaan"
          defaultValue={data.KategoriHasilPemeriksaan?.id.toString()}
          onValueChange={async (value) => {
            await updateKegiatanPemeriksaan(data.id, {
              kategori_hasil_pemeriksaan_id: parseInt(value),
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
          <SelectTrigger>
            <SelectValue placeholder="Pilih Hasil Pemeriksaan" />
          </SelectTrigger>
          <SelectContent>
            {dataHasilPemeriksaan.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.keterangan}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
}
