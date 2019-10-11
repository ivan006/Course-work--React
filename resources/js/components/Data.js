// api consumer for recursive data
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    ShowData: [],
    ShowDataChanges: [],
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
    loading: "loaded",

  };
  componentDidMount () {
    this.GetAllData();
  }

  GetAllData(){

    this.setState({loading:"loading"});

    axios.get('/api/show/Group_1')
    .then(response => {
      var ShowData = response.data.content;
      this.setState({
        ShowData: response.data.content,
        loading:"loaded"
      });
      this.CreateDataChanges(ShowData);

    }).catch(error => {
      console.log(error);
      this.setState({loading:"failed"});
    });


    // axios.get('https://test-c6f20.firebaseio.com/Reports/Report_1.json')
    // .then(response => {
    //   this.setState({
    //     ShowData: response,
    //     loading:"loaded"
    //   });
    // })
    // .catch(error => {
    //   this.setState({loading:"failed"});
    // });


    // axios.put('https://test-c6f20.firebaseio.com/Reports/Report_1.json',[1])
    // .then(response => {
    //   this.setState({loading:"loaded"});
    // })
    // .catch(error => {
    //   this.setState({loading:"failed"});
    // });



  }

  CreateDataChanges(ShowData)  {
    var Attr = this.state.Attr;
    var result = {content: this.CreateDataChangesHelper(ShowData,Attr)[0]};
    this.setState({
      ShowDataChanges: result
    });

    return result;
  }

  CreateDataChangesHelper(ShowData, Attr)  {
    var result = Object.keys(ShowData).map(function(keyName, i) {
      var result = {}
      result[ShowData[keyName].name] = {};

      result[ShowData[keyName].name][Attr[1]] = ShowData[keyName].type;

      result[Attr[3]] = "update/delete";

      // result[ShowData[keyName].name][Attr[0]] = ShowData[keyName].name;
      // result[ShowData[keyName].name][Attr[4]] = ShowData[keyName].id;
      if (typeof ShowData[keyName].content === "object"){
        result[ShowData[keyName].name][Attr[2]] = this.CreateDataChangesHelper( ShowData[keyName].content,Attr)[0];

        result[ShowData[keyName].name][Attr[6]]= {}
        result[ShowData[keyName].name][Attr[6]]["folder"] = null;
        result[ShowData[keyName].name][Attr[6]]["file"] = null;
        result[ShowData[keyName].name][Attr[3]] = "create_folder"+"/"+"create_file";

        // result[ShowData[keyName].name][Attr[8]] = ShowData[keyName].entity_type;
      } else {
        result[ShowData[keyName].name][Attr[2]] = ShowData[keyName].content;
      }
      return result;
    }, this);
    return result;
  }

  UpdateDataChanges (changerIdentifier,value){

    var ShowDataChanges = this.state.ShowDataChanges;
    eval(changerIdentifier+"=value");
    this.setState({
      ShowDataChanges: ShowDataChanges
    });

    var ShowDataChanges = this.state.ShowDataChanges;
    var DataString = JSON.stringify(ShowDataChanges, null, 2);
    alert(DataString);

  }

  SendDataChanges(submitterIdentifier){
    event.preventDefault();
    var ShowDataChanges = this.state.ShowDataChanges;
    eval(submitterIdentifier+"['action']='update'");
    var Post = {
      "Data":ShowDataChanges,
      "_token": "vcO9EvF6wZK0xEafB9Za7b43gO3Yhg56Lr6kB19D",
      "form": "data",

    }
    axios.post('/store/Group_1', Post)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    // axios.post('/store/Group_1', Post)
    // .then(function (response) {
    //   this.GetAllData();
    // });
  }

  render() {

    return (
      <div>

        {this.state.loading == "loading" ?
          <div style={{fontSize: "100px", textAlign: "center"}}>
            ⌛
          </div>
          : this.state.loading == "failed" ?
          <div style={{fontSize: "100px", textAlign: "center"}}>
            ⚠
          </div>
          :
          <pre>{JSON.stringify(this.state.ShowDataChanges, null, 2) }</pre>

        }
      </div>

    );

    // return (
    //   <div>
    //     {this.state.loading == "loading" ?
    //       <div style={{fontSize: "100px", textAlign: "center"}}>
    //         ⌛
    //       </div>
    //       : this.state.loading == "failed" ?
    //       <div style={{fontSize: "100px", textAlign: "center"}}>
    //         ⚠
    //       </div>
    //       :
    //       <form >
    //
    //         <input type="hidden" name="_token" defaultValue="npSVkUIOsNL20SlLcSZeGJGBnmGSGE13wJMvXhqb" ></input>
    //         <input className="kv-di-no" type="text" name="form" defaultValue="data"></input>
    //         <br></br>
    //         <h2>JS Data</h2>
    //         <DataHelper
    //           identifier="ShowDataChanges"
    //           Attr={this.state.Attr}
    //           ShowData={this.state.ShowData}
    //           UpdateDataChanges={(changerIdentifier,value) => this.UpdateDataChanges(changerIdentifier,value)}
    //           submit={(submitterIdentifier) => this.SendDataChanges(submitterIdentifier)}
    //           />
    //       </form>
    //     }
    //   </div>
    //
    // );
  }
}







