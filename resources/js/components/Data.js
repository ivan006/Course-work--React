
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    data: [],


  };
  componentDidMount () {
    axios.get('/api/show/Group_1')
    .then(response => {

      // var data_selected = response.data['content'];
      //
      // var firstKey = Object.keys(data_selected)[0];
      // var data_selected = data_selected[firstKey]['content'];
      //
      // var data_selected = Object.values(data_selected);
      // sss
      // this.setState({
      //   data: data_selected
      // });



      // this.setState({
      //   data: response.data
      // });


      var data_selected = response.data['content'];
      this.setState({
        data: data_selected
      });



      console.log(this.state.data);




    });
  }

  render() {

    return (

      <div>
        <h1>Toppings</h1>
        <OptionsList
          options={this.state.data}
        />
      </div>
    );
  }
}






// Recursive component
const OptionsList = ({ options}) => {

  var data_selected = options;
  var data_selected = Object.values(data_selected);
  alert(data_selected);
  return (
    <div>
      {data_selected.map(option => (
        <ul>
          <div className="label">{option.name}</div>
          {/* Base Case */}
          {option.content.length > 0 &&
            <OptionsList
              options={option.content}
             />
          }
        </ul>
      ))}
    </div>
  )
}
