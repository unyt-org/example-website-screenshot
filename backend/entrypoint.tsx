import { UIX } from "uix/uix.ts";
import "common/theme.ts";
import { Overview } from "../common/components/Overview.tsx";
const listStorage: Map<string, SharedList> = $$(eternalVar('list') ?? new Map());

listStorage.set("jonas", $$({
	title: "Jonas Shopping List",
	items: $$([
		$$({
			name: "Milk",
			amount: 1,
			type: "Bottle",
			checked: false
		}),
		$$({
			name: "Butter",
			amount: 4,
			type: "Piece",
			checked: false
		}),
		$$({
			name: "Beer",
			amount: 2,
			type: "Bottle",
			checked: false
		})
	])
}));

export type ListItem = {
	name: string,
	checked?: boolean,
	amount?: number,
	type?: string
}
export type SharedList = {
	title: string,
	items: ListItem[]
}

@endpoint
export class Entrypoint {
	@property
	// deno-lint-ignore require-await
	static async getList(id: string): Promise<SharedList> {
		if (!listStorage.has(id)) {
			// create new list
			const newList: SharedList = {
				title: id,
				items: $$([])
			}
			listStorage.set(id, $$(newList));
		}
		return listStorage.get(id)!;
	}
}

export default {
	'/': () => <Overview lists={listStorage}/>,
	'/*': null
} satisfies UIX.Entrypoint;