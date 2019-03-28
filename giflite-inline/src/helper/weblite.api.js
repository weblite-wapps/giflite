// W && R
const { W } = window;

export default vueRoot => {
  /* Load Data */
  W.loadData().then(({ user, customize }) => {
    vueRoot.userId = user.id;
    vueRoot.gifId = customize.gifId;
    vueRoot.init();
    W.start();
  });
};
