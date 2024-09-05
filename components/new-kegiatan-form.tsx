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
import { newKegiatanSchema } from "./new-kegiatan-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { CalendarSelect } from "./calendar";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";

export function NewKegiatanDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Tambah Kegiatan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kegiatan</DialogTitle>
          <DialogDescription>
            Silahkan isi form dibawah ini untuk menambahkan kegiatan baru
          </DialogDescription>
        </DialogHeader>
        <NewKegiatanForm />
      </DialogContent>
    </Dialog>
  );
}

function NewKegiatanForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const form = useForm<z.infer<typeof newKegiatanSchema>>({
    resolver: zodResolver(newKegiatanSchema),
    mode: "onChange",
    defaultValues: {
      is_selesai: false,
    },
  });

  const onSubmit = (data: z.infer<typeof newKegiatanSchema>) => {
    console.log(data);
    // Handle form submission
  };

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await form.trigger(fields);
    if (isValid) {
      setStep(step + 1);
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
        return ["NPWPD", "nama_wp"];
      case 3:
        return ["masa_pajak_awal", "masa_pajak_akhir"];
      case 4:
        return [
          "keterangan",
          "jumlah_kenaikan",
          "persentase_kenaikan",
          "estimasi_presentasi_kenaikan",
        ];
      case 5:
        return [
          "jenis_pajak_id",
          "jenis_pemeriksaan_id",
          "hasil_pemeriksaan_id",
          "tim_id",
        ];
      default:
        return [];
    }
  };

  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span>
            Step {step} of {totalSteps}
          </span>
          <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
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
                      isFuture={false}
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
                        onCheckedChange={field.onChange}
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

          {step === 2 && (
            <>
              <FormField
                name="NPWPD"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>NPWPD</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
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
            </>
          )}

          {step === 3 && (
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
                      minDate={new Date(form.watch("masa_pajak_awal"))}
                      isDisabled={!form.watch("masa_pajak_awal")}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 4 && (
            <>
              <FormField
                name="keterangan"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Keterangan</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="jumlah_kenaikan"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Jumlah Kenaikan</FormLabel>
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
                    <FormLabel>Persentase Kenaikan</FormLabel>
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
                    <FormLabel>Estimasi Presentasi Kenaikan</FormLabel>
                    <Input {...field} type="number" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 5 && (
            <>
              <FormField
                name="jenis_pajak_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Jenis Pajak</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="jenis_pemeriksaan_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Jenis Pemeriksaan</FormLabel>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex justify-between mt-4">
            {step > 1 && (
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < 5 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
