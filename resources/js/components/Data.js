
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

  // handleDelete (id) {
  //   const isNotId = task => task.id !== id;
  //   const updatedTasks = this.state.data.filter(isNotId);
  //   this.setState({data:updatedTasks})
  //   alert(1);
  // }

  render() {

    return (
      <div>
        <form  id="form" enctype="multipart/form-data" name="" class="" action="http://react.test/store/Group_1" method="post">
          <input type="hidden" name="_token" value="6Xj6QCZ5YNBl9LpZXAHEZ14YdZu2eS9tfDTb7UFs" ></input>
          <input className="kv-di-no" type="text" name="form" value="data"></input>
            <br></br>
            <h2>Data</h2>
            <DataHelper
              identifier="Data"
              datahelper={this.state.data}
              onChange={(data) => this.setState({data})}
              data={this.state.data}
              />
          </form>
      </div>

    );
  }
}







// Recursive component
const DataHelper = ({ identifier, datahelper, onChange,data}) => {

  var datahelpervalues = datahelper;
  // var datahelpervalues = Object.values(datahelper);
  // alert(JSON.stringify(datahelpervalues));
  // {JSON.stringify(datahelpervalues.content)}

  var Attr = {
    '0': 'name',
    '1': 'type',
    '2': 'content',
    '3': 'action',
    '4': 'id',
    '5': 'subtype',
    '6': 'add',
    '7': 'url',
    '8': 'entity_type',
  };
  const handleDelete = (id) => {

      // const isNotId = task => task.id !== id;
      // const updatedTasks = data.filter(isNotId);
      const updatedData = 1;
      onChange(updatedData);
  }
  // var CurrentIdentifier = identifier+"["+"content"+"]["+i+"]";
  return (
    <ul className="kv-list-parent">
      {Object.keys(datahelpervalues).map((keyName, i) => (

          <li key={datahelpervalues[keyName].id}>


            <div className="kv-item-container  kv-di-in ">
              {/* Base Casfe */}
              {typeof datahelpervalues[keyName].content == "object" ?
                <div className="kv-di-in">📁</div>
                :
                <div className="kv-di-in">📃</div>
              }

              <label >
                <input className="kv-tog-on-ib-switch kv-tog-off-ib-switch" type="checkbox" name="checkbox" defaultValue="value" ></input>
                <input className="kv-field-container kv-name kv-tog-on-ib" type="text" name={identifier+"["+"content"+"]["+i+"]["+Attr[0]+"]"} defaultValue={datahelpervalues[keyName].name} ></input>
                <div className="kv-name-unedit kv-name kv-tog-off-ib ">{datahelpervalues[keyName].name}</div>
                <span className="kv-little-button ">^</span>
              </label>


              <input className="kv-di-no" type="text" name={identifier+"["+"content"+"]["+i+"]["+Attr[1]+"]"} defaultValue={datahelpervalues[keyName].type} ></input>
              <input className="kv-di-no" type="text" name={identifier+"["+"content"+"]["+i+"]["+Attr[4]+"]"} defaultValue={datahelpervalues[keyName].id} ></input>
              <input className="kv-di-no" type="text" name={identifier+"["+"content"+"]["+i+"]["+Attr[8]+"]"} defaultValue={datahelpervalues[keyName].entity_type} ></input>
              <button className="kv-little-button" type="submit" name={identifier+"["+"content"+"]["+i+"]["+Attr[3]+"]"} value="update">✓</button>
              <button onClick={() => handleDelete(datahelpervalues[keyName].id)} className="kv-little-button" type="submit" name={identifier+"["+"content"+"]["+i+"]["+Attr[3]+"]"} defaultValue="delete">×</button>



              {typeof datahelpervalues[keyName].content == "object" &&
                <label className="kv-po-re">
                  <span className="kv-little-button ">+</span>
                  <input className="kv-tog-on-bl-switch" type="checkbox" name="checkbox" defaultValue="value" ></input>
                  <div className="kv-popover kv-tog-on-bl kv-item-container  kv-di-in" >
                    <div className="" >
                      <span>📁</span>
                      <input className="kv-field-container kv-name kv-di-in "  type="text"   name={identifier+"["+"content"+"]["+i+"]["+Attr[6]+"][folder]"}  ></input>
                      <button type="submit" className="kv-little-button" name={identifier+"["+"content"+"]["+i+"]["+Attr[3]+"]"} defaultValue="create_folder">+</button>
                    </div>
                    <div className="kv-mar-top-3">
                      <span>📃</span>
                      <input className="kv-field-container kv-name kv-di-in"  type="text" name={identifier+"["+"content"+"]["+i+"]["+Attr[6]+"][file]"} ></input>
                      <button type="submit" className="kv-little-button" name={identifier+"["+"content"+"]["+i+"]["+Attr[3]+"]"} defaultValue="create_folder">+</button>
                    </div>
                  </div>
                </label>
              }


            </div>
            {typeof datahelpervalues[keyName].content == "object" ?

              <DataHelper
                identifier= {identifier+"["+"content"+"]["+i+"]"}
                datahelper={datahelpervalues[keyName].content}
                onChange={1}
                data={1}
                />

              :
              <ul className="kv-list-parent">
                <li>
                  <div className="kv-item-container ">
                    <textarea className="kv-field-container kv-content-container kv-di-in" name={identifier+"["+"content"+"]["+i+"]["+Attr[2]+"]"} rows="8" defaultValue={datahelpervalues[keyName].content}></textarea>
                  </div>
                </li>
              </ul>
            }
          </li>
      ))}

    </ul>


  )
}
