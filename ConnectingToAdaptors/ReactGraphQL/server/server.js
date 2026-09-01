const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const app = express();

app.use(cors());

const schema = buildSchema(`
  type SalesData {
    month: String
    revenue: Int
  }

  type SalesResult {
    result: [SalesData]
  }

  type Query {
    getSalesData: SalesResult
  }
`);

const root = {
  getSalesData: () => {
    return {
      result: [
        { month: "Jan", revenue: 1000 },
        { month: "Feb", revenue: 1500 },
        { month: "Mar", revenue: 1200 },
        { month: "Apr", revenue: 2000 }
      ]
    };
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000/graphql');
});