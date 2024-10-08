"use client";

import { useJenisPajak } from "@/lib/get-other-client";
import { useRouter, useSearchParams } from "next/navigation";
import { BookmarkX, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function FilterJenisPajak() {
  const { dataJenisPajak } = useJenisPajak();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (jenisPajakId: string | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (jenisPajakId) {
      params.set("jenisPajakId", jenisPajakId);
    } else {
      params.delete("jenisPajakId");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          J
          {searchParams.get("jenisPajakId") && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-row justify-between">
          <span>Jenis Pajak</span>
          <BookmarkX
            className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={() => updateFilter(undefined)}
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dataJenisPajak.map((jenisPajak) => (
          <DropdownMenuItem
            key={jenisPajak.id}
            onClick={() => updateFilter(jenisPajak.id.toString())}
            className="flex flex-row justify-between cursor-pointer"
          >
            {jenisPajak.nama}
            <CheckIcon
              className={`w-4 h-4 ${
                jenisPajak.id.toString() === searchParams.get("jenisPajakId")
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
