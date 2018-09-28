export const calculateScales = info => {
  return info.x < info.y
    ? 350 / info.y
    : info.y < info.x
      ? 350 / info.x
      : 350 / info.x
}
