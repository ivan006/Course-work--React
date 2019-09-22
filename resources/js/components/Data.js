
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
      this.setState({
        data: response.data.content
      });
    });
  }

  render() {

    return (

      <div>
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
  // alert(JSON.stringify(data_selected));
  // {JSON.stringify(option.content)}
  return (
    <div>
      {data_selected.map(option => (

        <ul>
          <div className="label">{option.name}</div>
          {/* Base Case */}
          {typeof option.content == "object" &&
            <OptionsList
              options={option.content}
             />
          }
        </ul>
      ))}
    </div>
  )
}
