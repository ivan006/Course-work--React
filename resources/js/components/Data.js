
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

  submitData(sumbitter){
    event.preventDefault();

    var thing = this.submitDataHelper( 1,this.state.data,1,1,1);
    // var thing = this.state.data;
    // var thing = sumbitter;
    // var thing = 1;

    thing = JSON.stringify(thing, null, 2);
    alert(thing);
  }

  submitDataHelper( identifier, datahelper, oldSubmit, submit,data)  {

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



    var result = Object.keys(datahelpervalues).map(function(keyName, i) {


      if (typeof value === "object"){
        var thing = {
          content: {
            [i]: {
              [Attr[0]]: datahelpervalues[keyName].name,
              [Attr[1]]: datahelpervalues[keyName].type,
              [Attr[4]]: datahelpervalues[keyName].id,
              [Attr[3]]: "update/delete",



              [Attr[8]]: datahelpervalues[keyName].entity_type,
              [Attr[6]]: {
                folder: "?",
                file: "?",
              },
              [Attr[3]]: "create_folder"+"/"+"create_file",
              [Attr[8]]: datahelpervalues[keyName].entity_type,
              // [Attr[2]]: 1,
              [Attr[2]]: this.submitDataHelper( identifier["content"][i], datahelpervalues[keyName].content, 0, () => registerADeepChange(datahelpervalues[keyName].name),1),
            }
          }
        }
        return thing;
      } else {
        var thing = {
          content: {
            [i]: {
              [Attr[0]]: datahelpervalues[keyName].name,
              [Attr[1]]: datahelpervalues[keyName].type,
              [Attr[4]]: datahelpervalues[keyName].id,
              [Attr[3]]: "update/delete",


              [Attr[2]]: datahelpervalues[keyName].content
            }
          }
        }
        return thing;
      }

    });

    return result;
  }

  hello (arg){

      // event.preventDefault();
    alert(arg);
  }



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
            change={(arg) => this.hello(arg)}
            submit={(sumbitter) => this.submitData(sumbitter)}
            data={this.state.data}
            />
        </form>
      </div>

    );
  }
}







// Recursive component
const DataHelper = ({ identifier, datahelper, change, submit,data}) => {

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


            <button onClick={(sumbitter) => {submit(datahelpervalues[keyName].name)}} className="kv-little-button" type="submit" name={identifier+"["+"content"+"]["+i+"]["+Attr[3]+"]"} value="update">✓</button>
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
              change={(arg) => {submit(arg)}}
              submit={(sumbitter) => {submit(sumbitter)}}
              data={1}
              />

            :
            <ul className="kv-list-parent">
              <li>
                <div className="kv-item-container ">
                  <textarea onChange={(arg) => {change(event.target.value)}} className="kv-field-container kv-content-container kv-di-in" name={identifier+"["+"content"+"]["+i+"]["+Attr[2]+"]"} rows="8" defaultValue={datahelpervalues[keyName].content}></textarea>
                </div>
              </li>
            </ul>
          }
        </li>
      ))}

    </ul>


  )
}
