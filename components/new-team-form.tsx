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

        {selectedPegawai.map((pegawai, index) => (
          <fieldset key={index} className="flex flex-col gap-2">
            <Label htmlFor={`anggota${index}`}>Anggota {index + 1}</Label>
            <Input
              name={`anggota${index}`}
              type="number"
              value={pegawai.id || ""}
              className="hidden"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  className={!pegawai.id ? "text-muted-foreground" : ""}
                  disabled={isLoadingPegawai}
                >
                  {pegawai.nama_lengkap ||
                    (isLoadingPegawai ? "Memuat..." : "Pilih Pegawai")}
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
            <Button type="button" onClick={() => handleRemoveMember(index)}>
              Hapus Anggota
            </Button>
          </fieldset>
        ))}

        {selectedPegawai.length < 8 && (
          <Button type="button" onClick={handleAddMember}>
            Tambah Anggota
          </Button>
        )}

        <Button type="submit" className="ml-auto">
          Buat Tim
        </Button>
      </form>
    </section>
  );
}
