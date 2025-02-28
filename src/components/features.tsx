import Image from "next/image";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";

interface Feature {
  index: number;
  title: string;
  description: string;
  screnshoot?: string;
  screnchoots?: string[];
}

type TimelineEntry = {
  title: string;
  content: React.ReactNode;
};

const featuresConst: Feature[] = [
  {
    index: 1,
    title: "Real-Time Editor and Preview",
    description:
      "Write and visualize your changes in real-time with side-by-side editor and preview. Resize the windows to fit your workflow.",
    screnshoot: "/screnshoots/real-time-editor-and-preview-splitview.png",
  },
  {
    index: 2,
    title: "Dynamic Variables",
    description:
      "Create custom variables (e.g., ${projectName}) and reuse them throughout your document. Simplify maintenance of long documents without repetition.",
    screnshoot: "/screnshoots/dynamic-variables.png",
  },
  {
    index: 3,
    title: "Custom Sections",
    description: "Create and manage custom sections for your documentation.",
    screnshoot: "/screnshoots/create-and-use-custom-sections.png",
  },
  {
    index: 4,
    title: "Flexible Views mode",
    description:
      "Choose from three view modes: editor only, preview only, or both side by side. Adapt the interface to your needs.",
    screnchoots: [
      "/screnshoots/real-time-editor-and-preview-splitview.png",
      "/screnshoots/editor-markdown.png",
      "/screnshoots/preview-readme.png",
    ],
  },
];

const timelineEntries: TimelineEntry[] = featuresConst.map((feature) => ({
  title: feature.title,
  content: (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4"
    >
      <p className="text-neutral-800 dark:text-neutral-200 text-sm font-normal">
        {feature.description}
      </p>
      {feature.screnshoot && (
        <Image
          src={feature.screnshoot}
          alt={feature.title + " screenshot"}
          width={500}
          height={300}
          className="rounded-lg border shadow-lg"
        />
      )}
      {feature.screnchoots && (
        <div className="grid grid-cols-2 gap-4">
          {feature.screnchoots.map((screnchoot) => (
            <Image
              key={screnchoot}
              src={screnchoot}
              alt={feature.title + " screenshot"}
              width={500}
              height={300}
              className="rounded-lg border shadow-lg"
            />
          ))}
        </div>
      )}
    </motion.div>
  ),
}));

export default function Features() {
  return (
    <section
      id="features"
      className="min-h-screen w-full flex flex-col items-center pt-16 gap-4"
    >
      <h1 className="text-4xl font-semibold">
        Features That Make the Difference
      </h1>
      <span className="text-muted-foreground text-xl">
        Discover how Ink Mark can transform the way you create and manage
        documentation.
      </span>
      <div className="w-full max-w-6xl px-4 mt-8">
        <Timeline data={timelineEntries} />
      </div>
    </section>
  );
}