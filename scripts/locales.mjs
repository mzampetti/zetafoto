#!/usr/bin/env zx
const { promises: fsPromises } = require("fs");
const ROOT_FOLDER = "./src/app/";
const BASE_FOLDER = "(base)";
const LANG_FOLDER = "(lang)";

let labels = null;
async function getConfig() {
  const json = await fs.readFile("./src/data/config-data.json", "utf8");
  labels = JSON.parse(json);
}
await getConfig();
const { translations, defaultLocale, locales } = labels;
const langs = locales.filter((l) => l != defaultLocale);

//Replace locale in files
async function replaceInFile(sourceFile, destFile, replacement) {
  try {
    let contents = await fsPromises.readFile(sourceFile, "utf-8");
    for (let r of replacement) {
      const re = new RegExp(`"${r.from}"`, "g");
      // console.info("replacing", r.from, r.to);
      contents = contents.replace(re, `"${r.to}"`);
    }
    // console.info(contents);
    await fsPromises.writeFile(destFile, contents);
  } catch (err) {
    console.error(err);
  }
}
//UTILS
function getTranslation(source, lang) {
  const chunks = source.split("/");
  const file = chunks.slice(-1)[0];
  const folders = chunks.slice(0, chunks.length - 1);

  const translatedPath = folders.reduce((str, name) => {
    const translation = translations?.[name]?.[lang]
      ? translations[name][lang]
      : name;
    return (str += translation + "/");
  }, "");

  const fileName = file.replace(".tsx", "");
  const translatedFile = translations?.[fileName]?.[lang]
    ? translations[fileName][lang]
    : fileName;
  return {
    sourceFolder: folders.slice(-1),
    folder: translatedPath,
    file: `${translatedFile}.tsx`,
    source,
  };
}

//START
// console.info(chalk.blue("Hello routes generator!"));
// let lang = await question(
//   `What language do you want generate? ${langs.join("|")} : `
// );
// if (!langs.includes(lang)) {
//   console.info(chalk.red("Language not found!"));
//   process.exit(1);
// }

//MOVE TO PAGES DIRECTORY

await cd(`${ROOT_FOLDER}${BASE_FOLDER}`);
await $`pwd`;

//GET ROUTE FILES of root
let allfiles = await glob([
  "**/*",
  // "!**/api",
  // `!${lang}/*`,
  // "!layout.tsx",
  // "!not-found.tsx",
  // "!error.tsx",
]);
// console.info("allfiles", allfiles);

//MOVE TO LANG DIRECTORY

await cd(`../${LANG_FOLDER}`);
await $`pwd`;

within(async () => {
  // const langFolder = await fs.promises.readdir(`../(lang)`).then((files) => files);
  // langFolder.length > 0;

  if (langs.length == 0) {
    console.info(chalk.blue("No langs detected. Removing any folders..."));
    try {
      await $`rm -fr *`;
    } catch (error) {
      console.info(error);
    }
  } else {
    for (let lang of langs) {
      console.info(
        chalk.blue("GENERATING ROUTES FOR "),
        chalk.green(lang.toUpperCase())
      );

      console.info(chalk.blue("Removing previous " + lang + " folder..."));
      try {
        await $`rm -fr ${lang}`;
      } catch (error) {
        console.info(error);
      }

      const destinations = allfiles.map((f) => getTranslation(f, lang));
      console.info("destinations", destinations);

      try {
        //CREATE LANG FOLDER
        console.info(chalk.blue("Generating new " + lang + " folder..."));
        try {
          await $`mkdir ${lang}`;
        } catch (error) {
          //ignore
        }

        //CREATE TRANSLATED FOLDERS
        console.info(chalk.blue("Creating translated folders..."));
        const folderPromises = destinations.map(({ folder }) => {
          return $`mkdir -p ${lang}/${folder}`;
        });
        await Promise.all(folderPromises);

        //CREATE FILES
        console.info(chalk.blue("Generating page files..."));
        for (let destination of destinations) {
          const { folder, file, source, sourceFolder } = destination;
          const dest = `${lang}/${folder}/${file}`;

          // await replaceInFile(
          //   `../${BASE_FOLDER}/${source}`,
          //   dest,
          //   defaultLocale, //toreplace
          //   lang //replacement
          // );

          let replacement = [{ from: defaultLocale, to: lang }];

          const lastFolder = folder.split("/").filter(Boolean).slice(-1)[0];

          if (
            sourceFolder?.[0] &&
            lastFolder &&
            lastFolder != sourceFolder[0]
          ) {
            replacement.push({ from: sourceFolder[0], to: lastFolder });
          }

          console.info(replacement);
          await replaceInFile(`../${BASE_FOLDER}/${source}`, dest, replacement);
          // await $`touch ${dest}`;
          // await fs.copy(source, dest);
          // return fs.writeFile(dest, templateStr);
        }
      } catch (error) {
        console.info(error);
      }
      console.info(chalk.blue("Done!"));
    }
  }

  console.info(chalk.blue("The End."));
});
