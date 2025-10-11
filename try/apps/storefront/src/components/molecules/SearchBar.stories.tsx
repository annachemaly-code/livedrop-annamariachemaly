import React, { useState } from "react";
import { Meta } from "@storybook/react";
import { SearchBar } from "./SearchBar";

export default {
  title: "Molecules/SearchBar",
  component: SearchBar,
} as Meta;

export const Default = () => {
  const [query, setQuery] = useState("");
  return <SearchBar query={query} setQuery={setQuery} />;
};
