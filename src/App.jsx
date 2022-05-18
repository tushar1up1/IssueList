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
            return (
                <div>This is placeholder for IssueFilter Component</div>
            )
        }
    }
    class IssueTable extends React.Component {
        render() {
            return (
                <div>This is placeholder for IssueTable Component</div>
            )
        }
    }
    class IssueAdd extends React.Component {
        render() {
            return (
                <div>This is placeholder for IssueAdd Component</div>
            )
        }
    }
    class IssueList extends React.Component {
        render() {
            return (
                <div>
                    <h1>Issue List</h1>
                    <IssueFilter/>
                    <hr/>
                    <IssueTable/>
                    <hr/>
                    <IssueAdd/>                    
                </div>
            )
        }
    }
    const element = <IssueList />;
    ReactDOM.render(element, document.getElementById('contents'));