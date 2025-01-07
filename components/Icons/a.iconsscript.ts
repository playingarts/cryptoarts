/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");

const filenamearray: string[] = [];
fs.readdirSync("./components/Icons/").forEach((fileName: string) => {
  //   console.log(fileName);
  if (fileName.split(".").length !== 3) {
    filenamearray.push(fileName);
  }
});

const filepath = __dirname + "/index.stories.tsx";

fs.writeFileSync(
  filepath,
  `import { StoryObj } from "@storybook/react/*";

const meta = {
  title: "Icons",
  tags: ["autodocs"],
};

export default meta;
`
);

filenamearray.map((name) => {
  const withoutExt = name.split(".")[0];
  fs.appendFileSync(
    filepath,
    `
import ${withoutExt} from "./${withoutExt}";
export const ${withoutExt}Story: StoryObj<typeof ${withoutExt}> = {
render: () => <${withoutExt} />,
};
    `
  );
  // const splitres = name.split(".");
  // return splitres.join(".stories.");
});
