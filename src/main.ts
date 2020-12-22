import "./registerServiceWorker";
import "./assets/styles/tailwind.scss";

import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faBullhorn,
  faClock,
  faDatabase,
  faEllipsisH,
  faEnvelope,
  faExclamationCircle,
  faFileSignature,
  faGamepad,
  faGraduationCap,
  faKeyboard,
  faMouse,
  faQuestionCircle,
  faTimes,
  faUserFriends,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

import {
  faAndroid,
  faAngular,
  faBootstrap,
  faFacebook,
  faInstagram,
  faJs,
  faLaravel,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faAngular,
  faDatabase,
  faJs,
  faAndroid,
  faLaravel,
  faBullhorn,
  faUsers,
  faUserFriends,
  faClock,
  faGraduationCap,
  faFileSignature,
  faBootstrap,
  faYoutube,
  faFacebook,
  faInstagram,
  faQuestionCircle,
  faKeyboard,
  faMouse,
  faExclamationCircle,
  faGamepad,
  faTimes,
  faEnvelope,
  faEllipsisH
);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
