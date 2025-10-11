// src/components/molecules/SortFilterControls.stories.tsx
import React, { useState } from "react";
import { Meta } from "@storybook/react";
import { SortFilterControls } from "./SortFilterControls";

export default {
  title: "Molecules/SortFilterControls",
  component: SortFilterControls,
} as Meta;

export const Default = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterTag, setFilterTag] = useState("");

  const allTags = ["Electronics", "Clothing", "Books"];

  return (
    <SortFilterControls
      sortOrder={sortOrder}
      onSortChange={setSortOrder}
      filterTag={filterTag}
      onFilterChange={setFilterTag}
      allTags={allTags}
    />
  );
};
