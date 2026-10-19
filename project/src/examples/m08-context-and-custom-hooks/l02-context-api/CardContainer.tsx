import type { ReactNode } from "react";
import ContentSection from "./ContentSection";
import { useTheme } from "./theme-context";

type Props = {
  children: ReactNode;
};

const CardContainer = ({ children }: Props) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`mx-auto max-w-xl rounded-lg border-2 border-red-500 ${
        isDark ? "bg-slate-800 text-white" : "bg-slate-300 text-black"
      }`}
    >
      <ContentSection>{children}</ContentSection>
    </div>
  );
};

export default CardContainer;
