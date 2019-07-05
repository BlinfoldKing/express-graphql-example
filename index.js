const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const data = [
    {
        title: "Hello World",
        author: "Test",
        time: new Date(),
        content: "Lorem iahwdlhjfaw",
        commentCount: 0
    },
    {
        title: "Hello World2",
        author: "Test",
        time: new Date(),
        content: "Lorem iahwdlhjfaw",
        commentCount: 0
    }
]


// scheme works as contract/struct to available query
let schema = buildSchema(`
    type Article {
        title: String!
        author: String
        time: String
        content: String
        commentCount: Int
    }

    type Query {
        articles: [Article] 
        getArticle(id: Int): Article
    }
`);

// root `resolver` works as handler for available scheme
let root = {
    articles: () => data,
    getArticle: payload => data[payload.id]
};


app.listen(3000, () => console.log("listening on port 3000"));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
