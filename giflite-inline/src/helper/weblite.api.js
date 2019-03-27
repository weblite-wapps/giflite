// W && R
const { W } = window;

export default vueRoot => {
  /* Load Data */
  W.loadData().then(({ user, customize, height = customize.height, width }) => {
    vueRoot.userId = user.id;
    vueRoot.gifId = customize.gifId;
    vueRoot.height = customize.height;
    console.log("user: ", user)
    console.log("customize: ", customize)
    console.log("height1: ", customize.height)
    console.log("height2: ", height)
    console.log("width1: ", customize.width)
    console.log("width2: ", width)
    vueRoot.init();
    W.start();
  });
};
