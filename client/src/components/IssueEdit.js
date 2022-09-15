import React, { useEffect, useState } from 'react';
import graphQLFetch from './graphQLFetch.js';
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function IssueEdit() {
    const { _id } = useParams();
    const [issue, setIssue] = useState({});
    console.log(_id);
    const [isIssueUpdated, setisIssueUpdated] = useState(false)
    //const [issueId, setIssueId] = useState(_id);
    //console.log("IssueID", issueId)

    useEffect(() => {
        getIssue();
    }, []);

    const getIssue = () => {
        const query = `
        mutation SingleIssue($_id: String!) {
            SingleIssue(_id: $_id) {
                _id
                id 
                title 
                status 
                owner
                created 
                effort 
                due
            } 
        }`;
        graphQLFetch(query, {_id})
            .then(function(data){
                setIssue(data.SingleIssue);                
            });
        
    }
    async function updateSubmit (e) {
        
        e.preventDefault();
        const form = document.forms.editIssue;
        console.log("Update Issue from here");
        const modifyIssue = {
            _id: _id,
            owner: form.owner.value, 
            title: form.title.value, 
            status: form.status.value,
            effort: parseInt(form.effort.value) 
        }
        updateIssueFunction(modifyIssue);
        //best thing is take the user to list page
        form.owner.value = ""; 
        form.title.value = "";
        form.effort.value = "";
        form.status.value = "";
    };

    async function updateIssueFunction(modifyIssue) {
        const query = `
            mutation updateIssue($modifyIssue: IssueUpdatePayload) {
                updateIssue(modifyIssue: $modifyIssue)
                        }
                        `;

        const data = await graphQLFetch(query, { modifyIssue });
        if(data) {
            setisIssueUpdated(true);
        }
    }

    return (
        <div>
            <h2>{`This is a placeholder for editing issue ${_id}`}</h2>
            {isIssueUpdated && (
                <Navigate to="/" />
            )}
            <form name="editIssue" onSubmit={updateSubmit}>
                <input type="text" name="title" placeholder="Title" defaultValue={issue.title}/>
                <select name='status' defaultValue={issue.status} >
                            {["New", "Assigned", "Fixed", "Closed"]
                                .map((sts, i) => {
                                    return (sts === issue.status ? <option key={i} value={sts} selected>{sts}</option> : 
                                    <option key={i} value={sts}>{sts}</option>)
                                })}
                        </select>
                <input type="text" name="owner" placeholder="Owner" defaultValue={issue.owner}/>
                <input type="text" name="effort" placeholder="Effort" defaultValue={issue.effort}/>                
                <button>Update</button>
            </form>
        </div>
        

    )
       
}