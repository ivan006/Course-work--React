import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    data: []
  }
  componentDidMount () {
    axios.get('/api/show/Group_1')
    .then(response => {
      this.setState({
        data: response.data
      });
    });
  }

  render() {
    return (
      <div className="w3-container w3-card w3-white w3-round w3-margin">
      <h1>
      Hi i'm a unicorn!s
      </h1>
      </div>
    );
  }
}

if (document.getElementById('data')) {
  ReactDOM.render(<Data />, document.getElementById('data'));
}
