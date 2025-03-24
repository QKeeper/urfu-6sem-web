import cn from "@/utils/cn";
import { ClassValue } from "clsx";

interface ShimmerProps {
  className?: ClassValue;
}

function ShimmerButton({ className }: ShimmerProps) {
  return <div className={cn("bg-neutral-100 h-6 rounded", className)} />;
}

export default ShimmerButton;
