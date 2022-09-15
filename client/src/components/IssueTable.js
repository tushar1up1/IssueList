import React from 'react';
import IssueRow from "./IssueRow.js";

export default function IssueTable(props) {   
    
    const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);
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