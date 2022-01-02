import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add([faSpinner, faUserCircle]);
Vue.component("font-awesome-icon", FontAwesomeIcon);
