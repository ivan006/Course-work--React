
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


  handleDelete (id) {
    const isNotId = task => task.id !== id;
    const updatedTasks = this.state.data.filter(isNotId);
    this.setState({data:updatedTasks})
    alert(1);
  }

  render() {

    return (

      <div>
        <br></br>
        <h2>Data</h2>
        <DataHelper
          datahelper={this.state.data}
          />
      </div>
    );
  }
}







// Recursive component
const DataHelper = ({ datahelper}) => {

  var datahelpervalues = Object.values(datahelper);
  // alert(JSON.stringify(datahelpervalues));
  // {JSON.stringify(datahelpervalues.content)}
  return (
    <ul className="kv-list-parent">
      {datahelpervalues.map(datahelpervalue => (
        <li key={datahelpervalue.id}>

          <div className="kv-item-container  kv-di-in ">
            {/* Base Casfe */}
            {typeof datahelpervalue.content == "object" ?
              <div className="kv-di-in">📁</div>
              :
              <div className="kv-di-in">📃</div>
            }

            <label >
              <input className="kv-tog-on-ib-switch kv-tog-off-ib-switch" type="checkbox" name="checkbox" defaultValue="value" />
              <input className="kv-field-container kv-name kv-tog-on-ib" type="text" name="CurrentIdentifier[name]" defaultValue={datahelpervalue.name} />
              <a href="#" className="kv-name-unedit kv-name kv-tog-off-ib ">{datahelpervalue.name}</a>
              <span className="kv-little-button ">^</span>
            </label>


            <input className="kv-di-no" type="text" name="CurrentIdentifier[type]" defaultValue={datahelpervalue.type} />
            <input className="kv-di-no" type="text" name="CurrentIdentifier[id]" defaultValue={datahelpervalue.id} />
            <button className="kv-little-button" type="submit" name="CurrentIdentifier[action]" defaultValue="update">✓</button>
            <button onClick={() => Data.handleDelete(datahelpervalue.id)} className="kv-little-button" type="submit" name="CurrentIdentifier[action]" defaultValue="delete">×</button>



            {typeof datahelpervalue.content == "object" &&
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
            }


          </div>
          {typeof datahelpervalue.content == "object" ?
            <DataHelper
              datahelper={datahelpervalue.content}
              />
            :
            <ul className="kv-list-parent">
              <li>
                <div className="kv-item-container ">
                  <textarea className="kv-field-container kv-content-container kv-di-in" name="CurrentIdentifier[content]" rows="8" defaultValue={datahelpervalue.content}></textarea>
                </div>
              </li>
            </ul>
          }
        </li>
      ))}
    </ul>


  )
}
