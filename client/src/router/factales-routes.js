import FactalesList from "../views/factale/FactalesList";
import FactaleNew from "../views/factale/FactaleNew";
import FactaleSingle from "../views/factale/FactaleSingle";
import FactaleEdit from "../views/factale/FactaleEdit";

import { authGuard } from "../plugins/auth0";

export default [
	{
		path: "/factales",
		name: "FactalesList",
		component: FactalesList,
		props: (route) => ({ textToSearch: route.query.search }),
		beforeEnter: authGuard,
	},
	{
		path: "/factales/new",
		name: "FactaleNew",
		component: FactaleNew,
		beforeEnter: authGuard,
	},
	{
		path: "/factales/:id",
		name: "FactaleSingle",
		component: FactaleSingle,
		beforeEnter: authGuard,
	},
	{
		path: "/factales/:id/edit",
		name: "FactaleEdit",
		component: FactaleEdit,
		beforeEnter: authGuard,
	},
];
