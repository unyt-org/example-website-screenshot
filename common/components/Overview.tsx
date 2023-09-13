import { IEL, UIX } from "uix";
import { SharedList } from "backend/entrypoint.tsx";

@UIX.template(function(this: Overview) {
	return <div>
		<h1>Overview</h1>
		<>
			{[...this.options.lists.entries()]
				.map(([key, val]) => <a href={`/${key}`}>
				{val.title}
			</a>)}
		</>
	</div>
})
export class Overview extends UIX.BaseComponent<UIX.BaseComponent.Options & {lists: Map<string, SharedList>}> {

}