// W && R
const { W } = window

export default vueRoot => {
  /* Load Data */
  W.loadData().then(({ user: { id }, customize }) => {
    vueRoot.userId = id
    vueRoot.gifId = customize.id
    vueRoot.init()
    W.start()
  })
}
