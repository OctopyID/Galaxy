import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
      <Input
        type="search"
        placeholder="Search services..."
        className="w-full border-slate-200 bg-white pl-9 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
