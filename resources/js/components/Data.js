
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    data: [],
    submit: [],


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

    var data = this.state.data;

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
      9: 'conteent',
    };
    var result = this.submitDataHelper( data,Attr);
    // var result = this.state.data;
    // var result = sumbitter;
    // var result = 1;
    result = {content: result}
    this.setState({
      submit: result
    });
    var Data = this.state.submit;
    eval(sumbitter+"['content']=123321")
    result = JSON.stringify(Data, null, 2);

    alert(result);
    // alert(Data["content"][0]["content"][0]["content"][0]["content"]);
    // alert(sumbitter);


  }

  submitDataHelper(data, Attr)  {
    var result = Object.keys(data).map(function(keyName, i) {
      var result = {}
      result[Attr[0]] = data[keyName].name;
      result[Attr[1]] = data[keyName].type;
      result[Attr[4]] = data[keyName].id;
      result[Attr[3]] = "update/delete";
      if (typeof data[keyName].content === "object"){
        result[Attr[8]] = data[keyName].entity_type;
        result[Attr[6]]= {}
        result[Attr[6]]["folder"] = "?";
        result[Attr[6]]["file"] = "?";
        result[Attr[3]] = "create_folder"+"/"+"create_file";
        result[Attr[2]] = this.submitDataHelper( data[keyName].content,Attr);
      } else {
        result[Attr[2]] = data[keyName].content;
      }
      return result;
    }, this);
    return result;
  }

  // submitData(sumbitter){
  //   event.preventDefault();
  //
  //   var result = this.submitDataHelper( 1,1);
  //   result = JSON.stringify(result, null, 2);
  //   alert(result);
  //
  // }
  // submitDataHelper(data, Attr)  {
  //   var thing = [1,2]
  //   var result = thing.map(function(keyName, i) {
  //
  //     if (data==1) {
  //       return [this.submitDataHelper(0, 1)]
  //     } else {
  //       return 1;
  //     }
  //   }, this)
  //   return result;
  //
  // }


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
              <input className="kv-field-container kv-name kv-tog-on-ib" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[0]+"]"} defaultValue={datahelpervalues[keyName].name} ></input>
              <div className="kv-name-unedit kv-name kv-tog-off-ib ">{datahelpervalues[keyName].name}</div>
              <span className="kv-little-button ">^</span>
            </label>


            <input className="kv-di-no" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[1]+"]"} defaultValue={datahelpervalues[keyName].type} ></input>
            <input className="kv-di-no" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[4]+"]"} defaultValue={datahelpervalues[keyName].id} ></input>

            {typeof datahelpervalues[keyName].content == "object" &&
              <input className="kv-di-no" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[8]+"]"} defaultValue={datahelpervalues[keyName].entity_type} ></input>
            }


            <button onClick={(sumbitter) => {submit(identifier+"["+"'content'"+"]["+i+"]")}} className="kv-little-button" type="submit" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[3]+"]"} value="update">✓</button>
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
              change={(arg) => {submit(arg)}}
              submit={(sumbitter) => {submit(sumbitter)}}
              data={1}
              />

            :
            <ul className="kv-list-parent">
              <li>
                <div className="kv-item-container ">
                  <textarea onChange={(arg) => {change(event.target.value)}} className="kv-field-container kv-content-container kv-di-in" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[2]+"]"} rows="8" defaultValue={datahelpervalues[keyName].content}></textarea>
                </div>
              </li>
            </ul>
          }
        </li>
      ))}

    </ul>


  )
}
