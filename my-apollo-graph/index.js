const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

async function startServer(){
    const app = express();
    const gqlServer = new ApolloServer({
        typeDefs:`
            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String
            }

            type Todo {
                id: ID!
                title: String!
                completed: Boolean
                user: User
            }

            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!): User
            }

          
        `,
        resolvers: {
            Todo: {
                user: async (todo) => {
                    console.log('Fetching user for todo:', todo);
                    const response = await axios.get(
                      `https://jsonplaceholder.typicode.com/users/${todo.userId}`
                    );
                    return response.data;
                }
            },
            Query: {
                getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getAllUsers: async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getUser: async (_, { id }) =>  (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            },
        }
    });
    app.use(bodyParser.json());
    app.use(cors());

    await gqlServer.start();

    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(8000, () => {
        console.log('Server is running on http://localhost:8000/graphql');
    });
}

startServer();
