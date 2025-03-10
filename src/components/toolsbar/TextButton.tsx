import IconButton from "./IconButton";
import { AiOutlineFontSize } from "react-icons/ai";

export default function TextButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <IconButton isActive={isActive} onClick={onClick}>
      <AiOutlineFontSize className="h-5 w-5" />
    </IconButton>
  );
}
