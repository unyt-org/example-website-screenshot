import { UIX } from "uix/uix.ts";
import { Entrypoint } from "../backend/entrypoint.tsx";
import { List } from "../common/components/List.tsx";
import "../common/theme.ts";

export default {
	'/': null,
	'/*': async(ctx) => {
		const id = ctx.path.slice(1); // remove leading slash
		return <List list={await Entrypoint.getList(id)}/> // render the list component
	}
} satisfies UIX.Entrypoint;
