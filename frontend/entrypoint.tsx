import { UIX } from "uix";
import { MainPage } from "../common/components/MainPage.tsx";
import { Entrypoint } from "uix/html/entrypoints.ts";

UIX.Theme.setMode("dark");

export default {
	'/': <MainPage/>
} satisfies Entrypoint;
