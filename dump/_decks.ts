import fs from "fs";
export const getDeckSlugsWithoutDB: () => Promise<string[]> = async () => {
  return fs
    .readdirSync(process.env.PWD + "/dump")
    .filter((file: string) => file.includes("deck-"))
    .map((file: string) => {
      return file.slice("deck-".length, file.indexOf(".ts"));
    });
};
