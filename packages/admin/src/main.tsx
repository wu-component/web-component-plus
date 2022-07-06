import "@canyuegongzi/web-core-plus";
import '@canyuegongzi/web-ui-plus';
import './views'
import './app/App';
import router from './router';
window.onload = function () {
    router.push('/home', { id: '11' })
    console.log(document.getElementsByTagName('wu-plus-router-view'))
    console.log(document.getElementsByTagName('app-view'))
}

