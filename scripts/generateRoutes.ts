//generate from filesystem
import fs from "fs";
import path from "path";

const appDirectory = path.resolve("src/app");

const ignoreFolders = ["api", "(...)"];

function isRouteFile(file: string): boolean {
  return ["page.tsx", "page.jsx", "page.js", "page.mjs"].includes(file);
}

function walk(dir: string, baseRoute = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let routes: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const name = entry.name;

      if (ignoreFolders.includes(name) || name.startsWith("@")) continue;

      const newBase = name.startsWith("(")
        ? baseRoute
        : path.join(baseRoute, name);
      routes = routes.concat(walk(path.join(dir, name), newBase));
    } else if (isRouteFile(entry.name)) {
      const route = baseRoute === "" ? "/" : baseRoute.replace(/\\/g, "/");
      routes.push(route);
    }
  }

  return routes;
}

const routes = walk(appDirectory).sort();

const routeMap: Record<string, string> = {};
for (const route of routes) {
  routeMap[route] = "";
}

fs.writeFileSync(
  "src/data/routes.json",
  JSON.stringify(routeMap, null, 2),
  "utf8"
);

console.log("Done");
