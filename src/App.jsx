    //option - 1
        /*const element = React.createElement('div', {title: 'Outer div'},
            React.createElement('h1', null, 'Hello World!')
        );
        */
    //option - 2
    const element = (
        <div title="Outer div">
            <h1> Hello World! Thanks</h1>
        </div>    
    );
    ReactDOM.render(element, document.getElementById('contents'));