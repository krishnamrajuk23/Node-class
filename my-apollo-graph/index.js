const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

async function startServer(){
    const app = express();
    const server = new ApolloServer({
        typeDefs:`
            type Todo {
                id: ID!
                title: String!
                complete: Boolean
            }

            type Query {
                getTodos: [Todo]
                getUsers: [User]
            }

            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String
            }
        `,
        resolvers: {
            Query: {
                getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getUsers: async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data
            }
        }
    });
    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => {
        console.log('Server is running on http://localhost:8000/graphql');
    });
}

startServer();
