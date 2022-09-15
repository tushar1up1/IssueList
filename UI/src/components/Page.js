import Contents from '../Contents.js';
function NavBar() {
return (
    <nav>
        <a href="/">Home</a>
            {' | '}
        <a href="/#/issues">Issue List</a>
            {' | '}
        <a href="/#/report">Report</a>
    </nav>
    );
}

export default function Page() {
    return (
        <div>
            <NavBar />
            <Contents />
        </div>
    );
}