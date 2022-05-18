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
class HelloWorld extends React.Component {
  render() {
    const message = "Section - 2";
    return /*#__PURE__*/React.createElement("div", {
      title: "Outer div"
    }, /*#__PURE__*/React.createElement("h1", null, " Hello World! "), /*#__PURE__*/React.createElement("h1", null, " Welcome: ", message, " "));
  }

}

const element = /*#__PURE__*/React.createElement(HelloWorld, null);
ReactDOM.render(element, document.getElementById('contents'));