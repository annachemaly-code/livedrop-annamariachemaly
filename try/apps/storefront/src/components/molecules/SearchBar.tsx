// src/components/molecules/SearchBar.tsx
import React from "react";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search products..."
      className="px-4 py-2 border rounded-md w-48 focus:outline-none"
    />
  );
};
