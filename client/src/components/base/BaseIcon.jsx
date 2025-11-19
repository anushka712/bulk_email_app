import * as TablerIcons from "@tabler/icons-react";

function BaseIcon({
  name = "",
  color = "currentColor",
  size = 16,
  stroke = 2,
}) {
  const formattedIconName = name.startsWith("Icon") ? name : `Icon${name}`;

  const IconComponent = TablerIcons[formattedIconName];

  if (!IconComponent) return "???";

  return <IconComponent {...{ color, size, stroke }} />;
}

export default BaseIcon;
