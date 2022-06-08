const express = require("express")
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql');

let greetingMessage = "Use apollo server for GraphQL";
const initialIssues = [
    {id: 1, status: 'Fixed', owner: 'Person-A', effort: 20, created: new Date('2022-05-26'), due: new Date('2022-08-20'), title: 'Issue - 1'},
    {id: 2, status: 'Assigned', owner: 'Person-B', effort: 5, created: new Date('2022-05-18'), due: new Date('2022-08-22'), title: 'Issue - 2'}
];

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.toISOString(); // Convert outgoing Date to integer for JSON
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

const typeDefs = `
enum StatusType {
    New
    Assigned
    Fixed
    Closed
}

input IssueInputs {
    title: String!   
    status: StatusType = New 
    owner: String
    effort: Int
    due: Date
}
scalar Date

type Issue {
    id: Int!
    title: String!
    status: StatusType!
    owner: String!
    effort: Int
    created: Date!
    due: Date
}
type Query {
    greeting: String!,
    issueList: [Issue!]!
}
type Mutation {
    setGreetingMessage(message: String!): String,
    issueAdd(issue: IssueInputs!): Issue!
}`;

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
    return initialIssues;
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

function issueAdd(_, {issue}) {
    validateIssue(issue);
    issue.created = new Date();
    issue.id = initialIssues.length + 1;
    //if (issue.status === undefined) issue.status = 'New';
    
    initialIssues.push(issue);
    return issue;
}



const server = new ApolloServer({
    typeDefs,
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
