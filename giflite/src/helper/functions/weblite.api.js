// W && R
const { W } = window

export default vueRoot => {
  W.loadData().then(({ user: { name, id } }) => {
    vueRoot.userName = name
    vueRoot.userId = id
  })

  // start
  W.start()
}
