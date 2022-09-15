import IssueFilter from "./issueFilter.js";
import IssueTable from "./issueTable.js";
import IssueAdd from './IssueAdd.js';
import graphQLFetch from './graphQLFetch.js';
export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: []
    };
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
    const query = `query {
            issueList {
                id 
                title 
                status 
                owner
                created 
                effort 
                due
            }
        }`;

    async function IssueData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query
        })
      });
      return response.json();
    }

    const result = IssueData('/graphql', query).then(result => {
      this.setState({
        issues: result.data.issueList
      });
      return result.data.issueList;
    });
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
    const data = await graphQLFetch(query, {
      issue
    });

    if (data) {
      this.loadData();
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
      createIssue: this.createIssue
    }));
  }

}