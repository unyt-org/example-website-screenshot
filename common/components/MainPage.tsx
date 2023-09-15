import { UIX } from "uix";
import { Screenshot } from 'backend/entrypoint.tsx';

@UIX.template(function(this: MainPage) {
	return <div>
		<h1>UIX Screenshot <b>App</b></h1>
		<span>Get a screenshot of any given URL.</span>

		<input id="url" value="https://example.com" type={"url"} placeholder={"Enter URL here..."}/>
		<div id="submit" onclick={UIX.inDisplayContext(()=>this.capture())} class="submit active">Capture</div>

		<p>Screenshot</p>
		<div id="images"/>
	</div>
})
export class MainPage extends UIX.BaseComponent {
	@id declare url: HTMLInputElement;
	@id declare images: HTMLDivElement;
	@id declare submit: HTMLDivElement;

	private async capture() {
		if (!this.submit.classList.contains("active"))
			return;

		const url = this.url.value.startsWith("http") ? 
			this.url.value :
			`https://${this.url.value}`;
		
		this.url.disabled = true;
		this.submit.classList.toggle("active", false);
		try {
			const image = await Screenshot.take(url);
			this.images.prepend(image);
		} catch (error) {
			console.error(error);
			alert("Oups, could not create screenshot!");
		} finally {
			this.submit.classList.toggle("active", true);
			this.url.disabled = false;
		}
	}
}