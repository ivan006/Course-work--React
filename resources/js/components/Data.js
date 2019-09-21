import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    data: [],

    selectedOptions: {
      "pepperoni-id":{
        "spicy-id":{},
        "regular-id":{}
      },
      "chicken-id":{
        "buffalo-id":{
          "mild-id":{},
          "hot-id":{
            "jalapeno-id":{},
            "cayenne-id":{}
          },
        },
        "bbq-id":{}
      }
    }
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
      //sss
      // this.setState({
      //   data: data_selected
      // });

      //
      // this.setState({
      //   data: response.data['content']
      // });


      this.setState({
        data: response.data
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
          selectedOptions={this.state.selectedOptions}
        />
      </div>
    );
  }
}






// Recursive component
const OptionsList = ({ options, selectedOptions }) => {



  return (
    <div>
      {options.map(option => (
        <ul>
          <div className="label">{option.name}</div>
          {/* Base Case */}
          {(option.content.length > 0 && selectedOptions[option.id]) &&
            <OptionsList
              options={option.content}
              selectedOptions={selectedOptions[option.id]}
             />
          }
        </ul>
      ))}
    </div>
  )
}
