import "./registerServiceWorker";
import "./assets/styles/tailwind.css";

import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBullhorn,
  faClock,
  faDatabase,
  faUserFriends,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import {
  faAndroid,
  faAngular,
  faJs,
  faLaravel
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faAngular,
  faDatabase,
  faJs,
  faAndroid,
  faLaravel,
  faBullhorn,
  faUsers,
  faUserFriends,
  faClock
);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
