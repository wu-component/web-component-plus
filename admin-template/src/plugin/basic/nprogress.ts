import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.inc(0.2);
NProgress.configure({ easing:'ease', speed:1000, showSpinner: false, trickle:false });
export default NProgress;


