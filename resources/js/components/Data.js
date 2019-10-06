
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    data: [],
    SubmittableData: [],
    Attr: {
      0: 'name',
      1: 'type',
      2: 'content',
      3: 'action',
      4: 'id',
      5: 'subtype',
      6: 'add',
      7: 'url',
      8: 'entity_type',
      9: 'conteent',
    },

  };
  componentDidMount () {
    this.readData();
  }
  readData(){
    axios.get('/api/show/Group_1')
    .then(response => {
      var data = response.data.content;
      var Attr = this.state.Attr;
      var SubmittableData = {content: this.setSubmittableDataHelper( data,Attr)}
      this.setState({
        data: data,
        SubmittableData: SubmittableData
      });
    });

  }

  writeData(submitterIdentifier){
    event.preventDefault();


    // var Data = this.state.SubmittableData;
    // var result = JSON.stringify(Data, null, 2);
    //
    // // alert(result);
    // alert(submitterIdentifier);


    var Data = this.state.SubmittableData;
    eval(submitterIdentifier+"['action']='update'");
    var Post = {
      "Data":Data,
      "_token": "vcO9EvF6wZK0xEafB9Za7b43gO3Yhg56Lr6kB19D",
      "form": "data",

    }


    axios.post('/store/Group_1', Post)
    .then(function (response) {
      this.readData();
    });
  }


  // writeData(submitterIdentifier){
  //
  //
  // }

  setSubmittableDataHelper(data, Attr)  {
    var result = Object.keys(data).map(function(keyName, i) {
      var result = {}
      result[Attr[0]] = data[keyName].name;
      result[Attr[1]] = data[keyName].type;
      result[Attr[4]] = data[keyName].id;
      // result[Attr[3]] = "update/delete";
      if (typeof data[keyName].content === "object"){
        result[Attr[8]] = data[keyName].entity_type;
        result[Attr[6]]= {}
        result[Attr[6]]["folder"] = null;
        result[Attr[6]]["file"] = null;
        // result[Attr[3]] = "create_folder"+"/"+"create_file";
        result[Attr[2]] = this.setSubmittableDataHelper( data[keyName].content,Attr);
      } else {
        result[Attr[2]] = data[keyName].content;
      }
      return result;
    }, this);
    return result;
  }



  changeSubmittableData (changerIdentifier,value){

    var Data = this.state.SubmittableData;
    eval(changerIdentifier+"=value");
    this.setState({
      SubmittableData: Data
    });

    var Data = this.state.SubmittableData;
    var DataString = JSON.stringify(Data, null, 2);
    alert(DataString);

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
            changeSubmittableData={(changerIdentifier,value) => this.changeSubmittableData(changerIdentifier,value)}
            submit={(submitterIdentifier) => this.writeData(submitterIdentifier)}
            data={this.state.data}
            />
        </form>
      </div>

    );
  }
}







// Recursive component
const DataHelper = ({ identifier, datahelper, changeSubmittableData, submit,data}) => {

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
              <input className="kv-field-container kv-name kv-tog-on-ib" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[0]+"]"} defaultValue={datahelpervalues[keyName].name} ></input>
              <div className="kv-name-unedit kv-name kv-tog-off-ib ">{datahelpervalues[keyName].name}</div>
              <span className="kv-little-button ">^</span>
            </label>


            <input className="kv-di-no" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[1]+"]"} defaultValue={datahelpervalues[keyName].type} ></input>
            <input className="kv-di-no" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[4]+"]"} defaultValue={datahelpervalues[keyName].id} ></input>

            {typeof datahelpervalues[keyName].content == "object" &&
              <input className="kv-di-no" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[8]+"]"} defaultValue={datahelpervalues[keyName].entity_type} ></input>
            }


            <button onClick={(submitterIdentifier) => {submit(identifier+"["+"'content'"+"]["+i+"]")}} className="kv-little-button" type="submit" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[3]+"]"} value="update">✓</button>
            <button className="kv-little-button" type="submit" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[3]+"]"} value="delete">×</button>



            {typeof datahelpervalues[keyName].content == "object" &&
              <label className="kv-po-re">
                <span className="kv-little-button ">+</span>
                <input className="kv-tog-on-bl-switch" type="checkbox" name="checkbox" defaultValue="value" ></input>
                <div className="kv-popover kv-tog-on-bl kv-item-container  kv-di-in" >
                  <div className="" >
                    <span>📁</span>
                    <input className="kv-field-container kv-name kv-di-in "  type="text"   name={identifier+"["+"'content'"+"]["+i+"]["+Attr[6]+"][folder]"}  ></input>
                    <button type="submit" className="kv-little-button" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[3]+"]"} value="create_folder">+</button>
                  </div>
                  <div className="kv-mar-top-3">
                    <span>📃</span>
                    <input className="kv-field-container kv-name kv-di-in"  type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[6]+"][file]"} ></input>
                    <button type="submit" className="kv-little-button" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[3]+"]"} value="create_file">+</button>
                  </div>
                </div>
              </label>
            }


          </div>
          {typeof datahelpervalues[keyName].content == "object" ?

            <DataHelper
              identifier= {identifier+"["+"'content'"+"]["+i+"]"}
              datahelper={datahelpervalues[keyName].content}
              changeSubmittableData={(changerIdentifier,value) => {changeSubmittableData(changerIdentifier,value)}}
              submit={(submitterIdentifier) => {submit(submitterIdentifier)}}
              data={1}
              />

            :
            <ul className="kv-list-parent">
              <li>
                <div className="kv-item-container ">
                  <textarea onChange={(changerIdentifier,value) => {changeSubmittableData(identifier+"["+"'content'"+"]["+i+"]['"+Attr[2]+"']",event.target.value)}} className="kv-field-container kv-content-container kv-di-in" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[2]+"]"} rows="8" defaultValue={datahelpervalues[keyName].content}></textarea>
                </div>
              </li>
            </ul>
          }
        </li>
      ))}

    </ul>


  )
}
