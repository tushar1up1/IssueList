import IssueFilter from "./IssueFilter.js";
import IssueTable from "./IssueTable.js";
import IssueAdd from './IssueAdd.js';
import graphQLFetch from './graphQLFetch.js';
import URLSearchParams from 'url-search-params';
import React from 'react';


export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {issues:[]};
        this.createIssue = this.createIssue.bind(this);
    }
   

    componentDidMount() {
        let params = window.location.search;
        let queryParams = new URLSearchParams(params);
        let owner = queryParams.get("owner")
        //we need to create an object similar to FilterInputFields
        let filterInput = {
            owner: queryParams.get("owner"),
            status: queryParams.get("status")
        }        
        
        this.loadData(filterInput);
    }
    /*
    async loadData(ownervalue) {   
        const query = `query issueList($owner: String) {
            issueList(owner: $owner) {
                _id
                id 
                title 
                status 
                owner
                created 
                effort 
                due
            }
        }`;         
        async function IssueData(url='', query={}, variables) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ query, variables })
            });
            return response.json();
        }
        let variable = {owner: ownervalue}
        const result = IssueData('http://localhost:4000/graphql', query, variable)
            .then(result =>{                    

                this.setState({issues : result.data.issueList})
                return result.data.issueList;                   
        })
    }*/
    //Modifying this method little bit so that we can pass multiple values for filter
    async loadData(filterInput = {}) {
        let {owner, status} = filterInput;   
        const query = `query issueList($filterInputFields: FilterInputFields) {
            issueList(filterInputFields: $filterInputFields) {
                _id
                id 
                title 
                status 
                owner
                created 
                effort 
                due
            }
        }`; 
        const result = await graphQLFetch(query, {filterInputFields: filterInput });
        if(result) {
            console.log(result.issueList)
            this.setState({issues : result.issueList})
            //return result.issueList; 
        }

        /*async function IssueData(url='', query={}, variables) {
            console.log("IssueData", variables);
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ query, variables })
            });
            return response.json();
        }
        //let variable = {owner: ownervalue}
        console.log('HELLO', filterInput)
        const result = IssueData('http://localhost:4000/graphql', query, filterInput)
            .then(result =>{                    

                this.setState({issues : result.data.issueList})
                return result.data.issueList;                   
        })*/
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