//option - 1

/*const element = React.createElement('div', {title: 'Outer div'},
    React.createElement('h1', null, 'Hello World!')
);
*/
//option - 2

/*const element = (
    <div title="Outer div">
        <h1> Hello World! Thanks a lot</h1>
        <h1> Hello World! </h1>
    </div>    
);*/

/*class HelloWorld extends React.Component {
    render() {
        const message = "Section - 2";
        return (
            <div title="Outer div">
                <h1> Hello World! </h1>
                <h1> Welcome: {message} </h1>
            </div> 
        )
    }
}*/
function HelloWorld(props) {
  return /*#__PURE__*/React.createElement("div", {
    title: "Outer div"
  }, /*#__PURE__*/React.createElement("h1", null, "Hello World!"), /*#__PURE__*/React.createElement("h1", null, "Welcome: ", props.message));
}

/*#__PURE__*/
React.createElement(HelloWorld, {
  message: "Full-Stack Programming"
});

class IssueFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "This is placeholder for IssueFilter Component");
  }

}
/*
class IssueRow extends React.Component {
    render() {
        //const style = this.props.rowStyle;
        const issue = this.props.issue;
        return (
            <tr>
                 <td>{issue.id}</td>
                 <td>{issue.status}</td>
                 <td>{issue.owner}</td>
                 <td>{issue.effort}</td>
                 <td>{issue.created.toDateString()}</td>
                 <td>{issue.due ? issue.due.toDateString() : ''}</td>
                 <td>{issue.title}</td>
              </tr>
            
        )
    }
}
*/


function IssueRow(props) {
  //render() {
  //const style = this.props.rowStyle;
  const issue = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.owner), /*#__PURE__*/React.createElement("td", null, issue.effort), /*#__PURE__*/React.createElement("td", null, issue.created), /*#__PURE__*/React.createElement("td", null, issue.due ? issue.due : ''), /*#__PURE__*/React.createElement("td", null, issue.title)); //}
}

const newIssue = {
  status: 'New',
  owner: 'Person-C',
  title: 'New Issue to be added'
};

class IssueTable extends React.Component {
  /*
  constructor() {
      super(); //when you have to call "this" in a constructor, you have to call super first.
      this.state = {issues: []};
      setTimeout(() => {
          this.createIssue(newIssue);
      }, 3000);
  }
  componentDidMount() {
      this.loadData();
  }
    loadData() {
      setTimeout(() => {
      this.setState({ issues: initialIssues });
      }, 1000);
  }
    createIssue(issue) {
      issue.id = this.state.issues.length + 1;
      issue.created = new Date();
      const newIssueList = this.state.issues.slice();
      newIssueList.push(issue);
      this.setState({ issues: newIssueList });
  }
  */
  render() {
    //const rowStyle = {border: "1px solid silver", padding: 4};

    /*const issues = [
        {id: 1, status: 'resolved', owner: 'Person-A', effort: 20, created: new Date('2022-05-16'), due: new Date('2022-08-20'), title: 'Issue - 1'},
        {id: 2, status: 'assigned', owner: 'Person-B', effort: 5, created: new Date('2022-05-18'), due: new Date('2022-08-22'), title: 'Issue - 2'}
    ]*/
    //const issueRows = this.state.issues.map(issue => <IssueRow key={issue.id} issue={issue} />); 
    const issueRows = this.props.issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
      key: issue.id,
      issue: issue
    }));
    return (
      /*#__PURE__*/
      // <table style={{borderCollapse: "collapse"}}>             
      React.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "STATUS"), /*#__PURE__*/React.createElement("th", null, "OWNER"), /*#__PURE__*/React.createElement("th", null, "EFFORT"), /*#__PURE__*/React.createElement("th", null, "CREATED"), /*#__PURE__*/React.createElement("th", null, "DUE"), /*#__PURE__*/React.createElement("th", null, "TITLE"))), /*#__PURE__*/React.createElement("tbody", null, issueRows))
    );
  }

}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)
    };
    this.props.createIssue(issue);
    form.owner.value = "";
    form.title.value = "";
  }

  render() {
    return (
      /*#__PURE__*/
      //<div>This is placeholder for IssueAdd Component</div>    
      React.createElement("form", {
        name: "issueAdd",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "owner",
        placeholder: "Owner"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "title",
        placeholder: "Title"
      }), /*#__PURE__*/React.createElement("button", null, "Add"))
    );
  }

}

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
  console.log(query, variables);

  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];

      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }

    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: []
    };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    /*setTimeout(() => {
    this.setState({ issues: initialIssues });
    }, 1000);*/
    const query = `query {
                issueList {
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

    IssueData('/graphql', query).then(result => {
      //console.log(result.data.issueList);
      this.setState({
        issues: result.data.issueList
      });
      return result.data.issueList;
    });
    /*const data = await graphQLFetch(query);
    if (data) {
        this.setState({ issues: data.issueList });
    }*/
    //this.setState({ issues: result});    
  }

  async createIssue(issue) {
    /*issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = this.state.issues.slice();
    newIssueList.push(issue);
    this.setState({ issues: newIssueList });*/
    //console.log(issue)

    /*const query = `
        mutation {
            issueAdd(issue:{
                title: "${issue.title}",
                owner: "${issue.owner}",
                due: "${issue.due.toISOString()}",
            }) {
                id
            }
        }`;
    */
    const query = `
                mutation issueAdd($issue: IssueInputs!) {
                        issueAdd(issue: $issue) {
                            id
                            title
                            status
                            owner                            
                        } 
                }`;
    /*    
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        //body: JSON.stringify({ query})
        body: JSON.stringify({ query, variables: {issue} })
        });
    this.loadData();   
    */

    const data = await graphQLFetch(query, {
      issue
    });

    if (data) {
      this.loadData();
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue List"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
      createIssue: this.createIssue
    }));
  }

} //const element = <HelloWorld message="Full-Stack Programming" />;


const element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('contents'));