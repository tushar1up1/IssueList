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
    class IssueRow extends React.Component {
        render() {
            const style = this.props.rowStyle;
            return (
                <tr>
                    <td style={style}>{this.props.issue_id}</td>
                    <td style={style}>{this.props.issue_title}</td>
                </tr>
                
            )
        }
    }

    class IssueTable extends React.Component {
        render() {
            const rowStyle = {border: "1px solid silver", padding: 4};
            return (
                <table style={{borderCollapse: "collapse"}}>
                    <thead>
                        <tr>
                            <th style={rowStyle}>ID</th>
                            <th style={rowStyle}>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        <IssueRow rowStyle={rowStyle} issue_id={1} issue_title="This is first Issue"/>
                        <IssueRow rowStyle={rowStyle} issue_id={2} issue_title="This is second Issue"/>
                    </tbody>
                </table>
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
                <React.Fragment>
                    <h1>Issue List</h1>
                    <IssueFilter/>
                    <hr/>
                    <IssueTable/>
                    <hr/>
                    <IssueAdd/>                    
                </React.Fragment>
            )
        }
    }
    const element = <IssueList />;
    ReactDOM.render(element, document.getElementById('contents'));