// deno-lint-ignore-file require-await
import { UIX } from "uix/uix.ts";
import "common/theme.ts";
import { Overview } from "common/components/Overview.tsx";

// Declaration of list storage map as persistent pointer
const listStorage: Map<string, SharedList> = $$(eternalVar('list') ?? new Map());

// Default list called "jonas" for testing purposes
if (!listStorage.has("jonas")) 
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

// The list item type definition
export type ListItem = {
	name: string,
	checked?: boolean,
	amount?: number,
	type?: string
}

// The shared list type definition
export type SharedList = {
	title: string,
	items: ListItem[]
}

// The backend endpoint definition
@endpoint
export class Entrypoint {

	@property
	// Exposing the getList backend function
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

// The frontend routes definition
export default {
	'/': () => <Overview lists={listStorage}/>, // On '/'-route display the overview component
	'/*': null // Letting the frontend handle all other routes
} satisfies UIX.Entrypoint;