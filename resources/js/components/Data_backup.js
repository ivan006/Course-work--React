import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    data: []
  };
  componentDidMount () {
    axios.get('/api/show/Group_1')
    .then(response => {

      var data_selected = response.data['content'];

      var firstKey = Object.keys(data_selected)[0];
      var data_selected = data_selected[firstKey]['content'];

      var data_selected = Object.values(data_selected);

      this.setState({
        data: data_selected
      });


      console.log(this.state.data);




    });
  }

  render() {

    return (

      <div>
        <ul>
          {this.state.data.map(data_item => <li>{data_item.name}</li>)}
        </ul>
      </div>
    );
  }
}
