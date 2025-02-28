import { useTheme } from "next-themes";
import { LineShadowText } from "./magicui/line-shadow-text";
import CTAButton from "./cta-button";
import { Ripple } from "./magicui/ripple";
import { GridPattern } from "./magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { MorphingText } from "./magicui/morphing-text";
import { Cover } from "./ui/cover";

const texts = [
  "Create",
  "Simplify",
  "Inspire",
  "Transform",
  "Flow",
  "Magic",
  "Ink",
  "Mark",
];

export default function Hero() {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  return (
    <section
      id="hero"
      className="relative  mx-auto max-w-4xl flex gap-6 text-center h-screen justify-center items-center "
    >
      <GridPattern
        width={100}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="flex flex-col gap-6 z-10 text-center">
        <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          Where README Meets{" "}
          <Cover>magic</Cover>
        </h1>
        <span className="text-xl text-muted-foreground">
          Ink Mark is your ultimate sidekick for crafting the perfect README,
          transforming your ideas into flawlessly structured content. Simple,
          powerful, and distraction-free – because creativity deserves nothing
          less.
        </span>
        <MorphingText texts={texts} />
        <div className="mx-auto mt-4">
          <CTAButton />
        </div>
      </div>
      <Ripple />
    </section>
  );
}
