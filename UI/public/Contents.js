import IssueList from './components/IssueList.js';
import IssueReport from './components/IssueReport.js';

const NotFound = () => /*#__PURE__*/React.createElement("h1", null, "Page Not Found");

export default function Contents() {
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Redirect, {
    exact: true,
    from: "/",
    to: "/issues"
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/issues",
    component: IssueList
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/report",
    component: IssueReport
  }), /*#__PURE__*/React.createElement(Route, {
    component: NotFound
  }));
}