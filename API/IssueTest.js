require('./models/db')
const Issue = require('./models/issues')

setTimeout(()=>{

}, 2000)

setTimeout(()=>{
    const issueDB = [
        {id: 1, status: 'Fixed', owner: 'Person-A', effort: 20, created: new Date('2022-05-16'), due: new Date('2022-08-20'), title: 'Issue - 1'},
        {id: 2, status: 'Assigned', owner: 'Person-B', effort: 5, created: new Date('2022-05-18'), due: new Date('2022-08-22'), title: 'Issue - 2'}
    ];
    Issue.insertMany(issueDB);
    Issue.findOne({id:1})
        .then(function(issues){
            console.log(issues)
        })
        

}, 2000)