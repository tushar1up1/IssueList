import IssueFilter from "./issueFilter.js";
import IssueTable from "./issueTable.js";
import IssueAdd from './IssueAdd.js';
import graphQLFetch from './graphQLFetch.js';

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {issues:[]};
        this.createIssue = this.createIssue.bind(this);
        /*setTimeout(() => {
            const newIssue = {status: 'Assigned', owner: 'Person-C', title: 'Add New Issue'}
            this.createIssue(newIssue);
        }, 3000);*/
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {   
         
        let owner = "Person-A";
        const query = `query issueList($owner: String) {
            issueList(owner: $owner) {
                id 
                title 
                status 
                owner
                created 
                effort 
                due
            }
        }`;
        async function IssueData(url='', query, data) {
            let data1 = {owner: "Person -A"};
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ query, data1 })
            });
            return response.json();
        }
        let data = {owner: "Person -A"};
        const result = IssueData('/graphql', query, {data})
            .then(result =>{
                this.setState({issues : result.data.issueList})
                return result.data.issueList;                   
        })

    }
    async createIssue(issue) {
        const query = `
        mutation issueAdd($issue: IssueInputs!) {
                issueAdd(issue: $issue) {
                    id
                    title
                    status
                    owner 
                } 
        }`;
        const data = await graphQLFetch(query, { issue });
        if (data) {
            this.loadData();
        }  

    }
    render() {            
        return (
            <React.Fragment> 
                <IssueFilter/>
                <hr/>
                <IssueTable issues= {this.state.issues}/>
                <hr/>
                <IssueAdd createIssue= {this.createIssue}/>                    
            </React.Fragment>

        ) 
    }
}