
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    data: [],


  };
  componentDidMount () {
    this.data();
  }
  data(){
    axios.get('/api/show/Group_1')
    .then(response => {
      this.setState({
        data: response.data.content
      });
    });

  }

  submitData(){
    event.preventDefault();

    var thing = submitDataHelper( 1,this.state.data,1,1,1);
    // var thing = 1;
    alert(thing);
  }

  submitDataHelper( identifier, datahelper, submit, registerAChange,data)  {

    var datahelpervalues = datahelper;

    var Attr = {
      0: 'name',
      1: 'type',
      2: 'content',
      3: 'action',
      4: 'id',
      5: 'subtype',
      6: 'add',
      7: 'url',
      8: 'entity_type',
    };
    var Attr0 = Attr[0];
    var Attr1 = Attr[1];
    var Attr2 = Attr[2];
    var Attr3 = Attr[3];
    var Attr4 = Attr[4];
    var Attr5 = Attr[5];
    var Attr6 = Attr[6];
    var Attr7 = Attr[7];
    var Attr8 = Attr[8];

    var result = Object.keys(datahelpervalues).map(function(keyName, i) {
      var thing = {
        "content": {
          i: {
            "Attr[0]": datahelpervalues[keyName].name,
            "Attr[1]": datahelpervalues[keyName].type,
            "Attr[4]": datahelpervalues[keyName].id,
            "Attr[3]": "update/delete",
          }
        }
      }
      return thing;

      if (typeof value === "object"){
        var thing = {
          "content": {
            i: {


              "Attr[8]": datahelpervalues[keyName].entity_type,
              "Attr[6]": {
                "folder": "?",
                "file": "?",
              },
              "Attr[3]": "create_folder"+"/"+"create_file",
              "Attr[8]": datahelpervalues[keyName].entity_type,
              "Attr[2]": 1,
              // "Attr[2]": submitDataHelper( identifier["content"][i], datahelpervalues[keyName].content, 0, () => registerADeepChange(datahelpervalues[keyName].name),1),
            }
          }
        }
        return thing;
      } else {
        var thing = {
          "content": {
            i: {
              "Attr[2]": datahelpervalues[keyName].content
            }
          }
        }
        return thing;
      }

    });

    return result;
  }

  hello (){

      event.preventDefault();
    alert("hello2");
  }


  // handleDelete (id) {
  //   const isNotId = task => task.id !== id;
  //   const updatedTasks = this.state.data.filter(isNotId);
  //   this.setState({data:updatedTasks})
  //   alert(1);
  // }

  // handleSubmit(event){
  //
  //   alert(5);
  // }

  render() {

    return (
      <div>
        <form >


          <input type="hidden" name="_token" defaultValue="npSVkUIOsNL20SlLcSZeGJGBnmGSGE13wJMvXhqb" ></input>
          <input className="kv-di-no" type="text" name="form" defaultValue="data"></input>
          <br></br>
          <h2>JS Data</h2>
          <DataHelper
            identifier="Data"
            datahelper={this.state.data}
            oldSubmit={() => this.hello()}
            registerAChange={() => this.submitData()}
            data={this.state.data}
            />
        </form>
      </div>

    );
  }
}







// Recursive component
const DataHelper = ({ identifier, datahelper, oldSubmit, registerAChange,data}) => {

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
  // const handleDelete = (id) => {
  //
  //   // const isNotId = task => task.id !== id;
  //   // const updatedTasks = data.filter(isNotId);
  //   const updatedData = 1;
  //   registerAChange(updatedData);
  // }
  // const handleSubmit = (event) => {
  //
  //   // event.preventDefault();
  //   // var name = event.target.name;
  //   // var value = event.target.name;
  //   // this.setState.dato({
  //   //   [name]: value
  //   // });
  //   alert(10);
  // }

  // const registerAShallowChange = (name,event) => {
  //   event.preventDefault();
  //   // // is currently selected
  //   // if(selectedOptions[selectedOptionId]){
  //   //   // remove selected key from options list
  //   //   delete selectedOptions[selectedOptionId];
  //   // } else { // is not currently selected
  //   //   // Add selected key to optionsList
  //   //   selectedOptions[selectedOptionId] = {}
  //   // }
  //   // // call registerAChange function given by parent
  //
  //   registerAChange(name);
  //   alert("register a shallow change done to "+name);
  // }
  //
  // const registerADeepChange = (name) => {
  //   // // add sub selections to current optionId
  //   // selectedOptions[optionId] = subSelections;
  //   // // call registerAChange function given by parent
  //   // registerAChange(selectedOptions);
  //
  //   registerAChange(name);
  //   alert("register a deep change done to "+name);
  // }

  // const registerAChange = (event) => {
  //   registerAChange(name);
  //   // alert(event.target.name);
  //   hello();
  //
  //   submit();
  //
  // }
  //
  // const hello = () => {
  //   alert("hello");
  // }


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

            {typeof datahelpervalues[keyName].content == "object" &&
              <input className="kv-di-no" type="text" name={identifier+"["+"content"+"]["+i+"]["+Attr[8]+"]"} defaultValue={datahelpervalues[keyName].entity_type} ></input>
            }


            <button onClick={() => {registerAChange(event)}} className="kv-little-button" type="submit" name={identifier+"["+"content"+"]["+i+"]["+Attr[3]+"]"} value="update">✓</button>
            <button className="kv-little-button" type="submit" name={identifier+"["+"content"+"]["+i+"]["+Attr[3]+"]"} value="delete">×</button>



            {typeof datahelpervalues[keyName].content == "object" &&
              <label className="kv-po-re">
                <span className="kv-little-button ">+</span>
                <input className="kv-tog-on-bl-switch" type="checkbox" name="checkbox" defaultValue="value" ></input>
                <div className="kv-popover kv-tog-on-bl kv-item-container  kv-di-in" >
                  <div className="" >
                    <span>📁</span>
                    <input className="kv-field-container kv-name kv-di-in "  type="text"   name={identifier+"["+"content"+"]["+i+"]["+Attr[6]+"][folder]"}  ></input>
                    <button type="submit" className="kv-little-button" name={identifier+"["+"content"+"]["+i+"]["+Attr[3]+"]"} value="create_folder">+</button>
                  </div>
                  <div className="kv-mar-top-3">
                    <span>📃</span>
                    <input className="kv-field-container kv-name kv-di-in"  type="text" name={identifier+"["+"content"+"]["+i+"]["+Attr[6]+"][file]"} ></input>
                    <button type="submit" className="kv-little-button" name={identifier+"["+"content"+"]["+i+"]["+Attr[3]+"]"} value="create_file">+</button>
                  </div>
                </div>
              </label>
            }


          </div>
          {typeof datahelpervalues[keyName].content == "object" ?

            <DataHelper
              identifier= {identifier+"["+"content"+"]["+i+"]"}
              datahelper={datahelpervalues[keyName].content}
              registerAChange={() => {registerAChange(event)}}
              data={1}
              />

            :
            <ul className="kv-list-parent">
              <li>
                <div className="kv-item-container ">
                  <textarea className="kv-field-container kv-content-container kv-di-in" name={identifier+"["+"content"+"]["+i+"]["+Attr[2]+"]"} rows="8" defaultValue={datahelpervalues[keyName].content} onChange={() => {alert(1)}}></textarea>
                </div>
              </li>
            </ul>
          }
        </li>
      ))}

    </ul>


  )
}
