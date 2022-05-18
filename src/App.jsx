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
            //const style = this.props.rowStyle;
            const issue = this.props.issue;
            return (
                <tr>
                    {/*                     
                        <td style={style}>{this.props.issue_id}</td>
                        <td style={style}>{this.props.children}</td>
                    */}
                     <td>{issue.id}</td>
                     <td>{issue.status}</td>
                     <td>{issue.owner}</td>
                     <td>{issue.effort}</td>
                     <td>{issue.created.toDateString()}</td>
                     <td>{issue.due.toDateString()}</td>
                     <td>{issue.title}</td>

                </tr>
                
            )
        }
    }

    class IssueTable extends React.Component {
        render() {
            //const rowStyle = {border: "1px solid silver", padding: 4};
            const issues = [
                {id: 1, status: 'resolved', owner: 'Person-A', effort: 20, created: new Date('2022-05-16'), due: new Date('2022-08-20'), title: 'Issue - 1'},
                {id: 2, status: 'assigned', owner: 'Person-B', effort: 5, created: new Date('2022-05-18'), due: new Date('2022-08-22'), title: 'Issue - 2'}
            ]
            const issueRows = issues.map(issue => <IssueRow key={issue.id} issue={issue} />); 
            return (
                // <table style={{borderCollapse: "collapse"}}>             
                <table className="bordered-table">    
                    <thead>
                        <tr>
                            {/* 
                                <th style={rowStyle}>ID</th>
                                <th style={rowStyle}>Title</th>
                            */}
                            <th>ID</th>
                            <th>STATUS</th>
                            <th>OWNER</th>
                            <th>EFFORT</th>
                            <th>CREATED</th>
                            <th>DUE</th>
                            <th>TITLE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issueRows}
                        {/* 
                            {issues.map(issue => <IssueRow rowStyle={rowStyle} issue={issue}/>)}
                        */}
                        {/*
                        <IssueRow rowStyle={rowStyle} issue_id={1}>This is first Issue</IssueRow>
                        <IssueRow rowStyle={rowStyle} issue_id={2}>
                            This is <b>Second</b> Issue
                        </IssueRow> */}
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