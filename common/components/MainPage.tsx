import { Screenshot } from "backend/entrypoint.tsx";
import { Component } from "uix/components/Component.ts";
import { template } from "uix/html/template.ts";

@template(function (this: MainPage) {
  return (
    <div>
      <h1>
        UIX Screenshot <b>App</b>
      </h1>
      <span>Get a screenshot of any given URL.</span>
      <input
        id="url"
        value="https://github.com/unyt-org/uix"
        type="url"
        placeholder={"Enter URL here..."}
      />
      <div
        id="submit"
        onclick:frontend={() => this.capture()}
        class="submit active"
      >
        Capture
      </div>

      <p>Screenshot</p>
      <div id="images" />
    </div>
  );
})
export class MainPage extends Component {
  @id
  url!: HTMLInputElement;
  @id
  images!: HTMLDivElement;
  @id
  submit!: HTMLDivElement;

  private async capture() {
    if (!this.submit.classList.contains("active")) {
      return;
    }

    const url = this.url.value.startsWith("http")
      ? this.url.value
      : `https://${this.url.value}`;

    this.url.disabled = true;
    this.submit.classList.toggle("active", false);
    try {
      const image = await Screenshot.take(url);
      this.images.prepend(image);
    } catch (error) {
      console.error(error);
      alert("Oups, could not create screenshot!");
    }

    this.submit.classList.toggle("active", true);
    this.url.disabled = false;
  }
}
