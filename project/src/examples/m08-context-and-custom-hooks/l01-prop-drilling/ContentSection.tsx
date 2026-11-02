import type { ReactNode } from "react";
import ThemeToggleButton from "./ThemeToggleButton";

type Props = {
  children: ReactNode;
};

// Ebene 2: Durchreicher. Die Komponente nutzt isDark und setDark nicht selbst.
const ContentSection = ({ children }: Props) => {
  return (
    <section className="flex flex-col items-center gap-4 p-8">
      {children}
      <ThemeToggleButton />
    </section>
  );
};

export default ContentSection;
