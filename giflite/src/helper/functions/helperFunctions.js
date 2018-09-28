const R = require("ramda")
export const calculateScale = info => {
  console.log("info in helper ", info)
  return R.compose(
    ({ array, sum, count }) =>
      count ? R.concat(array, R.repeat(330 / sum, count)) : array,
    R.reduce(
      (acc, size) =>
        acc.sum + size > 330
          ? {
              array: R.concat(acc.array, R.repeat(330 / acc.sum, acc.count)),
              sum: size,
              count: 1,
            }
          : { ...acc, sum: acc.sum + size, count: acc.count + 1 },
      { array: [], sum: 0, count: 0 },
    ),
  )(info)
}
