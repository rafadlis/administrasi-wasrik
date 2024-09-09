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
  FormDescription,
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
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import {
  useHasilPemeriksaan,
  useJenisPajak,
  useJenisPemeriksaan,
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
  const totalSteps = 5;
  const form = useForm<z.infer<typeof newKegiatanSchema>>({
    resolver: zodResolver(newKegiatanSchema),
    mode: "onChange",
    defaultValues: {
      is_selesai: false,
    },
  });

  // fetch data
  const { dataJenisPajak, errorJenisPajak, isLoadingJenisPajak } =
    useJenisPajak();
  const {
    dataJenisPemeriksaan,
    errorJenisPemeriksaan,
    isLoadingJenisPemeriksaan,
  } = useJenisPemeriksaan();
  const {
    dataHasilPemeriksaan,
    errorHasilPemeriksaan,
    isLoadingHasilPemeriksaan,
  } = useHasilPemeriksaan();
  const { dataTim, errorTim, isLoadingTim } = useTim();
  const { daftarWP, isLoadingDaftarWP, errorDaftarWP } = useDaftarWP();

  const [isSubmiting, submiting] = useTransition();
  const onSubmit = (data: z.infer<typeof newKegiatanSchema>) => {
    submiting(() => {
      newKegiatan(data).then((res) => {
        if (res.type === "success") {
          toast.success(res.header, {
            description: res.message,
          });
          onSuccess();
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
        return [
          "tgl_pemeriksaan_mulai",
          "is_selesai",
          "tgl_pemeriksaan_selesai",
        ];
      case 2:
        return ["NPWPD", "nama_wp", "jenis_pajak_id"];
      case 3:
        return ["jenis_pemeriksaan_id", "hasil_pemeriksaan_id", "tim_id"];
      case 4:
        return ["masa_pajak_awal", "masa_pajak_akhir"];
      case 5:
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
    <>
      <Progress value={(step / totalSteps) * 100} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* MARK: step 1 */}
          {step === 1 && (
            <>
              <FormField
                name="tgl_pemeriksaan_mulai"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Mulai</FormLabel>
                    <CalendarSelect
                      field={field}
                      isFuture={true}
                      minDate={new Date(1, 1, 2022)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="is_selesai"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          form.setValue("tgl_pemeriksaan_selesai", undefined);
                        }}
                      />
                    </FormControl>
                    <div className="flex flex-col ">
                      <FormLabel>Kegiatan Selesai?</FormLabel>
                      <FormDescription>
                        Jika kegiatan selesai, maka tanggal selesai harus diisi
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("is_selesai") && (
                <FormField
                  name="tgl_pemeriksaan_selesai"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal Selesai</FormLabel>
                      <CalendarSelect
                        field={field}
                        isFuture={false}
                        minDate={new Date(form.watch("tgl_pemeriksaan_mulai"))}
                        isDisabled={!form.watch("tgl_pemeriksaan_mulai")}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
          {/* MARK: step 2 */}
          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="NPWPD"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>NPWPD</FormLabel>
                      <Popover>
                        <PopoverTrigger
                          asChild
                          disabled={isLoadingDaftarWP || errorDaftarWP}
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
                            <CommandInput placeholder="Cari Provinsi" />
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
                                        {wp.ObyekBadanNo}
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
              <FormField
                name="nama_wp"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Nama WP</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="jenis_pajak_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Jenis Pajak</FormLabel>
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
            </>
          )}

          {/* MARK: step 3 */}

          {step === 3 && (
            <>
              <FormField
                name="jenis_pemeriksaan_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Jenis Pemeriksaan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                      disabled={
                        isLoadingJenisPemeriksaan || errorJenisPemeriksaan
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingJenisPemeriksaan
                              ? "Memuat data..."
                              : "Pilih Jenis Pemeriksaan"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {dataJenisPemeriksaan.map((jenisPemeriksaan) => (
                          <SelectItem
                            key={jenisPemeriksaan.id}
                            value={jenisPemeriksaan.id.toString()}
                          >
                            {jenisPemeriksaan.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="hasil_pemeriksaan_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Hasil Pemeriksaan</FormLabel>
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
                    <FormLabel>Tim</FormLabel>
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
            </>
          )}

          {/* MARK: step 4 */}

          {step === 4 && (
            <>
              <FormField
                name="masa_pajak_awal"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Masa Pajak Awal</FormLabel>
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
                    <FormLabel>Masa Pajak Akhir</FormLabel>
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
            </>
          )}

          {/* MARK: step 5 */}

          {step === 5 && (
            <>
              <FormField
                name="keterangan"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Keterangan</FormLabel>
                    <Textarea {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="jumlah_kenaikan"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Jumlah Kenaikan (Rp)</FormLabel>
                    <Input {...field} type="number" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="persentase_kenaikan"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Persentase Kenaikan (%)</FormLabel>
                    <Input {...field} type="number" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="estimasi_presentasi_kenaikan"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Estimasi Presentasi Kenaikan (%)</FormLabel>
                    <Input {...field} type="number" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div
            className={`flex w-full mt-4 ${
              step > 1 ? "justify-between" : "justify-end"
            }`}
          >
            {step > 1 && (
              <Button variant="outline" type="button" onClick={prevStep}>
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
    </>
  );
}
