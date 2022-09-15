export default class AddIssue extends React.Component {
    constructor() {
        super(); 
        this.handleSubmit = this.handleSubmit.bind(this);
        /*setTimeout(() => {
            const newIssue = {status: 'Assigned', owner: 'Person-C', title: 'Add New Issue'}
            this.props.createIssue(newIssue);
        }, 3000); */           
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = {
            owner: form.owner.value, 
            title: form.title.value, 
            status: 'New',
            due: new Date(new Date().getTime() + 1000*60*60*24*10)
        }
        this.props.createIssue(issue);
        form.owner.value = ""; 
        form.title.value = "";
    }

    render() {            
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <button>Add</button>
            </form>
        ) 
    }
}