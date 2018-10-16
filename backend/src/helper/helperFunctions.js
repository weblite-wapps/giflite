const R = require("ramda")

exports.makeArrayOfGiphyObjects = R.compose(
  R.prop("data"),
  JSON.parse,
)

exports.makeArrOfSentsAvailable = R.reduce(
  (acc, doc) => R.assoc(doc.gifId, doc.wisId, acc),
  {},
)

exports.collectGifsDetails = (
  arrayOfGiphyObjects,
  arrOfSentsAvailableinSearch,
) =>
  arrayOfGiphyObjects.map(
    R.applySpec({
      gifId: R.prop("id"),
      smallUrl: R.path(["images", "fixed_height_small", "url"]),
      smallImage: R.path(["images", "fixed_height_small_still", "url"]),
      width: R.path(["images", "fixed_height_small", "width"]),
      wisId: R.compose(
        R.prop(R.__, arrOfSentsAvailableinSearch),
        R.prop("id"),
      ),
    }),
  )
