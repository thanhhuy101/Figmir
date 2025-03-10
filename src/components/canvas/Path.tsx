/* eslint-disable @typescript-eslint/consistent-type-imports */
import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "~/utils";

export default function Path({
  x,
  y,
  stroke,
  fill,
  opacity,
  points,
  onPointerDown,
}: {
  x: number;
  y: number;
  stroke?: string;
  fill: string;
  opacity: number;
  points: number[][];
  onPointerDown?: (e: React.PointerEvent) => void;
}) {
  const pathData = getSvgPathFromStroke(
    getStroke(points, {
      size: 16,
      thinning: 0.5,
      smoothing: 0.5,
      streamline: 0.5,
    }),
  );

  return (
    <path
      onPointerDown={onPointerDown}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      d={pathData}
      fill={fill}
      stroke={stroke ?? "#CCC"}
      strokeWidth={1}
      opacity={`${opacity ?? 100}%`}
    />
  );
}
