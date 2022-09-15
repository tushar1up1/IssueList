require('./models/db');
const Issue = require('./models/issues')
const Counter = require('./models/counters')

setTimeout(() => {
    //Write data to DB
    const issuesDB = [
        {
        id: 1, status: 'New', owner: 'Ravan', effort: 5,
        created: new Date('2019-01-15'), due: undefined,
        title: 'Error in console when clicking Add',
        },
        {
            id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
            created: new Date('2019-01-16'), due: new Date('2019-02-01'),
            title: 'Missing bottom border on panel',
            },
    ];
    /*Issue.remove({})
    Issue.insertMany(issuesDB);
    //const count = Issue.find({}).count();
    // Read data from DB
    async function issueList() {
        await Issue.find({})
            .then(issues => {
                console.log(issues)
            })
            .catch(error=>{
                res.json(error)
            })  
    }
    issueList();*/

    async function insertCounter() {
        Counter.remove({name: "issues"});

        await Counter.create({
            name: "issues",
            current: 0
        })
        .then(counter => {
            console.log(counter)
        })
        .catch(error=>{
            res.json(error)
        }) 
    }
    insertCounter();

    //console.log(count)
    
}, 2000);

