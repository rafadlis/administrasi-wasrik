import { Button } from "./ui/button";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CheckIcon, BookmarkX } from "lucide-react";

export function FilterYear({
  selectedMonth,
  selectedYear,
}: {
  selectedMonth: number | undefined;
  selectedYear: number | undefined;
}) {
  const years = [2022, 2023, 2024];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          T
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-row justify-between">
          <span>Tahun</span>
          <Link href={{ query: { year: undefined, month: selectedMonth } }}>
            <BookmarkX className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {years.map((year) => (
          <DropdownMenuItem key={year} asChild>
            <Link
              replace
              href={{ query: { year, month: selectedMonth } }}
              className="flex flex-row justify-between"
            >
              {year}
              <CheckIcon
                className={`w-4 h-4 ${
                  year === selectedYear ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
