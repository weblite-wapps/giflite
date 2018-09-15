// W && R
const { W } = window

export default vueRoot => {
  /* Load Data */
  // get user
  W.loadData().then(({ user: { id }, customize: { wisId } }) => {
    vueRoot.userId = id
    // vueRoot.url = urlSmallSize
    vueRoot.wisId = wisId
    vueRoot.init()
    W.start()
  })
}
