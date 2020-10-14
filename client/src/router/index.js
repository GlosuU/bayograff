import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import ReportermsList from "../views/reporterm/ReportermsList";
import ReportermNew from "../views/reporterm/ReportermNew";
import ReportermSingle from "../views/reporterm/ReportermSingle";
import ReportermEdit from "../views/reporterm/ReportermEdit";
import Export from "../views/Export";
import Profile from "../views/Profile";

import { authGuard } from "../plugins/auth0";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/reporterms",
		name: "ReportermsList",
		component: ReportermsList,
		props: (route) => ({ textToSearch: route.query.search }),
		beforeEnter: authGuard,
	},
	{
		path: "/reporterms/new",
		name: "ReportermNew",
		component: ReportermNew,
		beforeEnter: authGuard,
	},
	{
		path: "/reporterms/:id",
		name: "ReportermSingle",
		component: ReportermSingle,
		beforeEnter: authGuard,
	},
	{
		path: "/reporterms/:id/edit",
		name: "ReportermEdit",
		component: ReportermEdit,
		beforeEnter: authGuard,
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
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
