// W && R
const { W } = window

export default vueRoot => {
  /* Load Data */
  // get user
  W.loadData().then(({ user: { name, id } }) => {
    vueRoot.userName = name
    vueRoot.userId = id
    vueRoot.init()
  })

  // start
  W.start()
}
