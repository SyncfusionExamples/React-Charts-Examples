import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { join } from "path";
import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { monthlySalesData } from "./data";

const app = express();
const PORT = 4000;

app.use(cors());

const schemaPath = join(__dirname, "schema.graphql");
const schemaFile = readFileSync(schemaPath, "utf8");
const schema = buildSchema(schemaFile);

interface DataManagerInput {
  skip?: number;
  take?: number;
  requiresCounts?: boolean;
}

interface GetMonthlySalesArgs {
  datamanager?: DataManagerInput;
}

const rootValue = {
  getMonthlySales: ({ datamanager }: GetMonthlySalesArgs) => {
    let result = [...monthlySalesData];
    const count = result.length;

    if (datamanager) {
      const skip = datamanager.skip ?? 0;
      const take = datamanager.take ?? result.length;

      result = result.slice(skip, skip + take);
    }

    return {
      result,
      count
    };
  }
};

app.get("/", (_req, res) => {
  res.send("GraphQL Chart Server is running. Use /graphql endpoint.");
});

app.all(
  "/graphql",
  createHandler({
    schema,
    rootValue
  })
);

app.listen(PORT, () => {
  console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
});
