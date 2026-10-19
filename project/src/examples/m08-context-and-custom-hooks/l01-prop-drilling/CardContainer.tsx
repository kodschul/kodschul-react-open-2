import type { ReactNode } from "react";
import ContentSection from "./ContentSection";

type Props = {
  isDark: boolean;
  setDark: (isDark: boolean) => void;
  children: ReactNode;
};

// Ebene 1: nutzt isDark für die Farben, reicht setDark aber nur weiter.
const CardContainer = ({ isDark, setDark, children }: Props) => {
  return (
    <div
      className={`mx-auto max-w-xl rounded-lg border-2 border-red-500 ${
        isDark ? "bg-slate-800 text-white" : "bg-slate-300 text-black"
      }`}
    >
      <ContentSection isDark={isDark} setDark={setDark}>
        {children}
      </ContentSection>
    </div>
  );
};

export default CardContainer;
