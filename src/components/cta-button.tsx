import { Play } from "lucide-react";
import { RainbowButton } from "./magicui/rainbow-button";
import Link from "next/link";

export default function CTAButton() {
  return (
    <Link href={"/app"}>
      <RainbowButton className="text-muted text-sm w-52 h-8 gap-3">
        Get Started
        <Play className="w-4 h-4" />
      </RainbowButton>
    </Link>
  );
}
