// src/components/atoms/Button.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"], 
  argTypes: {
    disabled: { control: "boolean" },
    className: { control: "text" },
    children: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// Default button
export const Default: Story = {
  args: {
    children: "Click Me",
    disabled: false,
  },
};

// Disabled button
export const Disabled: Story = {
  args: {
    children: "Can't Click Me",
    disabled: true,
  },
};

// Button with custom styling
export const CustomStyle: Story = {
  args: {
    children: "Custom Color",
    className: "bg-blue-600 hover:bg-blue-700",
  },
};
