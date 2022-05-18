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
class IssueFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "This is placeholder for IssueFilter Component");
  }

}

class IssueRow extends React.Component {
  render() {
    //const style = this.props.rowStyle;
    const issue = this.props.issue;
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.owner), /*#__PURE__*/React.createElement("td", null, issue.effort), /*#__PURE__*/React.createElement("td", null, issue.created.toDateString()), /*#__PURE__*/React.createElement("td", null, issue.due.toDateString()), /*#__PURE__*/React.createElement("td", null, issue.title));
  }

}

class IssueTable extends React.Component {
  render() {
    const rowStyle = {
      border: "1px solid silver",
      padding: 4
    };
    const issues = [{
      id: 1,
      status: 'resolved',
      owner: 'Person-A',
      effort: 20,
      created: new Date('2022-05-16'),
      due: new Date('2022-08-20'),
      title: 'Issue - 1'
    }, {
      id: 2,
      status: 'assigned',
      owner: 'Person-B',
      effort: 5,
      created: new Date('2022-05-18'),
      due: new Date('2022-08-22'),
      title: 'Issue - 2'
    }];
    const issueRows = issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
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
  render() {
    return /*#__PURE__*/React.createElement("div", null, "This is placeholder for IssueAdd Component");
  }

}

class IssueList extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue List"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, null));
  }

}

const element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('contents'));