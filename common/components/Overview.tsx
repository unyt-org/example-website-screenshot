import { UIX } from "uix";
import { SharedList } from "backend/lists.ts";
import { map } from "unyt_core/functions.ts";

@UIX.template(function(this: Overview) {
	return <div>
		<h1>Overview</h1>
		{
			map(this.options.lists, ([key, val]) => (
				<a href={`/${key}`}>{val.title}</a>
			))
		}
	</div>
})
export class Overview extends UIX.BaseComponent<{lists: Map<string, SharedList>}> {}