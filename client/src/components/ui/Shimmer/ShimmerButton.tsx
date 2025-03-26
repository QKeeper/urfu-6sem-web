import cn from "@/utils/cn";
import { ClassValue } from "clsx";

interface ShimmerProps {
  className?: ClassValue;
}

function ShimmerButton({ className }: ShimmerProps) {
  return <div className={cn("h-7 rounded bg-gray-100", className)} />;
}

export default ShimmerButton;
