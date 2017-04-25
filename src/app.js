/**
 * ------------------------------------
 * @param {}
 * @export 导出变量
 * ------------------------------------
 */
import React from 'react';
import ReactDOM from 'react-dom';
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    componentDidMount() {
        this.tick();
    }
    componentWillUnmount() {
        clearTimeout(this.timeId);
    }
    tick() {
        if (this.timeId) {
            clearTimeout(this.timeId);
        }
        this.setState({
            date: new Date()
        });
        this.timeId = setTimeout(() => this.tick(), 1000);
    }
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
ReactDOM.render(
    <Clock/>
    , document.getElementById('root')
);