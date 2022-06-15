const express = require("express")
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql');
const fs = require('fs');
require('../models/db');
const Issue = require('../models/issues');
const Counter = require('../models/counters');

let greetingMessage = "Use apollo server for GraphQL";
const initialIssues = [
    {id: 1, status: 'Fixed', owner: 'Person-A', effort: 20, created: new Date('2022-05-26'), due: new Date('2022-08-20'), title: 'Issue - 1'},
    {id: 2, status: 'Assigned', owner: 'Person-B', effort: 5, created: new Date('2022-05-18'), due: new Date('2022-08-22'), title: 'Issue - 2'}
];

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return (value.toISOString()).substring(0,10); 
    },
    parseValue(value) {
        
        //return new Date(value); // Convert incoming integer to Date
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue;
    },
    parseLiteral(ast) {
        if(ast.kind == Kind.STRING) {
            //return new Date(ast.value) 
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
        }
        
    },
  });

const resolvers = {
    Date: dateScalar,
    Query: {
        greeting: () => greetingMessage,
        issueList
    },
    Mutation: {
        setGreetingMessage,
        issueAdd
    },
};

function setGreetingMessage(_, { message }) {
    return greetingMessage = message;
}
function issueList() {
    const issues = Issue.find({})
        .then(issues => {
            return issues;
        })
        .catch(error=>{
            res.json(error)
        })  
        return issues;      
}
function validateIssue(issue) {
    console.log(issue)
    const errors = [];
    if (issue.title.length < 3) {
        errors.push('Field "title" must be at least 3 characters long.')
    }
    if (issue.status == 'Assigned' && !issue.owner) {
        errors.push('Field "owner" is required when status is "Assigned"');
    }
    console.log(errors.length)
    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', { errors });
    }
}

async function getNextIDSequence(name) {
    const result = await Counter.findOneAndUpdate(
    { name: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
    );
    console.log(result)
    return result.current;
}

async function issueAdd(_, {issue}) {
    validateIssue(issue);
    issue.id = await getNextIDSequence('issues');
    await Issue.create(issue)
        .then(counter => {
            console.log(counter)
        })
        .catch(error=>{
            res.json(error)
        }) 
    
    return issue;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema_graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});

const app = express();

app.use(express.static('public'));

server.start().then(() => {
    server.applyMiddleware({
      app,
      path: '/graphql',
      cors: true,
    });
});


app.listen(3000, function(){
    console.log("Server listening on Port # 3000");
})
