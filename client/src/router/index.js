import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import About from "../views/About";
import Export from "../views/Export";
import Profile from "../views/Profile";
import reportermsRoutes from "./reporterms-routes";
import anecdaynotesRoutes from "./anecdaynotes-routes";
import factalesRoutes from "./factales-routes";

import { authGuard } from "../plugins/auth0";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/about",
		name: "About",
		component: About,
		// 	// route level code-splitting
		// 	// this generates a separate chunk (about.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
	{
		path: "/export",
		name: "Export",
		component: Export,
		beforeEnter: authGuard,
	},
	{
		path: "/profile",
		name: "Profile",
		component: Profile,
		beforeEnter: authGuard,
	},
	...reportermsRoutes,
	...anecdaynotesRoutes,
	...factalesRoutes,
];

const router = new VueRouter({
	routes,
});

export default router;
