export const calculateScales = info => {
  const { width, height } = info
  return width < height
    ? 350 / height
    : height < width
      ? 350 / width
      : 350 / width
}
