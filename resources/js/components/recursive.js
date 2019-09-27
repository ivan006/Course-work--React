
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const toppingOptions = [
  {
    name: "Pepperoni",
    id: "pepperoni-id",
    subOptions: [
      {
        name: "Spicy",
        id: "spicy-id",
        subOptions: []
      },
      {
        name: "Regular",
        id: "regular-id",
        subOptions: []
      }
    ]
  },
  {
    name: "Chicken",
    id: "chicken-id",
    subOptions: [
      {
        name: "Buffalo",
        id: "buffalo-id",
        subOptions: [
          {
            name: "Mild",
            id: 'mild-id',
            subOptions: [],
          },
          {
            name: "Hot",
            id: 'hot-id',
            subOptions: [
              {
                name: 'Jalapeño',
                id: 'jalapeno-id',
                subOptions: []
              },
              {
                name: 'Cayenne',
                id: 'cayenne-id',
                subOptions: []
              }
            ],
          },
        ]
      },
      {
        name: "BBQ",
        id: 'bbq-id',
        subOptions: [],
      }
    ]
  },
]
export default class Data extends Component {
  // Arbitrarily nested data

  state = {
    selectedOptions: {}
  }

  render() {
     return (
       <div>
         <h1>Toppings</h1>
         <OptionsList
           options={toppingOptions}
           onChange={(selectedOptions) => this.setState({selectedOptions})}
           selectedOptions={this.state.selectedOptions}
         />
       </div>
     )
  }
}

// Recursive component
const OptionsList = ({ options, selectedOptions, onChange }) => {

  const isChanged = (selectedOptionId) => {
    // is currently selected
    if(selectedOptions[selectedOptionId]){
      // remove selected key from options list
      delete selectedOptions[selectedOptionId];
    } else { // is not currently selected
      // Add selected key to optionsList
      selectedOptions[selectedOptionId] = {}
    }
    // call onChange function given by parent
    onChange(selectedOptions);
    alert(selectedOptionId+" - is changed");
  }

  const containsChange = (optionId, subSelections) => {
    // add sub selections to current optionId
    selectedOptions[optionId] = subSelections;
    // call onChange function given by parent
    onChange(selectedOptions);
    alert(optionId+" - contains change" );
  }



  return (
    <div>
      {options.map(option => (
        <ul>



         <div>
           <div
             className="checkbox"
             onClick={() => {isChanged(option.id)}}
             >
             d
           </div>
           <div className="label">{option.name}</div>
         </div>
          {/* Base Case */}
          {(option.subOptions.length > 0 && selectedOptions[option.id]) &&
            <OptionsList
              options={option.subOptions}
              onChange={(subSelections) => containsChange(option.id, subSelections)}
              selectedOptions={selectedOptions[option.id]}
             />
          }
        </ul>
      ))}
    </div>
  )
}
