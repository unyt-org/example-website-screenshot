import { map } from "unyt_core/datex.ts";
import { Path } from "uix/utils/path.ts";
import { IEL, UIX } from "uix";
import { Pointer } from "unyt_core/datex_all.ts";
import { type SharedList, type ListItem } from "backend/entrypoint.tsx";
import { always } from "unyt_core/datex_short.ts";
import { querySelector } from "uix/standalone/shadow_dom_selector.ts";


@UIX.template(function(this: List) {
	const list = this.$.options.$.list as unknown as Pointer<SharedList>;
	return <div>
		<div class="header">
			<h1>{list.$.title}</h1>
		</div>
		<ol>
			{
				always(()=>{
					return list.$.items.val?.map((item, index) => <li 
						data-checked={item.checked ?? false}
						onclick={UIX.inDisplayContext(() => item.checked = !item.checked )}>
						<input type="checkbox"/>
						<b>{item.name}</b>
						<span>{item.amount} {item.type}{item.amount! > 1 ? 's': ''}</span>
					</li>);
				})
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
			<div id="add" onclick={UIX.inDisplayContext(() => {
				(querySelector("uix2-list")! as List).addItem();
			})}>Add</div>
		</div>
	</div>
})
export class List extends UIX.BaseComponent<UIX.BaseComponent.Options & {list: SharedList}> {
	@standalone @id declare main: HTMLElement;
	@use declare strings: {[key: string]: string };
	@id("name") declare name: HTMLInputElement;
	@id("amount") declare amount: HTMLInputElement;
	@id("type") declare type: HTMLOptionElement;
	@id("dialog") declare dialog: HTMLDivElement;

	override getInternalRoute() {
		return [globalThis.location.pathname]
	}

	protected override onDisplay(): void | Promise<void> {
		console.log(this.options.list.items, "<<")
	}

	@standalone
	toggleDialog(value?: boolean) {
		this.dialog.classList.toggle("active", value);
	}

	@bindOrigin
	removeChecked() {
		// FIXME Throws DATEX error
		// this.options.$.list.$.items.val = this.options.$.list.$.items.val?.filter(e => !e.checked)
		
		// FIXME ERROR
		this.$.options.$.list.$.items.setVal(
			this.options.list.items.filter(e => !e.checked)
		)

		/* FIXME Also error with those lines:
		const items = this.options.list.items;
		console.log("items", items)
		for (let i = items.length; i--;) {
			console.log(items[i])
			if (items[i].checked) {
				items.splice(i, 1);
				delete items[i]
			}
		}
		*/
	}

	@bindOrigin
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

	override onCreate() {
		
	}
}