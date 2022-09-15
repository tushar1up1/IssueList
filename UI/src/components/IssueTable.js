import IssueRow from "./issueRow.js";

export default class IssueTable extends React.Component {
    /*createIssue(issue) {
        issue.id = this.state.issues.length + 1;
        issue.created = new Date();
        const newIssueList = this.state.issues.slice();
        newIssueList.push(issue);
        this.setState({issues: newIssueList});
    }*/
    render() {
        const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);
        return (
            <table className="bordered-table">             
                <thead>
                    <tr>                             
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
                    <IssueRow rowStyle={rowStyle} issue_id={1} issue_title="This is first Issue"></IssueRow>
                    <IssueRow rowStyle={rowStyle} issue_id={2} issue_title="This is Second Issue"></IssueRow>
                    */}
                </tbody>
            </table>
        )
    }
}