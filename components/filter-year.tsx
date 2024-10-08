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
} from "./ui/dropdown-menu";
import { CheckIcon, BookmarkX } from "lucide-react";

export function FilterYear() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const years = [2022, 2023, 2024];

  const updateFilter = (year: number | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (year) {
      params.set("year", year.toString());
    } else {
      params.delete("year");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          T
          {searchParams.get("year") && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-row justify-between">
          <span>Tahun</span>
          <BookmarkX
            className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={() => updateFilter(undefined)}
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {years.map((year) => (
          <DropdownMenuItem
            key={year}
            onClick={() => updateFilter(year)}
            className="flex flex-row justify-between cursor-pointer"
          >
            {year}
            <CheckIcon
              className={`w-4 h-4 ${
                year === Number(searchParams.get("year"))
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
