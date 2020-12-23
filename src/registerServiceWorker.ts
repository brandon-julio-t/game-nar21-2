/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    updated() {
      caches.keys().then(names => names.forEach(name => caches.delete(name)));
    }
  });
}
