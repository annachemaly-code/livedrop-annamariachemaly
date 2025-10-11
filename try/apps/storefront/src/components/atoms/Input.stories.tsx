// src/stories/Input.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../components/atoms/Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  args: {
    value: "Hello Storybook",
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Can't type here",
    disabled: true,
  },
};
