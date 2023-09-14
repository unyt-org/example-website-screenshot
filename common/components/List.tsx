import { UIX } from "uix";
import { type SharedList } from "backend/entrypoint.tsx";
import { map } from "unyt_core/functions.ts";
import { always } from 'unyt_core/datex_short.ts';

@UIX.template(function(this: List) {
	const items = this.options.$.list.$.items;
	return <div>
		<div class="header">
			<h1>{this.options.$.list.$.title}</h1>
		</div>
		<ol>
			{
				map(this.options.list.items, (item, index) => 
					item && <li 
						data-checked={item.checked ?? false}
						onclick={UIX.inDisplayContext(() => { item.checked = !item.checked; } )}>
							<input type="checkbox"/>
							<b>{item.name}</b>
							<span>{item.amount} {item.type}{item.amount! > 1 ? 's': ''}</span>
					</li>)
			}
			{/* {
				always(()=>{
					return items.val?.map(item => item && <li 
						data-checked={item.checked ?? false}
						onclick={UIX.inDisplayContext(() => (item.checked = !item.checked) )}>
							<input checked={item.checked ?? false} type="checkbox"/>
							<b>{item.name}</b>
							<span>{item.amount} {item.type}{item.amount! > 1 ? 's': ''}</span>
					</li>)
				})
			} */}
		</ol>
		<div class="button add-button" onclick={UIX.inDisplayContext(() => this.toggleDialog())}>
			Add Item
		</div>
		<div class="button remove-button" onclick={UIX.inDisplayContext(() => this.removeChecked())}>
			Cleanup
		</div>
		<div class="dialog" id="dialog">
			<input placeholder={"Enter item name"} type={"text"} id="name"/>
			<input placeholder={"Enter amount"} type={"number"} id="amount" value={1} max={99}/>
			<select id="type">
				<option>Bottle</option>
				<option>Piece</option>
				<option>Whatever</option>
			</select>
			<div id="add" onclick={UIX.inDisplayContext(() => this.addItem())}>Add</div>
		</div>
	</div>
})
export class List extends UIX.BaseComponent<UIX.BaseComponent.Options & {list: SharedList}> {
	/** references to the DOM elements */
	@id declare name: HTMLInputElement;
	@id declare amount: HTMLInputElement;
	@id declare type: HTMLOptionElement;
	@id declare dialog: HTMLDivElement;

	// Method that returns the internal route of the component
	override getInternalRoute() {
		return [globalThis.location.pathname]
	}

	// Life-cycle method that is called when the component is displayed
	protected override onDisplay(): void | Promise<void> {
		console.info("The list pointer", this.options.list)
	}

	// Method to toggle the dialog
	private toggleDialog(value?: boolean) {
		this.dialog.classList.toggle("active", value);
	}

	// Cleanup method that removes all checked items
	private removeChecked() {
		// FIXME Add slice
		const items = this.options.list.items;
		for (let i = items.length; i--;) {
			if (items[i]?.checked) {
				console.info("Deleting item:", items[i])
				delete items[i];
			}
		}
	}

	// Method that adds an item to the list
	private addItem() {
		if (!this.name.value)
			return alert("Please enter a name");
		this.options.list.items.push({
			name: this.name.value,
			amount: +this.amount.value,
			type: this.type.value,
		});
		this.toggleDialog(false);
	}
}