import type { ReactNode } from "react";
import ThemeToggleButton from "./ThemeToggleButton";

type Props = {
  isDark: boolean;
  setDark: (isDark: boolean) => void;
  children: ReactNode;
};

// Ebene 2: Durchreicher. Die Komponente nutzt isDark und setDark nicht selbst.
const ContentSection = ({ isDark, setDark, children }: Props) => {
  return (
    <section className="flex flex-col items-center gap-4 p-8">
      {children}
      <ThemeToggleButton isDark={isDark} setDark={setDark} />
    </section>
  );
};

export default ContentSection;
