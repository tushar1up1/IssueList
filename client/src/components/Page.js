import {BrowserRouter as Router, Link} from "react-router-dom";
import Contents from './Contents.js';
function NavBar() {
return (    
    <nav>
        <Link to="/">Home</Link>
            {' | '}
        <Link to="/issues">Issue List</Link>    
            {' | '}
        <Link to="/report">Report</Link> 
    </nav>
    );
}

export default function Page() {
    return (
        <Router>
            <div>
                <NavBar />
                <Contents />
            </div>
        </Router>
        
    );
}