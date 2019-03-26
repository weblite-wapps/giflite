// W && R
const { W } = window;

export default vueRoot => {
  /* Load Data */
  W.loadData().then(({ user, customize, height }) => {
    vueRoot.userId = user.id;
    vueRoot.gifId = customize.id;
    vueRoot.height = height;
    vueRoot.init();
    W.start();
  });
};
