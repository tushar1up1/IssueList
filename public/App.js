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
    const style = this.props.rowStyle;
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      style: style
    }, this.props.issue_id), /*#__PURE__*/React.createElement("td", {
      style: style
    }, this.props.issue_title));
  }

}

class IssueTable extends React.Component {
  render() {
    const rowStyle = {
      border: "1px solid silver",
      padding: 4
    };
    return /*#__PURE__*/React.createElement("table", {
      style: {
        borderCollapse: "collapse"
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "ID"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Title"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement(IssueRow, {
      rowStyle: rowStyle,
      issue_id: 1,
      issue_title: "This is first Issue"
    }), /*#__PURE__*/React.createElement(IssueRow, {
      rowStyle: rowStyle,
      issue_id: 2,
      issue_title: "This is second Issue"
    })));
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