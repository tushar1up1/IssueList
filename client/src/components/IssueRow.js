import React from 'react';
import moment from 'moment';
import {    
    Link
  } from "react-router-dom";
export default function IssueRow(props)  {
    const issue = props.issue;           
    return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.effort}</td>
            <td>{moment(issue.created).format('DD-MM-YYYY')}</td>
            <td>{issue.due ? moment(issue.due).format('DD-MM-YYYY') : ''}</td>
            <td>{issue.title}</td>
            <td><Link to={`/edit/${issue._id}`}>Edit</Link></td>            
        </tr>
    ) 
}