
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimeSelectorProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
}

export const TimeSelector = ({ selectedYear, onYearChange }: TimeSelectorProps) => {
  const years = ['2023', '2024', '2025'];

  return (
    <div className="mb-6">
      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          {years.map(year => (
            <SelectItem key={year} value={year}>{year}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
