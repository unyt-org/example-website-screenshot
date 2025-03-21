import Capture from "./Capture.ts";
import { Path } from "uix/utils/path.ts";
import { timeout } from "datex-core-legacy/datex_all.ts";
import { type Entrypoint } from "uix/providers/entrypoints.ts";
import { FileProvider } from "uix/providers/common.tsx";
import { UIX } from "uix";
import { bash } from "https://deno.land/x/bash@0.2.0/mod.ts";

UIX.Theme.setMode("dark");

bash(
  "PUPPETEER_PRODUCT=chrome deno run -A --unstable https://deno.land/x/puppeteer@16.2.0/install.ts",
)
  .then(() => console.info("Successfully installed puppeteer"))
  .catch(console.error);

@endpoint
export class Screenshot {
  @timeout(40_000)
  @property
  static async take(url: string | URL, config?: {
    width: number;
    height: number;
    fullSize?: boolean;
  }): Promise<HTMLImageElement> {
    const fileName = `${
      url.toString().replaceAll(/[^a-zA-Z0-9\?\-\.]+/g, "_")
    }.png`;
    const filePath = UIX.cacheDir.getChildPath(fileName);
    if (filePath.fs_exists) {
      return this.getImage(filePath);
    }

    const fileData = await Capture.take(
      url,
      config?.fullSize,
      {
        width: config?.width ?? 1920,
        height: config?.height ?? 1080,
      },
    );
    await Deno.writeFile(filePath, fileData);
    return this.getImage(filePath);
  }

  private static getImage(filePath: Path<`${string}:`, boolean>) {
    return <img src={"/image/".concat(filePath.name)} /> as HTMLImageElement;
  }
}

// The backend routes definition
export default {
  "/": null,
  "/image/*": new FileProvider(UIX.cacheDir),
} satisfies Entrypoint;
