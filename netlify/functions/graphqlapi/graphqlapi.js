const { ApolloServer, gql } = require("apollo-server-lambda");

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
    todos: (parents, args, context) => {
      if (context.user) {
        return Object.values(todos).sort((a, b) => b.created - a.created);
      } else {
        return [];
      }
    },
  },
  Mutation: {
    addTodo: (_, { title }) => {
      todoIndex++;
      const id = `key-${todoIndex}`;
      todos[id] = { id, title, done: false, created: Date.now() };
      return todos[id];
    },
    updateTodoDone: (_, { id }) => {
      todos[id].done = !todos[id].done;
      return todos[id];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub };
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
