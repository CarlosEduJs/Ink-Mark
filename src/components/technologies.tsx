import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "./cta-button";

const technologies = [
  {
    name: "Next.js",
    icon: "/technologies-svgs/nextjs-icon.png",
  },
  {
    name: "Tailwind CSS",
    icon: "/technologies-svgs/tailwind.svg",
  },
  {
    name: "Typescript",
    icon: "/technologies-svgs/typescript.svg",
  },
];

export default function Technologies() {
  return (
    <section
      id="technologies"
      className="w-full flex flex-col items-center justify-center py-16 min-h-[700px] pb-6 gap-4"
    >
      <h1 className="text-4xl font-semibold">Technologies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-12 px-4 w-full max-w-6xl">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-4 p-6 bg-background rounded-lg shadow-lg hover:shadow-xl transition-shadow border "
          >
            <div className="relative w-20 h-20">
              <Image
                src={tech.icon}
                alt={tech.name + " icon"}
                fill
                className="object-contain dark:brightness-75"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {tech.name}
            </h2>
          </motion.div>
        ))}
      </div>

      <CTAButton />
    </section>
  );
}