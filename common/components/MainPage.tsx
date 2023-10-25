import { Screenshot } from 'backend/entrypoint.tsx';
<<<<<<< HEAD
import { Component } from 'uix/components/Component.ts';
import { template } from "uix/html/template.ts";
=======
import { Path } from "uix/utils/path.ts";
>>>>>>> 5dfac4a376ab451c65e9ee901620d641006c2cb6

@template(function(this: MainPage) {
	return <div>
		<h1>UIX Screenshot <b>App</b></h1>
		<span>Get a screenshot of any given URL.</span>

<<<<<<< HEAD
		<input id="url" value="https://example.com" type={"url"} placeholder={"Enter URL here..."}/>
		<div id="submit" onclick:frontend={()=>this.capture()} class="submit active">Capture</div>
=======
		<input id="url" value="https://example.com" type="url" placeholder="Enter URL here..."/>
		<div id="submit" onclick={()=>this.capture()} class="submit active">Capture</div>
>>>>>>> 5dfac4a376ab451c65e9ee901620d641006c2cb6

		<p>Screenshot</p>
		<div id="images"/>
	</div>
})
export class MainPage extends Component {
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
		} 
		catch (error) {
			console.error(error);
			alert("Oups, could not create screenshot!");
		} 
		
		this.submit.classList.toggle("active", true);
		this.url.disabled = false;
	}
}