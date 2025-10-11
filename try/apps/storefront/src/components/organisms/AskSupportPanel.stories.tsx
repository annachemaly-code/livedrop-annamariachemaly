// src/components/organisms/AskSupportPanel.stories.tsx
import React, { useState } from "react";
import { Meta } from "@storybook/react";
import { AskSupportPanel } from "./AskSupportPanel";

export default {
  title: "Organisms/AskSupportPanel",
  component: AskSupportPanel,
} as Meta;

export const Default = () => {
  const [lastQuestion, setLastQuestion] = useState("");

  return (
    <div style={{ height: "500px", position: "relative" }}>
      <AskSupportPanel onSubmit={(q) => setLastQuestion(q)} />
      {lastQuestion && (
        <p className="mt-4 text-gray-700">Last submitted question: {lastQuestion}</p>
      )}
    </div>
  );
};
