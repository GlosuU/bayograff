import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import ReportermsList from "../views/ReportermsList";
import ReportermNew from "../views/ReportermNew";
import ReportermSingle from "../views/ReportermSingle";
import ReportermEdit from "../views/ReportermEdit";

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
	},
	{
		path: "/reporterms/new",
		name: "ReportermNew",
		component: ReportermNew,
	},
	{
		path: "/reporterms/:id",
		name: "ReportermSingle",
		component: ReportermSingle,
	},
	{
		path: "/reporterms/:id/edit",
		name: "ReportermEdit",
		component: ReportermEdit,
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
