import ReportermsList from "../views/reporterm/ReportermsList";
import ReportermNew from "../views/reporterm/ReportermNew";
import ReportermSingle from "../views/reporterm/ReportermSingle";
import ReportermEdit from "../views/reporterm/ReportermEdit";

import { authGuard } from "../plugins/auth0";

export default [
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
];
