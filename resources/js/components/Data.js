
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
    <ul class="kv-list-parent">
      {data_selected.map(option => (


      <li>





        {/* Base Case */}
        {typeof option.content == "object" &&
          <div>
          <div class="kv-item-container  kv-di-in ">
            <div class="kv-di-in">📁</div>
            <label >
              <input class="kv-tog-on-ib-switch kv-tog-off-ib-switch" type="checkbox" name="checkbox" value="value" />
              <input class="kv-field-container kv-name kv-tog-on-ib" type="text" name="CurrentIdentifier[Attr[0]]" value="value2[$Attr[0]]" />
              <a href="#" class="kv-name-unedit kv-name kv-tog-off-ib ">{option.name} (value2[$Attr[0]]) </a>
              <span class="kv-little-button ">^</span>
            </label>
            <input class="kv-di-no" type="text" name="CurrentIdentifier[Attr[1]]" value="value2[$Attr[1]]" />
            <input class="kv-di-no" type="text" name="CurrentIdentifier[Attr[4]]" value="value2[$Attr[4]]" />
            <button type="submit" class="kv-little-button" name="CurrentIdentifier[Attr[3]]" value="update">✓</button>
            <button type="submit" class="kv-little-button" name="CurrentIdentifier[Attr[3]]" value="delete">×</button>
            <label class="kv-po-re">
              <span class="kv-little-button ">+</span>
              <input class="kv-tog-on-bl-switch" type="checkbox" name="checkbox" value="value" />
              <div class="kv-popover kv-tog-on-bl kv-item-container  kv-di-in" >
                <div class="" >
                  <span>📁</span>
                  <input class="kv-field-container kv-name kv-di-in "  type="text"   name="CurrentIdentifier[Attr[6]][folder]"  />
                  <button type="submit" class="kv-little-button" name="CurrentIdentifier[Attr[3]]" value="create_folder">+</button>
                </div>
                <div class="kv-mar-top-3">
                  <span>📃</span>
                  <input class="kv-field-container kv-name kv-di-in"  type="text" name="CurrentIdentifier[Attr[6]][file]" />
                  <button type="submit" class="kv-little-button" name="CurrentIdentifier[Attr[3]]" value="create_folder">+</button>
                </div>
              </div>
            </label>
          </div>
          <OptionsList
            options={option.content}
           />
         </div>

        }

        {typeof option.content == "string" &&
          <div>
            <div class="kv-item-container  kv-di-in  ">
              <div class="kv-di-in">📃</div>
              <label >
                <input class="kv-tog-on-ib-switch kv-tog-off-ib-switch" type="checkbox" name="checkbox" value="value" />
                <input class="kv-field-container kv-name kv-tog-on-ib" type="text" name="CurrentIdentifier[Attr[0]]" value="value2[$Attr[0]]" />
                <a href="#" class="kv-name-unedit kv-name kv-tog-off-ib ">{option.name} value2[$Attr[0]]</a>
                <span class="kv-little-button ">^</span>
              </label>

              <input class="kv-di-no" type="text" name="CurrentIdentifier[Attr[1]]" value="value2[$Attr[1]]" />
              <input class="kv-di-no" type="text" name="CurrentIdentifier[Attr[4]]" value="value2[$Attr[4]]" />
              <button type="submit" class="kv-little-button" type="submit" name="CurrentIdentifier[Attr[3]]" value="update">✓</button>
              <button type="submit" class="kv-little-button" type="submit" name="CurrentIdentifier[Attr[3]]" value="delete">×</button>
            </div>
            <ul class="kv-list-parent">
              <li>
                <div class="kv-item-container ">
                  <textarea class="kv-field-container kv-content-container kv-di-in" name="CurrentIdentifier[Attr[2]]" rows="8" >value2[$Attr[2]]</textarea>
                </div>
              </li>
            </ul>
          </div>
        }



      </li>

      ))}
    </ul>


  )
}
