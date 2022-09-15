const express = require("express")
const { ApolloServer, UserInputError } = require('apollo-server-express');
//const { GraphQLScalarType, Kind } = require('graphql');
const fs = require('fs');
require('./models/db')
const Issue = require('./models/issues')
require('dotenv').config();
const dateScalar = require('./graphql_type')
const about = require('./about')
const Counter = require('./models/counters');

var port = process.env.PORT || '4000';

const resolvers = {
    Date: dateScalar,
    Query: {
        greeting: about.getGreetingMessage,
        issueList        
    },
    Mutation: {
        setGreetingMessage : about.setGreetingMessage,
        issueAdd,
        updateIssue,
        SingleIssue
    },
};
async function issueList(parent, {filterInputFields}, context, info) {
    
    let issues = Issue.find();
    if(filterInputFields.owner) {
        issues.or({owner: filterInputFields.owner})
    }
    console.log(filterInputFields.status)
    console.log(filterInputFields.owner)
    if(filterInputFields.status) {
        issues.or({status: filterInputFields.status})
    }

    return (await issues.exec()).map(issue => {
        return {
            _id: issue._id,
            id: issue.id, 
            title: issue.title, 
            status: issue.status, 
            owner: issue.owner,
            created: issue.created, 
            effort: issue.effort, 
            due: issue.due
        }
    }); 
    

    /*if(args.owner) {        
        const issues = Issue.find(args)
        .then(issues => {            
            return issues;
        })
        .catch(error=>{
            res.json(error)
        })  
    return issues;
    } else {        
        const issues = Issue.find({})
        .then(issues => {            
            return issues;
        })
        .catch(error=>{
            res.json(error)
        })  
        return issues;
    }*/
       
}

function validateIssue(issue) {
    const errors = [];
    if (issue.title.length < 3) {
        errors.push('Field "title" must be at least 3 characters long.')
    }
    if (issue.status == 'Assigned' && !issue.owner) {
        errors.push('Field "owner" is required when status is "Assigned"');
    }
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
    console.log(issue)
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

async function SingleIssue(_, { _id }) {
    const issue = await Issue.findById({_id})
    return issue;
}

async function updateIssue(parent, {modifyIssue}, context, info) {
    console.log('UPdaeIssue', modifyIssue)
    await Issue.findOneAndUpdate({_id: modifyIssue._id}, {
        title: modifyIssue.title,
        owner: modifyIssue.owner,
        effort: modifyIssue.effort,
        status: modifyIssue.status
    }).then(issue => {
        return true;
    }).catch(error => {
        return false;
    })
}

const server = new ApolloServer({
    typeDefs : fs.readFileSync('schema_graphql', 'utf8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});


const app = express();
server.start().then(() => {
    server.applyMiddleware({
      app,
      path: '/graphql',
      cors: true,
    });
});

//app.use(express.static('./UI/public'));
app.listen(port, function(){
    console.log("API Server listening on Port # " + port);
})