import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/bootstrap-vue";
// import './plugins/v-calendar';
import "./plugins/vue-confirm-dialog";
import { Auth0Plugin } from "./plugins/auth0";

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
	domain: process.env.VUE_APP_AUTH0_DOMAIN,
	clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
	audience: process.env.VUE_APP_AUTH0_AUDIENCE,
	onRedirectCallback: (appState) => {
		router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
	},
});

Vue.config.productionTip = false;

Vue.prototype.$nReporterms = -1;
Vue.prototype.$nAnecdaynotes = -1;
Vue.prototype.$nFactales = -1;

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
