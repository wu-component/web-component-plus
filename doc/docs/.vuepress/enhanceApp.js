export default ({ Vue, isServer, options, router, siteData}) => {
  Vue.config.ignoredElements = [/^wu-/];

  /**
   * Only import element-ui under client side.
   */
  if (!isServer) {

    //获取地址栏参数，name:参数名称
    function getUrlParams(name){
      const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      const r = window.location.search.substr(1).match(reg);
      if(r!=null)
        return unescape(r[2]);
      return null;
    }
    import("@wu-component/wu-right-menu").then(res => {
      window.WuRightMenu = res.WuRightMenu;
      window.RightMenuCore = res.RightMenuCore;
    })
    if (getUrlParams('debug') === '1'){
      const vConsole = new window.VConsole();
    }

    /*import("./public/js/menu/index.esm").then(res => {
      console.log(res);
      window.WuRightMenu = res.WuRightMenu;
      window.RightMenuCore = res.RightMenuCore;
    })*/
   /* import('./component/Comment').then(res => {
      Vue.component("Comment", res.default);
    })*/

    // import("./public/js/lottie/index.umd.js").then(() => {})
  }
}
