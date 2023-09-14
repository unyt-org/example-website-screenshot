import { UIX } from "uix/uix.ts";
import { Lists } from "../backend/lists.ts";
import { List } from "../common/components/List.tsx";
import "../common/theme.ts";

export default {
	'/:id': async (ctx) => {
		const id = ctx.urlMatch.get("id")!; // get list id
		return <List list={await Lists.get(id)}/> // render the list component
	}
} satisfies UIX.Entrypoint;
