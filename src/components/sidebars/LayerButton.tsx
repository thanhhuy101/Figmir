"use client";
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useMutation } from "@liveblocks/react";
import { ReactNode } from "react";
const LayerButton = ({
  layerId,
  text,
  icon,
  isSelected,
}: {
  layerId: string;
  text: string;
  icon: ReactNode;
  isSelected: boolean;
}) => {
  const updatedSelection = useMutation(({ setMyPresence }, layerId: string) => {
    setMyPresence({ selection: [layerId] }, { addToHistory: true });
  }, []);

  return (
    <button
      className={`flex items-center gap-2 rounded px-1.5 py-1 text-left text-[11px] hover:bg-gray-100 ${isSelected ? "bg-[#bce3ff]" : ""}`}
      onClick={() => updatedSelection(layerId)}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default LayerButton;
