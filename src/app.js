import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';

const list1 = [
    {name: 'bj'},
    {name: 'zo'},
    {name: 'qxf'},
    {name: 'zxr'},
    {name: 'djr'},
];
const list2 = [
    {name: 'rl'},
    {name: 'fy'},
    {name: 'lkx'},
    {name: 'zfy'}
];

function reducer1(state = list1, action) {
    if (action.type === 'change') {
        return state === list1? list2: list1;
    }
    return state;
}

function reducer2(state = list2, action) {
    if (action.type === 'change') {
        return state === list1? list2: list1;
    }
    return state;
}

const store = createStore(combineReducers({
    list1: reducer1,
    list2: reducer2
}));

class List1 extends React.Component {
    constructor() {
        super();
        let state = store.getState();
        this.state = {
            list: state.list2
        }
        store.subscribe(() => {
            this.setState({
                list: store.getState().list2
            });
        });
        this.changeList.bind(this);
    }
    changeList() {
        store.dispatch({
            type: 'change'
        });
    }
    render() {
        let state = this.state;
        return (
            <div>
                {
                    state.list.map((item, index) => <p key={index} onClick={this.changeList}>{item.name}</p>)
                }
            </div>
        )
    }
}

ReactDOM.render(
    <List1/>,
    document.getElementById('root')
)