// Recursive component
const DataHelper = ({ identifier,Attr, ShowData, UpdateDataChanges, submit}) => {

  // var ShowData = Object.values(ShowData);
  // alert(JSON.stringify(ShowData));
  // {JSON.stringify(ShowData.content)}



  return (
    <ul className="kv-list-parent">
      {Object.keys(ShowData).map((keyName, i) => (

        <li key={ShowData[keyName].id}>


          <div className="kv-item-container  kv-di-in ">
            {/* Base Casfe */}
            {typeof ShowData[keyName].content == "object" ?
              <div className="kv-di-in">📁</div>
              :
              <div className="kv-di-in">📃</div>
            }

            <label >
              <input className="kv-tog-on-ib-switch kv-tog-off-ib-switch" type="checkbox" name="checkbox" defaultValue="value" ></input>
              <input className="kv-field-container kv-name kv-tog-on-ib" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[0]+"]"} defaultValue={ShowData[keyName].name} ></input>
              <div className="kv-name-unedit kv-name kv-tog-off-ib ">{ShowData[keyName].name}</div>
              <span className="kv-little-button ">^</span>
            </label>


            <input className="kv-di-no" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[1]+"]"} defaultValue={ShowData[keyName].type} ></input>
            <input className="kv-di-no" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[4]+"]"} defaultValue={ShowData[keyName].id} ></input>

            {typeof ShowData[keyName].content == "object" &&
              <input className="kv-di-no" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[8]+"]"} defaultValue={ShowData[keyName].entity_type} ></input>
            }


            <button onClick={(submitterIdentifier) => {submit(identifier+"["+"'content'"+"]["+i+"]")}} className="kv-little-button" type="submit" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[3]+"]"} value="update">✓</button>
            <button className="kv-little-button" type="submit" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[3]+"]"} value="delete">×</button>



            {typeof ShowData[keyName].content == "object" &&
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
          {typeof ShowData[keyName].content == "object" ?

            <DataHelper
              identifier= {identifier+"["+"'content'"+"]["+i+"]"}
              Attr= {Attr}
              ShowData={ShowData[keyName].content}
              UpdateDataChanges={(changerIdentifier,value) => {UpdateDataChanges(changerIdentifier,value)}}
              submit={(submitterIdentifier) => {submit(submitterIdentifier)}}
              />

            :
            <ul className="kv-list-parent">
              <li>
                <div className="kv-item-container ">
                  <textarea onChange={(changerIdentifier,value) => {UpdateDataChanges(identifier+"["+"'content'"+"]["+i+"]['"+Attr[2]+"']",event.target.value)}} className="kv-field-container kv-content-container kv-di-in" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[2]+"]"} rows="8" defaultValue={ShowData[keyName].content}></textarea>
                </div>
              </li>
            </ul>
          }
        </li>
      ))}

    </ul>


  )
}
