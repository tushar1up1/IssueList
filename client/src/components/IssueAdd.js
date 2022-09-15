import React, { useState, useEffect, useCallback } from "react";

export default function AddIssue(props) {
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = {
            owner: form.owner.value, 
            title: form.title.value, 
            status: form.status.value,
            effort: parseInt(form.effort.value),
            due: new Date(new Date().getTime() + 1000*60*60*24*10)
        }
        props.createIssue(issue);
        form.owner.value = ""; 
        form.title.value = "";
    })

    //render() {            
        return (
            <form name="issueAdd" onSubmit={handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <select className="form-control" id="status" >
                            {["New", "Assigned", "Fixed", "Closed"]
                                .map((str, i) => {
                                    return <option key={i} value={str}>{str}</option>
                                })}
                </select>
                <input type="Number" name="effort" placeholder="No Of Days To Finish Issue" min="10" max="15"/>
                <button>Add</button>
            </form>
        ) 
   //}
}
