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
import { GetSetoranTerdekat } from "@/lib/get-from-epad-client";
import { Skeleton } from "../ui/skeleton";
import { TrendingDown, TrendingUp } from "lucide-react";
export function KolomHasilPemeriksaan({
  data,
}: {
  data: DaftarKegiatanPemeriksaanType[0];
}) {
  const { dataHasilPemeriksaan } = useHasilPemeriksaan();
  const latestMasaPajak = new Date(data.masa_pajak_akhir || "");
  const { setoranTerdekat, isLoadingNearestSetoran } = GetSetoranTerdekat(
    data.NPWPD,
    latestMasaPajak
  );

  const averageThreeEarliestSetoranTerdekat =
    setoranTerdekat
      .slice(0, 3)
      .reduce((acc, curr) => acc + Number(curr.Pokok), 0) / 3;

  const latestPokokAfterLatestMasaPajak = setoranTerdekat
    .filter((item) => new Date(item.MasaPajak) > latestMasaPajak && item.Pokok)
    .sort(
      (a, b) =>
        new Date(b.MasaPajak).getTime() - new Date(a.MasaPajak).getTime()
    );

  const latestPokok =
    latestPokokAfterLatestMasaPajak.length > 0
      ? latestPokokAfterLatestMasaPajak[0].Pokok
      : null;

  const percentChange =
    ((Number(latestPokok) - averageThreeEarliestSetoranTerdekat) /
      averageThreeEarliestSetoranTerdekat) *
    100;

  return (
    <div className="flex flex-row gap-2">
      {isLoadingNearestSetoran && !percentChange ? (
        <Skeleton className="w-14 h-4 order-last" />
      ) : (
        <Badge
          className={`order-last text-muted-foreground flex flex-row gap-2 justify-center items-center ${
            percentChange > 100
              ? "text-green-700"
              : percentChange <= 0
              ? "text-red-500"
              : "text-muted-foreground"
          }`}
          variant="outline"
        >
          {percentChange > 0 ? (
            <TrendingUp
              className={`w-3 h-3 ${
                percentChange > 100
                  ? "text-green-500"
                  : percentChange < 50 && percentChange > 0
                  ? "text-yellow-500"
                  : "text-muted-foreground"
              }`}
            />
          ) : (
            <TrendingDown
              className={`w-3 h-3 ${
                percentChange < 0 ? "text-red-500" : "text-muted-foreground"
              }`}
            />
          )}
          {percentChange.toLocaleString("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          %
        </Badge>
      )}

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
            {data.KategoriHasilPemeriksaan?.singkatan || "???"}
          </Badge>
        </PopoverTrigger>
        <PopoverContent>
          <Label className="text-muted-foreground">
            Pilih Hasil Pemeriksaan
          </Label>
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
    </div>
  );
}
