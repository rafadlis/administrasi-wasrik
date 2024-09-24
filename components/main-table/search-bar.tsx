"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="relative flex flex-row gap-3 flex-1">
      <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3" />
      <Input
        placeholder="Cari"
        className="pl-9"
        onChange={(e) => {
          router.replace(
            pathname + "?" + createQueryString("search", e.target.value)
          );
        }}
      />
    </div>
  );
}
