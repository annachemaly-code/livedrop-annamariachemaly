// src/stories/Heading.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Heading } from "../../components/atoms/Heading";

const meta: Meta<typeof Heading> = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const H1: Story = {
  args: {
    level: 1,
    children: "Heading Level 1",
  },
};

export const H2: Story = {
  args: {
    level: 2,
    children: "Heading Level 2",
  },
};

export const H3: Story = {
  args: {
    level: 3,
    children: "Heading Level 3",
  },
};
