import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import IssueList from './IssueList.js';
import IssueReport from './IssueReport.js';
import IssueEdit from './IssueEdit.js';
const NotFound = () => <h1>Page Not Found</h1>;


export default function Contents() {
    return (
        <Routes>  
            <Route exact path="/" element={<IssueList/>} />
            <Route path="/issues" element={<IssueList/>} /> 
            <Route path="/report" element={<IssueReport/>} />
            <Route path="/edit/:_id" element={<IssueEdit/>} />
            <Route path="/*" element={<NotFound/>} />                      
        </Routes>
    );
}