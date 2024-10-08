"use client";

import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookmarkX, CheckIcon } from "lucide-react";

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function MonthFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (month: number | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (month) {
      params.set("month", month.toString());
    } else {
      params.delete("month");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          B
          {searchParams.get("month") && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-row justify-between">
          <span>Bulan</span>
          <BookmarkX
            className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={() => updateFilter(undefined)}
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {months.map((month, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => updateFilter(index + 1)}
            className="flex flex-row justify-between cursor-pointer"
          >
            {month}
            <CheckIcon
              className={`w-4 h-4 ${
                index + 1 === Number(searchParams.get("month"))
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
