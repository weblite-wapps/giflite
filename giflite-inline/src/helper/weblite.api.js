// W && R
const { W } = window;

export default vueRoot => {
  /* Load Data */
  W.loadData().then(({ user, customize: { id, gifId } }) => {
    vueRoot.userId = user.id;
    if (id) vueRoot.gifId = id
    if (gifId) vueRoot.gifId = gifId
    vueRoot.init();
    W.start();
  });
};
