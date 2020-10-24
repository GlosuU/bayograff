import AnecdaynotesList from "../views/anecdaynote/AnecdaynotesList";
import AnecdaynoteNew from "../views/anecdaynote/AnecdaynoteNew";
import AnecdaynoteSingle from "../views/anecdaynote/AnecdaynoteSingle";
import AnecdaynoteEdit from "../views/anecdaynote/AnecdaynoteEdit";

import { authGuard } from "../plugins/auth0";

export default [
	{
		path: "/anecdaynotes",
		name: "AnecdaynotesList",
		component: AnecdaynotesList,
		props: (route) => ({ textToSearch: route.query.search }),
		beforeEnter: authGuard,
	},
	{
		path: "/anecdaynotes/new",
		name: "AnecdaynoteNew",
		component: AnecdaynoteNew,
		beforeEnter: authGuard,
	},
	{
		path: "/anecdaynotes/:id",
		name: "AnecdaynoteSingle",
		component: AnecdaynoteSingle,
		beforeEnter: authGuard,
	},
	{
		path: "/anecdaynotes/:id/edit",
		name: "AnecdaynoteEdit",
		component: AnecdaynoteEdit,
		beforeEnter: authGuard,
	},
];
