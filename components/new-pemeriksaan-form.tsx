"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusIcon } from "@radix-ui/react-icons";
import { newKegiatanSchema } from "../lib/new-kegiatan-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { CalendarSelect } from "./calendar";
import { Input } from "./ui/input";
import {
  useHasilPemeriksaan,
  useJenisPajak,
  useTim,
} from "@/lib/get-other-client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { newKegiatan } from "@/lib/new-kegiatan";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";
import { useDaftarWP } from "@/lib/get-from-epad-client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";

export function NewKegiatanDialog({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn("", className)} onClick={() => setOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Tambah Kegiatan
        </Button>
      </DialogTrigger>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Tambah Kegiatan</DialogTitle>
          <DialogDescription>
            Silahkan isi form dibawah ini untuk menambahkan kegiatan baru
          </DialogDescription>
        </DialogHeader>
        <NewKegiatanForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function NewKegiatanForm({ onSuccess }: { onSuccess: () => void }) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const form = useForm<z.infer<typeof newKegiatanSchema>>({
    resolver: zodResolver(newKegiatanSchema),
    mode: "onChange",
  });

  // fetch data
  const { dataJenisPajak, errorJenisPajak, isLoadingJenisPajak } =
    useJenisPajak();
  const {
    dataHasilPemeriksaan,
    errorHasilPemeriksaan,
    isLoadingHasilPemeriksaan,
  } = useHasilPemeriksaan();
  const { dataTim, errorTim, isLoadingTim } = useTim();
  const { daftarWP, isLoadingDaftarWP, errorDaftarWP } = useDaftarWP();

  // MARK: submit
  const [isSubmiting, submiting] = useTransition();
  const onSubmit = (data: z.infer<typeof newKegiatanSchema>) => {
    submiting(() => {
      newKegiatan(data).then((res) => {
        if (res.type === "success") {
          toast.success(res.header, {
            description: res.message,
          });
          onSuccess();
        } else if (res.type === "warning") {
          toast.warning(res.header, {
            description: res.message,
          });
        } else if (res.type === "error") {
          toast.error(res.header, {
            description: res.message,
          });
        }
      });
    });
  };

  const nextStep = async () => {
    const fields = getFieldsForStep(step);

    const isValid = await form.trigger(fields);

    if (isValid) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getFieldsForStep = (
    step: number
  ): (keyof z.infer<typeof newKegiatanSchema>)[] => {
    switch (step) {
      case 1:
        return ["NPWPD", "nama_wp", "jenis_pajak_id"];
      case 2:
        return ["hasil_pemeriksaan_id", "tim_id"];
      case 3:
        return ["masa_pajak_awal", "masa_pajak_akhir"];
      case 4:
        return [
          "keterangan",
          "jumlah_kenaikan",
          "persentase_kenaikan",
          "estimasi_presentasi_kenaikan",
        ];
      default:
        return [];
    }
  };

  return (
    <main>
      <Progress value={(step / totalSteps) * 100} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-6"
        >
          {/* MARK: step 1 */}
          {step === 1 && (
            <section className="flex flex-col gap-4">
              <FormField
                name="jenis_pajak_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-muted-foreground">
                      {/* MARK: jenis Pajak */}
                      Jenis Pajak
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                      disabled={isLoadingJenisPajak || errorJenisPajak}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingJenisPajak
                              ? "Memuat data..."
                              : "Pilih Jenis Pajak"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {dataJenisPajak.map((jenisPajak) => (
                          <SelectItem
                            key={jenisPajak.id}
                            value={jenisPajak.id.toString()}
                          >
                            {jenisPajak.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("jenis_pajak_id")?.toString() !== "7" && (
                <FormField
                  control={form.control}
                  name="NPWPD"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          {/* MARK: NPWPD */}
                          NPWPD
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger
                            asChild
                            disabled={
                              isLoadingDaftarWP ||
                              errorDaftarWP ||
                              form.watch("jenis_pajak_id")?.toString() ===
                                "7" ||
                              !form.watch("jenis_pajak_id")
                            }
                          >
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full ${
                                  !field.value ? "text-muted-foreground" : ""
                                }`}
                              >
                                <span>
                                  {isLoadingDaftarWP || errorDaftarWP
                                    ? "Memuat..."
                                    : field.value
                                    ? daftarWP.find(
                                        (wp) => wp.ObyekBadanNo === field.value
                                      )?.ObyekBadanNo
                                    : "Cari NPWPD"}
                                </span>
                                <ChevronsUpDown className="ml-auto h-4 w-4" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Cari NPWPD" />
                              <CommandList>
                                <CommandEmpty>Tidak ditemukan</CommandEmpty>
                                <CommandGroup className="">
                                  {daftarWP.map((wp) => (
                                    <CommandItem
                                      key={wp.ObyekBadanNo}
                                      value={wp.NamaBadan}
                                      onSelect={() => {
                                        field.onChange(wp.ObyekBadanNo);
                                        form.setValue("nama_wp", wp.NamaBadan);
                                      }}
                                    >
                                      <div className="flex flex-col">
                                        <span>{wp.NamaBadan}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {wp.ObyekBadanNo}, {wp.AlamatBadan}
                                        </span>
                                      </div>
                                      <Check
                                        className={` ml-auto h-3 w-3 ${
                                          field.value === wp.ObyekBadanNo
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
              <FormField
                name="nama_wp"
                control={form.control}
                disabled={
                  isLoadingDaftarWP ||
                  errorDaftarWP ||
                  !form.watch("jenis_pajak_id")
                }
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-muted-foreground">
                      {/* MARK: Nama WP */}
                      Nama WP
                    </FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  form.setValue("NPWPD", "");
                  form.setValue("nama_wp", "");
                }}
                className="ml-auto"
              >
                Batal Pilih WP
              </Button>
            </section>
          )}

          {/* MARK: step 2 */}

          {step === 2 && (
            <section className="flex flex-col gap-4">
              <FormField
                name="hasil_pemeriksaan_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-muted-foreground">
                      {/* MARK: Hasil Pemeriksaan */}
                      Hasil Pemeriksaan
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                      disabled={
                        isLoadingHasilPemeriksaan || errorHasilPemeriksaan
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingHasilPemeriksaan
                              ? "Memuat data..."
                              : "Pilih Hasil Pemeriksaan"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {dataHasilPemeriksaan.map((hasilPemeriksaan) => (
                          <SelectItem
                            key={hasilPemeriksaan.id}
                            value={hasilPemeriksaan.id.toString()}
                          >
                            {hasilPemeriksaan.keterangan}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="tim_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-muted-foreground">
                      {/* MARK: Tim */}
                      Tim
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                      disabled={isLoadingTim || errorTim}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingTim ? "Memuat data..." : "Pilih Tim"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {dataTim.map((tim) => (
                          <SelectItem key={tim.id} value={tim.id.toString()}>
                            {tim.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          )}

          {/* MARK: step 3 */}

          {step === 3 && (
            <section className="flex flex-col gap-4">
              <FormField
                name="masa_pajak_awal"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-muted-foreground">
                      {/* MARK: Masa Pajak Awal */}
                      Masa Pajak Awal
                    </FormLabel>
                    <CalendarSelect
                      field={field}
                      isFuture={false}
                      minDate={new Date(1, 1, 2022)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="masa_pajak_akhir"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-muted-foreground">
                      {/* MARK: Masa Pajak Akhir */}
                      Masa Pajak Akhir
                    </FormLabel>
                    <CalendarSelect
                      field={field}
                      isFuture={false}
                      minDate={new Date(form.watch("masa_pajak_awal") ?? 0)}
                      isDisabled={!form.watch("masa_pajak_awal")}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          )}

          {/* MARK: step 4 */}

          {step === 4 && (
            <section className="flex flex-col gap-4">
              <FormField
                name="keterangan"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-muted-foreground">
                      {/* MARK: Keterangan */}
                      Keterangan
                    </FormLabel>
                    <Textarea {...field} className="h-40" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          )}

          {/* MARK: Button */}

          <div
            className={`flex w-full mt-4 ${
              step > 1 ? "justify-between" : "justify-end"
            }`}
          >
            {step > 1 && (
              <Button variant="secondary" type="button" onClick={prevStep}>
                Sebelumnya
              </Button>
            )}
            {step < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Selanjutnya
              </Button>
            ) : (
              <Button type="button" onClick={nextStep} disabled={isSubmiting}>
                {isSubmiting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menambahkan...
                  </div>
                ) : (
                  "Tambah"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </main>
  );
}
