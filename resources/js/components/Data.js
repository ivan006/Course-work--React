import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    data: [],

      selectedOptions: {}
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
          onChange={(selectedOptions) => this.setState({selectedOptions})}
          selectedOptions={this.state.selectedOptions}
        />
      </div>
    );
  }
}






// Recursive component
const OptionsList = ({ options, selectedOptions, onChange }) => {

  const handleCheckboxClicked = (selectedOptionId) => {
    // is currently selected
    if(selectedOptions[selectedOptionId]){
      // remove selected key from options list
      delete selectedOptions[selectedOptionId];
    } else { // is not currently selected
      // Add selected key to optionsList
      selectedOptions[selectedOptionId] = {}
    }
    // call onChange function given by parent
    onChange(selectedOptions)
  }

  const handleSubOptionsListChange = (optionId, subSelections) => {
    // add sub selections to current optionId
    selectedOptions[optionId] = subSelections;
    // call onChange function given by parent
    onChange(selectedOptions);
  }

  return (
    <div>
      {options.map(option => (
        <ul>
          <Checkbox
            selected={selectedOptions[option.id]}
            label={option.name}
            onChange={() => {handleCheckboxClicked(option.id)}}
           />
          {/* Base Case */}
          {(option.subOptions.length > 0 && selectedOptions[option.id]) &&
            <OptionsList
              options={option.subOptions}
              selectedOptions={selectedOptions[option.id]}
              onChange={(subSelections) => handleSubOptionsListChange(option.id, subSelections)}
             />
          }
        </ul>
      ))}
    </div>
  )
}

// Dumb checkbox component, completly controlled by parent
const Checkbox = ({ selected, label, onChange }) => {
  return (
    <div>
      <div
        className="checkbox"
        onClick={() => onChange(!selected)}
      >click
      </div>
      <div className="label">{label}</div>
    </div>
  )
}
