import { UIX } from "uix";
import { type SharedList } from "backend/entrypoint.tsx";
import { map } from "unyt_core/functions.ts";

@UIX.template(function(this: List) {
	console.log(this.options.list.items)
	return <div>
		<div class="header">
			<h1>{this.options.$.list.$.title}</h1>
		</div>
		<ol>
			{
				map(this.options.list.items, (item, index) => 
					item ? <li 
						data-checked={item.checked ?? false}
						onclick={UIX.inDisplayContext(() => item.checked = !item.checked )}>
							<input type="checkbox"/>
							<b>{item.name}</b>
							<span>{item.amount} {item.type}{item.amount! > 1 ? 's': ''}</span>
					</li> : undefined)
			}
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
	
	@use declare strings: {[key: string]: string };
	@id declare name: HTMLInputElement;
	@id declare amount: HTMLInputElement;
	@id declare type: HTMLOptionElement;
	@id declare dialog: HTMLDivElement;

	override getInternalRoute() {
		return [globalThis.location.pathname]
	}

	protected override onDisplay(): void | Promise<void> {
		console.log(this.options.list.items, "<<")
	}

	toggleDialog(value?: boolean) {
		this.dialog.classList.toggle("active", value);
	}

	removeChecked() {
		
		// FIXME Throws DATEX error
		// this.options.$.list.$.items.val = this.options.$.list.$.items.val?.filter(e => !e.checked)
		
		// FIXME ERROR
		// this.$.options.$.list.$.items.setVal(
		// 	this.options.list.items.filter(e => !e.checked)
		// )

		const items = this.options.list.items;

		for (let i = items.length; i--;) {
			if (items[i]?.checked) {
				console.log("delete", items[i])
				delete items[i]
			}
		}
		
	}

	addItem() {
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