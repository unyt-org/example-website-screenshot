# Example: Screenshot app

This repository demonstrates some essential concept of the [UIX](https://uix.unyt.org) framework such as [Realm Imports](https://unyt.org/glossary#realm-import) and [Web components](https://unyt.org/glossary#web-components) using the example of a **website screenshot app**.


The repository includes persistent file storage and implements [front-end](https://unyt.org/glossary#front-end).

## Installation
1. Install the **UIX command line tool** following the [Getting Started](https://docs.unyt.org/manual/uix/getting-started#the-uix-command-line-tool) guide in our documentation.

2. Clone this repository to your local machine:

	```bash
	$ git clone https://github.com/unyt-org/example-website-screenshot.git
	```
3. Run the project local
	```bash
	$ uix --port 8000
	```
4. Navigate to your favourite web browser and open http://localhost:8000 to see everything in action. 

## Structure
This diagram outlines the UIX default project structure.
We split our code base in [back-end](https://unyt.org/glossary#back-end), [front-end](https://unyt.org/glossary#front-end), and commons folder.
```
.
└── example-website-screenshot/
    ├── backend/
    │   ├── .dx                 // Config file for deployment
    │   └── entrypoint.tsx      // Back-end entrypoint
    ├── common/
    │   └── components/
    │       ├── MainPage.scss   // Main style declaration
    │       └── MainPage.tsx    // Main component
    ├── frontend/
    │   ├── entrypoint.css      // Front-end style declaration
    │   └── entrypoint.tsx      // Front-end entrypoint
    ├── app.dx                  // Endpoint config file
    └── deno.json               // Deno config file
```

## Features
* Take screenshot on the back-end
* Display of screenshot on front-end
* Auto caching support
* Exposes FileProvider on `/image/*`-route

## Preview
<img src=".github/screenshot.png" width="400">


## Explanation
### Persistent Storage of Files
To provide a seamless experience, our screenshot app demonstrates how to persistently store files. This means that even if the application is restarted, previous screenshots will be stored.

### File Provider
To access files the back-end exposes a route via FileProvider to serve static files.

---

<sub>&copy; unyt 2024 • [unyt.org](https://unyt.org)</sub>
