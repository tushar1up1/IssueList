import IssueList from './components/IssueList.js';
import IssueReport from './components/IssueReport.js';
const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
return (
    <Switch>
        <Redirect exact from="/" to="/issues" />
        <Route path="/issues" component={IssueList} />
        <Route path="/report" component={IssueReport} />
        <Route component={NotFound} />
    </Switch>
);
}