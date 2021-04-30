const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");

const q = faunadb.query;
var fdbClient = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    todos: [Todo]!
  }
  type Todo {
    id: ID!
    title: String!
    done: Boolean!
  }
  type Mutation {
    addTodo(title: String!): Todo
    updateTodoDone(id: ID!): Todo
  }
`;

const todos = {};
let todoIndex = 0;
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: async (parents, args, context) => {
      if (context.user) {
        const results = await fdbClient.query(
          q.Paginate(
            q.Match(q.Index("todos_by_owner_desc"), context.user.email)
          )
        );
        return results.data.map(([ref, title, done]) => ({
          id: ref.id,
          title,
          done,
        }));

        // return Object.values(todos).sort((a, b) => b.created - a.created);
      } else {
        return [];
      }
    },
  },
  Mutation: {
    addTodo: async (_, args, context) => {
      if (!context.user) {
        throw new Error("Must be authenticated to insert todos");
      }

      const { id } = args;
      const result = await fdbClient.query(
        q.Create(q.Collection("todos"), {
          data: {
            title: args.title,
            done: false,
            owner: context.user.email,
            created: Date.now(),
          },
        })
      );

      return {
        ...result.data,
        id: result.ref.id,
      };
    },

    updateTodoDone: async (_, args, context) => {
      if (!context.user) {
        throw new Error("Must be authenticated to update todos");
      }

      const { id } = args;

      //toggle todo done field
      result = await fdbClient.query(
        q.Let(
          {
            doc: q.Get(q.Ref(q.Collection("todos"), id)),
            ref: q.Select(["ref"], q.Var("doc")),
            done: q.Select(["data", "done"], q.Var("doc")),
          },
          q.Update(q.Var("ref"), {
            data: { done: q.Not(q.Var("done")) },
          })
        )
      );

      return {
        ...result.data,
        id: result.ref.id,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ context }) => {
    if (context.clientContext.user) {
      // console.log(JSON.stringify(context.clientContext.user, null, 4));
      return { user: context.clientContext.user };
    } else {
      return {};
    }
  },
  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

const handler = server.createHandler();

module.exports = { handler };
