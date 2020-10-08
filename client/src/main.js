import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/bootstrap-vue";
import VueConfirmDialog from "vue-confirm-dialog";
// import './plugins/v-calendar';
import { Auth0Plugin } from "./plugins/auth0";

// // Import the Auth0 configuration
// import { domain, clientId, audience } from "../auth_config.json";

Vue.use(VueConfirmDialog);
Vue.component("vue-confirm-dialog", VueConfirmDialog.default);

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
	domain: process.env.VUE_APP_AUTH0_DOMAIN,
	clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
	audience: process.env.VUE_APP_AUTH0_AUDIENCE,
	// domain,
	// clientId,
	// audience,
	onRedirectCallback: (appState) => {
		router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
	},
});

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
