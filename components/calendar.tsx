"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import { CalendarIcon, CalendarDaysIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { id } from "date-fns/locale";

interface CalendarSelectProps {
  field: {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
  };
  isFuture: boolean;
  minDate: Date;
  isDisabled?: boolean;
}

export function CalendarSelect({
  field,
  isFuture,
  minDate,
  isDisabled,
}: CalendarSelectProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(
    field.value || new Date()
  );

  // Move these outside the component or use useMemo with empty dependency array
  const months = useMemo(
    () => [
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
    ],
    []
  );

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 2017 + 1 }, (_, index) =>
      (2017 + index).toString()
    );
  }, []);

  const isDateDisabled = useCallback(
    (date: Date) =>
      isFuture ? date < minDate : date <= minDate || date > new Date(),
    [isFuture, minDate]
  );

  const handleDateChange = useCallback(
    (newDate: Date) => {
      setSelectedDate(newDate);
      field.onChange(newDate);
    },
    [field]
  );

  const handleMonthChange = useCallback(
    (value: string) => {
      const newDate = new Date(selectedDate);
      newDate.setMonth(parseInt(value, 10) - 1);
      handleDateChange(newDate);
    },
    [selectedDate, handleDateChange]
  );

  const handleYearChange = useCallback(
    (value: string) => {
      const newDate = new Date(selectedDate);
      newDate.setFullYear(parseInt(value));
      handleDateChange(newDate);
    },
    [selectedDate, handleDateChange]
  );

  const handleCalendarSelect = useCallback(
    (date: Date | undefined) => {
      if (date) handleDateChange(date);
    },
    [handleDateChange]
  );

  const handleTodayClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const today = new Date();
      if (!isDateDisabled(today)) {
        handleDateChange(today);
      }
    },
    [isDateDisabled, handleDateChange]
  );

  useEffect(() => {
    if (field.value) setSelectedDate(field.value);
  }, [field.value]);

  return (
    <Popover>
      <PopoverTrigger asChild disabled={isDisabled}>
        <FormControl>
          <Button variant={"outline"}>
            {field.value ? (
              field.value.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            ) : (
              <span className="text-muted-foreground">Pilih tanggal</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <div className="flex flex-row gap-2 mb-2">
            <Select
              onValueChange={handleMonthChange}
              value={(selectedDate.getMonth() + 1).toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Bulan" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={month} value={(index + 1).toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleYearChange}
              value={selectedDate.getFullYear().toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Tahun" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onMouseDown={handleTodayClick}
              disabled={isDateDisabled(new Date())}
              title="Today"
            >
              <CalendarDaysIcon className="h-4 w-4" />
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleCalendarSelect}
            disabled={isDateDisabled}
            initialFocus
            fixedWeeks
            month={selectedDate}
            onMonthChange={setSelectedDate}
            locale={id}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
