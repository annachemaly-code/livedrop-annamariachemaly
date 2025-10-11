// src/components/molecules/SortFilterControls.tsx
import React from "react";

interface SortFilterProps {
  sortOrder: "asc" | "desc";
  onSortChange: (value: "asc" | "desc") => void;
  filterTag: string;
  onFilterChange: (value: string) => void;
  allTags: string[];
}

export const SortFilterControls: React.FC<SortFilterProps> = ({
  sortOrder,
  onSortChange,
  filterTag,
  onFilterChange,
  allTags,
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
        className="border rounded-md px-4 py-2"
      >
        <option value="asc">Sort by Price: Low → High</option>
        <option value="desc">Sort by Price: High → Low</option>
      </select>

      <select
        value={filterTag}
        onChange={(e) => onFilterChange(e.target.value)}
        className="border rounded-md px-4 py-2"
      >
        <option value="">All Tags</option>
        {allTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};
