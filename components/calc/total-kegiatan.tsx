import { getTotalKegiatan } from "@/lib/get-kegiatan";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { Progress } from "../ui/progress";

export async function TotalKegiatan() {
  const total = await getTotalKegiatan();
  const target = 48;
  const percent = (total / target) * 100;
  return (
    <div className="flex flex-col gap-1">
      <Suspense fallback={<Skeleton className="w-10 h-4" />}>
        <div className="text-sm text-muted-foreground">{`${total} Pemeriksaan dari target ${target} ${
          total < target ? `(sisa ${target - total})` : ""
        }`}</div>
      </Suspense>
      <Progress
        value={percent}
        className="[&>*]:bg-green-500 bg-green-500/20"
      />
    </div>
  );
}
