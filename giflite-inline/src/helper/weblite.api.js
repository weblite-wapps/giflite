// W && R
const { W } = window

export default vueRoot => {
  /* Load Data */
  W.loadData().then(({ user: { id }, customize: { gifId } }) => {
    vueRoot.userId = id
    vueRoot.gifId = gifId
    vueRoot.init()
    W.start()
  })
}
