export const getRandomPastelColor = () => {
  const pastelColors = [
    "bg-[#4A90E2]",
    "bg-[#5F9EA0]",
    "bg-[#6A5ACD]",
    "bg-[#8A2BE2]",
    "bg-[#9370DB]",
    "bg-[#2E8B57]",
    "bg-[#DAA520]",
    "bg-[#D2691E]",
    "bg-[#CD5C5C]",
    "bg-[#BC8F8F]",
    "bg-[#696969]",
    "bg-[#708090]",
    "bg-spotify",
  ];
  const selectedColor =
    pastelColors[Math.floor(Math.random() * pastelColors.length)];
  return selectedColor;
};
