import React, { useCallback } from "react";
//import { Button } from 'react-bootstrap';
import Button from '@mui/material/Button';

export default function IssueFilter()  {
    const handleFilterData = useCallback((e) => {
        
    })
        
    return (
        <div>
            <div>
                <a href="/issues">All Issues</a>
                {' | '}
                <a href="/issues?owner=Person-A">Issue With Person A</a>
                {' | '}
                <a href="/issues?owner=Person-B">Issue With Person B</a>
            </div>
            <h2>Let's do more filtering</h2>
            <form name="issueFilter">
                <div>
                    <select className="form-control" name="status"  >
                        <option value=""> All</option>
                        {["New", "Assigned", "Fixed", "Closed"]
                            .map((str, i) => {
                                return <option key={i} value={str}>{str}</option>
                            })}
                    </select>
                    <div>
                        <Button type="submit" variant="contained" color="warning">Filter</Button>
                    </div>                
                </div>
            </form>
        </div>
        
    )

}

