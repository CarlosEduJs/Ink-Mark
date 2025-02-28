import BlockLists from "./block-lists";
import { useAppContext } from "@/contexts/AppContext";

export default function AsideSectionsToUse() {
  const { asideOpen } = useAppContext();

  if (!asideOpen) return null;

  return (
    <aside className="max-md:hidden md:sticky ml-1 flex left-0 items-center flex-col min-w-fit overflow-hidden h-[690px]">
      <BlockLists isInAside={true} />
    </aside>
  );
}
