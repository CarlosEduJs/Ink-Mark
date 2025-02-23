"use client";

import { useAppContext } from "./app-provider";
import AvailableSectionGroups from "./avaliable-sections-group";
import AddedSectionsList from "./added-sections-list";
import AddedCustomSectionsList from "./customs-sections-list";

export default function AsideSectionsToUse() {
  const { sections, availableGroups, cSections } = useAppContext();

  return (
    <aside className="max-md:hidden md:sticky ml-5 flex left-0 items-center flex-col min-w-fit  overflow-x-hidden max-h-screen overflow-y-auto">
      <AddedSectionsList sections={sections} isInAside={true} />
      <AddedCustomSectionsList sections={cSections} isInAside={true} />
      <AvailableSectionGroups isInAside={true} groups={availableGroups} />
    </aside>
  );
}
