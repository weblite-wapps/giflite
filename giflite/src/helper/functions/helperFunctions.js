import * as R from 'ramda'

export const calculateScale = (info, width) =>
  R.compose(
    ({ array, sum, count }) =>
      count ? R.concat(array, R.repeat(width / sum, count)) : array,
    R.reduce(
      (acc, size) =>
        acc.sum + size > width && acc.count > 1
          ? {
              array: R.concat(acc.array, R.repeat(width / acc.sum, acc.count)),
              sum: size,
              count: 1,
            }
          : { ...acc, sum: acc.sum + size, count: acc.count + 1 },
      { array: [], sum: 0, count: 0 },
    ),
  )(info)

export const removeGif = (gifId, gifs) =>
  R.compose(
    R.reduce(
      (acc, item) => (item.gifId !== gifId ? acc.concat(item) : acc),
      [],
    ),
  )(gifs)
