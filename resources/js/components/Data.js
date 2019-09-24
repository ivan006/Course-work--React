
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
        <br></br>
        <h2>Data</h2>
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
    <ul className="kv-list-parent">
      {data_selected.map(option => (
        <li key={option.id}>

          <div className="kv-item-container  kv-di-in ">
            {/* Base Casfe */}
            {typeof option.content == "object" &&
              <div>
                <div className="kv-di-in">📁</div>
                <label >
                  <input className="kv-tog-on-ib-switch kv-tog-off-ib-switch" type="checkbox" name="checkbox" defaultValue="value" />
                  <input className="kv-field-container kv-name kv-tog-on-ib" type="text" name="CurrentIdentifier[name]" defaultValue={option.name} />
                  <a href="#" className="kv-name-unedit kv-name kv-tog-off-ib ">{option.name}</a>
                  <span className="kv-little-button ">^</span>
                </label>
                <input className="kv-di-no" type="text" name="CurrentIdentifier[type]" defaultValue={option.type} />
                <input className="kv-di-no" type="text" name="CurrentIdentifier[id]" defaultValue={option.id} />
                <button type="submit" className="kv-little-button" name="CurrentIdentifier[action]" defaultValue="update">✓</button>
                <button type="submit" className="kv-little-button" name="CurrentIdentifier[action]" defaultValue="delete">×</button>
                <label className="kv-po-re">
                  <span className="kv-little-button ">+</span>
                  <input className="kv-tog-on-bl-switch" type="checkbox" name="checkbox" defaultValue="value" />
                  <div className="kv-popover kv-tog-on-bl kv-item-container  kv-di-in" >
                    <div className="" >
                      <span>📁</span>
                      <input className="kv-field-container kv-name kv-di-in "  type="text"   name="CurrentIdentifier[add][folder]"  />
                      <button type="submit" className="kv-little-button" name="CurrentIdentifier[action]" defaultValue="create_folder">+</button>
                    </div>
                    <div className="kv-mar-top-3">
                      <span>📃</span>
                      <input className="kv-field-container kv-name kv-di-in"  type="text" name="CurrentIdentifier[add][file]" />
                      <button type="submit" className="kv-little-button" name="CurrentIdentifier[action]" defaultValue="create_folder">+</button>
                    </div>
                  </div>
                </label>

              </div>
            }
            {typeof option.content == "string" &&
              <div>
                <div className="kv-di-in">📃</div>
                <label >
                  <input className="kv-tog-on-ib-switch kv-tog-off-ib-switch" type="checkbox" name="checkbox" defaultValue="value" />
                  <input className="kv-field-container kv-name kv-tog-on-ib" type="text" name="CurrentIdentifier[name]" defaultValue={option.name} />
                  <a href="#" className="kv-name-unedit kv-name kv-tog-off-ib ">{option.name}</a>
                  <span className="kv-little-button ">^</span>
                </label>

                <input className="kv-di-no" type="text" name="CurrentIdentifier[type]" defaultValue={option.type} />
                <input className="kv-di-no" type="text" name="CurrentIdentifier[id]" defaultValue={option.id} />
                <button type="submit" className="kv-little-button" type="submit" name="CurrentIdentifier[action]" defaultValue="update">✓</button>
                <button type="submit" className="kv-little-button" type="submit" name="CurrentIdentifier[action]" defaultValue="delete">×</button>


              </div>
            }
          </div>
          {typeof option.content == "object" &&
            <OptionsList
              options={option.content}
              />
          }
          {typeof option.content == "string" &&
            <ul className="kv-list-parent">
              <li>
                <div className="kv-item-container ">
                  <textarea className="kv-field-container kv-content-container kv-di-in" name="CurrentIdentifier[content]" rows="8" defaultValue={option.content}></textarea>
                </div>
              </li>
            </ul>
          }
        </li>
      ))}
    </ul>


  )
}
