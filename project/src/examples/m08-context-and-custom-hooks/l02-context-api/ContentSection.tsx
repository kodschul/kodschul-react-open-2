import type { ReactNode } from "react";
import ThemeToggleButton from "./ThemeToggleButton";

type Props = {
  children: ReactNode;
};

// Kein Durchreichen mehr: Die Komponente kennt das Theme nicht.
const ContentSection = ({ children }: Props) => {
  return (
    <section className="flex flex-col items-center gap-4 p-8">
      {children}
      <ThemeToggleButton />
    </section>
  );
};

export default ContentSection;
