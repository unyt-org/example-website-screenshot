import { UIX } from "uix/uix.ts";
import "common/theme.ts";
import { Overview } from "common/components/Overview.tsx";
import { listStorage } from "backend/lists.ts";

// The frontend routes definition
export default {
	'/': UIX.renderStatic(<Overview lists={listStorage}/>), // On '/'-route display the overview component
	'*': null // Letting the frontend handle all other routes
} satisfies UIX.Entrypoint;