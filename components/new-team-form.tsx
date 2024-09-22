"use client";

import { Button } from "./ui/button";
import { usePegawai } from "@/lib/get-other-client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pegawai } from "@prisma/client";
import { useState } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { createTim } from "@/lib/new-other";
import { toast } from "sonner";
import { UserMinus } from "lucide-react";

export function NewTeamForm() {
  const { dataPegawai, isLoadingPegawai } = usePegawai();
  const [selectedPegawai, setSelectedPegawai] = useState<Pegawai[]>([]);

  const handleAddMember = () => {
    if (selectedPegawai.length < 8) {
      setSelectedPegawai([...selectedPegawai, {} as Pegawai]);
    }
  };

  const handleRemoveMember = (index: number) => {
    const newSelectedPegawai = [...selectedPegawai];
    newSelectedPegawai.splice(index, 1);
    setSelectedPegawai(newSelectedPegawai);
  };

  const handleSubmit = async (formData: FormData) => {
    const nama = formData.get("nama") as string;
    const anggota = selectedPegawai.map((pegawai) => pegawai.id);
    await createTim({ nama, anggota }).then((res) => {
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
  };

  return (
    <section className="flex flex-col gap-8">
      <form className="flex flex-col gap-4" action={handleSubmit}>
        <fieldset className="flex flex-col gap-2">
          <Label htmlFor="nama">Nama Tim</Label>
          <Input name="nama" type="text" placeholder="Nama Tim" required />
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Label>Anggota</Label>
            {selectedPegawai.length < 8 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddMember}
              >
                + Tambah Anggota
              </Button>
            )}
          </div>

          {selectedPegawai.map((pegawai, index) => (
            <div key={index}>
              <Input
                name={`anggota${index}`}
                type="number"
                value={pegawai.id || ""}
                className="hidden"
              />
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      className={`${
                        !pegawai.id ? "text-muted-foreground" : ""
                      } flex-1`}
                      disabled={isLoadingPegawai}
                    >
                      {pegawai.nama_lengkap ||
                        (isLoadingPegawai
                          ? "Memuat..."
                          : `pilih anggota ke-${index + 1}`)}
                      <CaretSortIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Cari Pegawai..." />
                      <CommandList>
                        <CommandEmpty>
                          Tidak ada pegawai yang ditemukan
                        </CommandEmpty>
                        <CommandGroup>
                          {dataPegawai.map((p) => (
                            <CommandItem
                              key={p.id}
                              onSelect={() => {
                                const newSelectedPegawai = [...selectedPegawai];
                                newSelectedPegawai[index] = p;
                                setSelectedPegawai(newSelectedPegawai);
                              }}
                            >
                              {p.nama_lengkap}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveMember(index)}
                >
                  <UserMinus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </fieldset>

        <Button type="submit" className="ml-auto">
          Buat Tim
        </Button>
      </form>
    </section>
  );
}
