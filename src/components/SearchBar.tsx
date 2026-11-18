import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  buttonLabel?: string;
  ariaLabel?: string;
  darkSurface?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search services, skills, or creators...',
  buttonLabel,
  ariaLabel = 'Search marketplace',
  darkSurface = false,
}: SearchBarProps) {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`flex items-center w-full rounded-xl border transition-colors duration-150 ${
        darkSurface
          ? 'bg-white border-slate-200 focus-within:border-[#7C3AED] shadow-sm'
          : 'bg-white border-slate-200 focus-within:border-[#6D28D9]'
      }`}
    >
      <label htmlFor="marketplace-search-input" className="sr-only">
        {ariaLabel}
      </label>
      <div className="pl-4 pr-2 text-slate-400 shrink-0">
        <Search className="w-4 h-4" aria-hidden="true" />
      </div>
      <input
        id="marketplace-search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-w-0 py-3 pr-2 text-sm text-[#0F172A] placeholder:text-slate-400 bg-transparent focus:outline-none"
      />
      {value.trim().length > 0 && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="p-2 mr-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#6D28D9]"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
      {buttonLabel && (
        <button
          type="submit"
          className="m-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D28D9]"
        >
          {buttonLabel}
        </button>
      )}
    </form>
  );
}
