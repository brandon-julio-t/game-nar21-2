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
  faFileSignature,
  faGraduationCap,
  faUserFriends,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

import {
  faAndroid,
  faAngular,
  faBootstrap,
  faJs,
  faLaravel,
  faYoutube,
  faFacebook,
  faInstagram
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
  faInstagram
);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
