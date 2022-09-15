import Page from "./components/Page.js"; //option - 1

/*const element = React.createElement('div', {title: 'Outer div'},
        React.createElement('h1', null, 'Hello World!')
    );*/
//option - 2

/*const element = (
    <div title="Outer DIV">
        <h2>Hello World!! How are you!! </h2>
        <h2>Welcome: </h2>
    </div> 
);*/

/*class HelloWorld extends React.Component {
    render() {
        const message = "Section - 1"
        return (
            <div title="Outer DIV">
                <h2>Hello World!! How are you!! </h2>
                <h2>Welcome: {message} </h2>
            </div>
        ) 
    }
}*/

/*class IssueFilter extends React.Component {
    render() {            
        return (
            <div> Issue FIlter Component </div>
        ) 
    }
}*/

const initialIssues = [{
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
}]; //const element = <IssueList/>

const element = /*#__PURE__*/React.createElement(Router, null, /*#__PURE__*/React.createElement(Page, null));
ReactDOM.render(element, document.getElementById('contents'));