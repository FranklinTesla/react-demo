/**
 * ------------------------------------
 * @param {}
 * @export 导出变量
 * ------------------------------------
 */
import React from 'react';
import ReactDOM from 'react-dom';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        // event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class Root extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange() {
        console.log("trigger root's change!");
    }
    render() {
        return (
            <div onSubmit={this.handleChange.bind(this)}>
                <NameForm/>
            </div>
        )
    }
}

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
)