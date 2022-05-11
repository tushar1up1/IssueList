//option - 1

/*const element = React.createElement('div', {title: 'Outer div'},
    React.createElement('h1', null, 'Hello World!')
);
*/
//option - 2
const element = /*#__PURE__*/React.createElement("div", {
  title: "Outer div"
}, /*#__PURE__*/React.createElement("h1", null, " Hello World! "));
ReactDOM.render(element, document.getElementById('contents'));