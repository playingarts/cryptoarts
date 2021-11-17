import { schema } from "./schema";
import { codegen } from "@graphql-codegen/core";
import { parse, printSchema } from "graphql";
import { writeFileSync } from "fs";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";

const filename = `${process.cwd()}/typings/gql/index.d.ts`;
const config = {
  maybeValue: "T | undefined",
  contextType: "{ req: Request, res: Response }",
  declarationKind: "interface",
  noExport: true,
  scalars: {
    JSON: "{ [key: string]: any }",
    Long: "number",
  },
};
const parsedSchema = parse(printSchema(schema));

Promise.all([
  codegen({
    config,
    documents: [],
    filename,
    pluginMap: {
      typescript: typescriptPlugin,
    },
    plugins: [
      {
        typescript: {},
      },
    ],
    schema: parsedSchema,
  }),
  codegen({
    config,
    documents: [],
    filename,
    pluginMap: {
      typescriptResolvers: typescriptResolversPlugin,
    },
    plugins: [
      {
        typescriptResolvers: {},
      },
    ],
    schema: parsedSchema,
  }),
]).then(([generatedGqlTypes, generatedGqlResolvers]) =>
  writeFileSync(
    filename,
    `declare namespace GQL {\n\n${generatedGqlTypes}${generatedGqlResolvers}\n}\n`
  )
);
