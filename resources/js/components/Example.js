import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    render() {
        return (
            <div className="w3-container w3-card w3-white w3-round w3-margin">
                <h1>
                    Hi i'm a unicorn!
                </h1>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
