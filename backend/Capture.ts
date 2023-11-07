import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

export default class Capture {
	static async take(url: string | URL, fullPage = false, size = {
		width: 1920,
		height: 1080
	}) {
		const browser = await puppeteer.launch({
			headless: true,
			ignoreHTTPSErrors: true,
			timeout: 60_000,
		});
		const page = await browser.newPage();
		await page.setViewport(size);
		await page.goto(url.toString(), {
			waitUntil: "domcontentloaded"
		});
		await sleep(1_000);
		const result = await page.screenshot({
			fullPage
		}) as Uint8Array;
		await browser.close();
		return result;
	}
}