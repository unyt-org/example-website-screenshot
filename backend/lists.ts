import { Datex } from "unyt_core/datex.ts";

// Declaration of list storage map as persistent pointer with default list
export const listStorage: Map<string, SharedList> = eternalVar('listStorage') ?? $$(new Map([[
	"jonas",
	$$({
		title: "Jonas Shopping List",
		items: $$(new Set([
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
		]))
	})
]]));


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
	items: Set<Datex.ObjectRef<ListItem>>
}

// Expose this class as public endpoint property
@endpoint export class Lists {

	@property static async get(id: string): Promise<SharedList> {
		if (!listStorage.has(id)) {
			// create new list
			const newList: SharedList = {
				title: id,
				items: $$(new Set())
			}
			listStorage.set(id, $$(newList));
		}
		return listStorage.get(id)!;
	}

}