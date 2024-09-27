import { Button } from "./ui/button";
import Link from "next/link";
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

export function MonthFilter({
  selectedYear,
  selectedMonth,
}: {
  selectedYear: number | undefined;
  selectedMonth: number | undefined;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          B
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-row justify-between">
          <span>Bulan</span>
          <Link href={{ query: { month: undefined, year: selectedYear } }}>
            <BookmarkX className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {months.map((month, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link
              replace
              href={{ query: { month: index + 1, year: selectedYear } }}
              className="flex flex-row justify-between"
            >
              {month}
              <CheckIcon
                className={`w-4 h-4 ${
                  index + 1 === selectedMonth ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
