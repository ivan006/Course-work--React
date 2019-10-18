// api consumer for recursive data
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    ShowData: [],
    ShowDecomDataChanges: [],
    ShowComprDataChanges: [],
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

    axios.get('https://test-c6f20.firebaseio.com/Reports/Report_1.json')
    .then(response => {
      var ShowData = response.data;
      this.setState({
        ShowData: response.data,
        loading:"loaded"
      });
      this.CreateDecomDataChanges(ShowData);

      // axios.put('https://test-c6f20.firebaseio.com/Reports/Report_3.json',this.state.ShowData)
      // .then(response => {
      //   this.setState({loading:"loaded"});
      // })
      // .catch(error => {
      //   this.setState({loading:"failed"});
      // });

    }).catch(error => {
      console.log(error);
      this.setState({loading:"failed"});
    });

    // axios.get('/api/show/Group_1')
    // .then(response => {
    //   this.setState({
    //     ShowData: response,
    //     loading:"loaded"
    //   });
    // })
    // .catch(error => {
    //   console.log(error);
    //   this.setState({loading:"failed"});
    // });

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


    // axios.put('https://test-c6f20.firebaseio.com/Reports/Report_3.json',this.state.ShowDecomDataChanges)
    // .then(response => {
    //   this.setState({loading:"loaded"});
    // })
    // .catch(error => {
    //   this.setState({loading:"failed"});
    // });



  }

  CreateDecomDataChanges(ShowData)  {
    var Attr = this.state.Attr;
    var result = {content: this.CreateDecomDataChangesHelper(ShowData,Attr)[0]};
    this.setState({
      ShowDecomDataChanges: result
    });

    return result;
  }

  CreateDecomDataChangesHelper(ShowData, Attr)  {
    var result = Object.keys(ShowData).map(function(keyName, i) {
      var result = {}
      result[ShowData[keyName].name] = {};

      result[ShowData[keyName].name][Attr[1]] = ShowData[keyName].type;

      result[ShowData[keyName].name][Attr[3]] = "update/delete";

      // result[ShowData[keyName].name][Attr[0]] = ShowData[keyName].name;
      // result[ShowData[keyName].name][Attr[4]] = ShowData[keyName].id;
      if (typeof ShowData[keyName].content === "object"){
        result[ShowData[keyName].name][Attr[2]] = this.CreateDecomDataChangesHelper( ShowData[keyName].content,Attr)[0];

        result[ShowData[keyName].name][Attr[6]]= {}
        // result[ShowData[keyName].name][Attr[6]]["folder"] = null;
        // result[ShowData[keyName].name][Attr[6]]["file"] = null;
        result[ShowData[keyName].name][Attr[6]]["folder"] = 0;
        result[ShowData[keyName].name][Attr[6]]["file"] = 0;
        result[ShowData[keyName].name][Attr[3]] = "create_folder"+"/"+"create_file";

        // result[ShowData[keyName].name][Attr[8]] = ShowData[keyName].entity_type;
      } else {
        result[ShowData[keyName].name][Attr[2]] = ShowData[keyName].content;
      }
      return result;
    }, this);
    return result;
  }

  UpdateDecomDataChanges (changerIdentifier,value){

    var ShowDecomDataChanges = this.state.ShowDecomDataChanges;
    eval(changerIdentifier+"=value");
    this.setState({
      ShowDecomDataChanges: ShowDecomDataChanges
    });

    var ShowDecomDataChanges = this.state.ShowDecomDataChanges;
    var DataString = JSON.stringify(ShowDecomDataChanges, null, 2);
    alert(DataString);

  }

  CreateComprDataChanges(){
    var ShowDecomDataChanges = this.state.ShowDecomDataChanges;

    var ShowComprDataChangesContent = {
      "Data": this.state.ShowComprDataChanges,
      "_token": "vcO9EvF6wZK0xEafB9Za7b43gO3Yhg56Lr6kB19D",
      "form": "data",
    }
    var UrlSuffix = "";
    this.setState({
      ShowComprDataChanges: {
        "Content": ShowComprDataChangesContent,
        "UrlSuffix": UrlSuffix
      }
    });
  }
  CreateComprDataChangesHelper(){

  }

  SendDataChanges(submitterIdentifier){
    event.preventDefault();

    var ShowDecomDataChanges = this.state.ShowDecomDataChanges;
    eval(submitterIdentifier+"['action']='update'");
    this.setState({
      ShowDecomDataChanges: ShowDecomDataChanges
    });



    var Content = this.state.ShowComprDataChanges.Content;
    var UrlSuffix = this.state.ShowComprDataChanges.UrlSuffix;
    axios.post('/store/Group_1'+UrlSuffix, Content)
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
          <pre>{JSON.stringify(this.state.ShowDecomDataChanges, null, 2) }</pre>

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
    //           identifier="ShowDecomDataChanges"
    //           Attr={this.state.Attr}
    //           ShowData={this.state.ShowData.content}
    //           UpdateDecomDataChanges={(changerIdentifier,value) => this.UpdateDecomDataChanges(changerIdentifier,value)}
    //           submit={(submitterIdentifier) => this.SendDataChanges(submitterIdentifier)}
    //           />
    //       </form>
    //     }
    //   </div>
    // );


  }
}







// Recursive component
const DataHelper = ({ identifier,Attr, ShowData, UpdateDecomDataChanges, submit}) => {

  // var ShowData = Object.values(ShowData);
  // alert(JSON.stringify(ShowData));
  // {JSON.stringify(ShowData.content)}



  return (
    <ul className="kv-list-parent">
      {typeof ShowData !== 'undefined' && Object.keys(ShowData).map((keyName, i) => (

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
              <input className="kv-field-container kv-name kv-tog-on-ib" type="text" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[0]+"]"} defaultValue={keyName} ></input>
              <div className="kv-name-unedit kv-name kv-tog-off-ib ">{keyName}</div>
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
              UpdateDecomDataChanges={(changerIdentifier,value) => {UpdateDecomDataChanges(changerIdentifier,value)}}
              submit={(submitterIdentifier) => {submit(submitterIdentifier)}}
              />

            :
            <ul className="kv-list-parent">
              <li>
                <div className="kv-item-container ">
                  <textarea onChange={(changerIdentifier,value) => {UpdateDecomDataChanges(identifier+"["+"'content'"+"]["+i+"]['"+Attr[2]+"']",event.target.value)}} className="kv-field-container kv-content-container kv-di-in" name={identifier+"["+"'content'"+"]["+i+"]["+Attr[2]+"]"} rows="8" defaultValue={ShowData[keyName].content}></textarea>
                </div>
              </li>
            </ul>
          }
        </li>
      ))}

    </ul>


  )
}
