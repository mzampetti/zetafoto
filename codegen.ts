import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://graphql.datocms.com": {
      headers: {
        Authorization: `Bearer ${process.env.DATO_API_KEY}`,
        "X-Environment": `${process.env.DATO_ENV || ""}`,
        "X-Exclude-Invalid": "true",
      },
    },
  },
  documents: ["./src/graphql/*.graphql"],
  generates: {
    "src/graphql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        strictScalars: true,
        scalars: {
          BooleanType: "boolean",
          CustomData: "Record<string, unknown>",
          Date: "string",
          DateTime: "string",
          FloatType: "number",
          IntType: "number",
          ItemId: "string",
          JsonField: "unknown",
          MetaTagAttributes: "Record<string, string>",
          UploadId: "string",
        },
      },
    },
  },
};

export default config;
