import Contents from '../Contents.js';

function NavBar() {
  return /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("a", {
    href: "/"
  }, "Home"), ' | ', /*#__PURE__*/React.createElement("a", {
    href: "/#/issues"
  }, "Issue List"), ' | ', /*#__PURE__*/React.createElement("a", {
    href: "/#/report"
  }, "Report"));
}

export default function Page() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavBar, null), /*#__PURE__*/React.createElement(Contents, null));
}