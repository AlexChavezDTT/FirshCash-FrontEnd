import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.css"
import Toaster from '@meforma/vue-toaster';
import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faUserSecret, faPhone, faUserTie, faCircleDollarToSlot, faMoneyBill1Wave, faFileCsv, faFileExcel, faFilePdf, faPrint, faBars, faCirclePlus, faPenToSquare, faCheck, faRightFromBracket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUserSecret, faPhone, faUserTie, faCircleDollarToSlot, faMoneyBill1Wave, faFileCsv, faFileExcel, faFilePdf, faPrint, faBars, faCirclePlus, faPenToSquare, faCheck, faRightFromBracket, faMagnifyingGlass)

const options = {
	position: POSITION.TOP_LEFT
};

createApp(App).use(store).use(router).use(Toaster).use(Toast, options).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
