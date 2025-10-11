// src/components/templates/MainLayout.stories.tsx
import React from "react";
import { Meta } from "@storybook/react";
import { MainLayout } from "./MainLayout";
import { Button } from "../atoms/Button";

export default {
  title: "Templates/MainLayout",
  component: MainLayout,
} as Meta;

export const Default = () => (
  <MainLayout>
    <div className="p-4">
      <h2 className="text-xl mb-4">Welcome to Shoplite</h2>
      <Button onClick={() => alert("Clicked!")}>Click Me</Button>
    </div>
  </MainLayout>
);
