type Props = {
  isDark: boolean;
};

const TextSection = ({ isDark }: Props) => {
  return <p className={isDark ? "text-yellow-300" : "text-blue-800"}>Dieser Text liest isDark als Prop.</p>;
};

export default TextSection;
