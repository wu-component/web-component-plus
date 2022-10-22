export default ({ Vue, isServer, options, router, siteData}) => {
  Vue.config.ignoredElements = [/^wu-/];

  /**
   * Only import element-ui under client side.
   */
  if (!isServer) {
   /* import('./component/Comment').then(res => {
      Vue.component("Comment", res.default);
    })*/

   /* import("./js/core/index.umd").then(() => {})
    import("./js/ui/index.umd").then(() => {})*/
  }
}
