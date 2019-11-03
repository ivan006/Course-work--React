// api consumer for recursive data
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


export default class Data extends Component {
  state = {
    Data: [],
    Changes: [],
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
      10: 'oldname',
    },
    loading: "loaded",

  };

  componentDidMount () {

    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };


    // --------
    // online start
    // --------
    this.setState({loading:"loading"});

    axios.get('https://test-c6f20.firebaseio.com/Reports/Report_1.json')
    .then(response => {
      var Data = response.data;
      var Changes = this.Changes(Data);
      var loading = "loaded";
      this.setState({
        Data: Data,
        Changes: Changes,
        loading:loading
      });
    }).catch(error => {
      console.log(error);
      this.setState({loading:"failed"});
    });
    // --------
    // online end
    // --------

    // --------
    // offline start
    // --------
    // var Data = {
    //   "content": {
    //     "_data": {
    //       "content": {
    //         "code": {
    //           "content": {
    //             "w3css": {
    //               "content": "123",
    //               "type": "file"
    //             },
    //             "w3cssd": {
    //               "content": "123",
    //               "type": "file"
    //             }
    //           },
    //           "type": "folder"
    //         }
    //       },
    //       "type": "folder"
    //     }
    //   }
    // };
    // var Changes = this.Changes(Data);
    // var loading = "failed";
    //
    // this.setState({
    //   Data: Data,
    //   Changes: Changes,
    //   loading:loading
    // });

    // --------
    // offline end
    // --------





  }

  Changes(Data)  {
    this.ChangesHelper = function(Data, Attr)  {

      var result = {};

      Object.keys(Data).forEach(function(keyName){

        result[keyName] = {};

        if (Data[keyName].type == "folder"){

          result[keyName][Attr[2]] = this.ChangesHelper( Data[keyName].content,Attr);
          result[keyName][Attr[6]]= {}

        } else {
          result[keyName][Attr[2]] = Data[keyName].content;
        }
        result[keyName][Attr[1]] = Data[keyName].type;
      }, this);



      return result;
    }
    var Attr = this.state.Attr;
    var result = {content: this.ChangesHelper(Data.content,Attr)};

    return result;
  }

  Data(Changes)  {
    this.DataHelper = function(Changes, Attr)  {

      var result = {};

      Object.keys(Changes).forEach(function(keyName){


        // result[keyName][Attr[3]] = "update/delete";
        if (Changes[keyName] !== null) {
          result[keyName] = {};

          if (Changes[keyName].type == "folder"){

            result[keyName][Attr[2]] = this.DataHelper( Changes[keyName].content,Attr);
            // result[keyName][Attr[6]]= {}

            // result[keyName][Attr[6]]["folder"] = null;
            // result[keyName][Attr[6]]["file"] = null;
            // result[keyName][Attr[3]] = "create_folder"+"/"+"create_file";

          } else {
            result[keyName][Attr[2]] = Changes[keyName].content;
          }
          result[keyName][Attr[1]] = Changes[keyName].type;
        }
      }, this);



      return result;
    }
    var Attr = this.state.Attr;
    var result = {content: this.DataHelper(Changes.content,Attr)};

    return result;
  }

  ChangeCreate(IdentifierStart,IdentifierEnd,value){
  }

  ChangeUpdateContents(Identifier,value){

    var Changes = this.state.Changes;
    eval(Identifier+"=value");
    var Data = this.Data(Changes);
    this.setState({
      Changes: Changes,
      Data: Data
    });
  }

  ChangeUpdateName(IdentifierStart,IdentifierEnd,value){
    var Identifier = IdentifierStart+IdentifierEnd;

    var Changes = this.state.Changes;

    var SubjectSelector = Identifier;
    SubjectSelector = SubjectSelector.replaceAll("\\['", ".");
    SubjectSelector = SubjectSelector.replaceAll("\\']", "");
    var branch = eval(Identifier);

    var oldname = IdentifierEnd;
    oldname = oldname.replaceAll("\\['", "");
    oldname = oldname.replaceAll("\\']", "");

    var Attr = this.state.Attr;
    branch[Attr[10]] = oldname;

    // eval(Identifier+"= null");
    eval("delete "+Identifier);
    eval(IdentifierStart+"['"+value+"']=branch");
    var Data = this.Data(Changes);
    this.setState({
      Changes: Changes,
      Data: Data
    });



  }

  ChangeDelete(IdentifierStart,IdentifierEnd,value){
  }

  SendChanges(IdentifierStart,IdentifierEnd){
    this.SendChangesHelper = function(IdentifierStart,IdentifierEnd){
      var Changes = this.state.Changes;
      // eval(IdentifierStart,IdentifierEnd+"['action']='update'");
      var Identifier = IdentifierStart+IdentifierEnd;

      var branch = eval(Identifier);

      var UrlMiddle = IdentifierStart;
      UrlMiddle = UrlMiddle.replaceAll("\\['", "/");
      UrlMiddle = UrlMiddle.replaceAll("'\\]", "");
      UrlMiddle = UrlMiddle.replace("Changes", "");


      var UrlEnd = IdentifierEnd;
      UrlEnd = UrlEnd.replaceAll("\\['", "/");
      UrlEnd = UrlEnd.replaceAll("'\\]", "");

      var Attr = this.state.Attr;
      if (typeof branch[Attr[10]] !== 'undefined') {
        var OldName = branch[Attr[10]]
        delete branch[Attr[10]];
      } else {
        var OldName = null
      }
      return {
        UrlMiddle:UrlMiddle,
        UrlEnd:UrlEnd,
        Content:branch,
        OldName:OldName
      };

      // var Changes = this.state.Changes;
      //
      // var branchContent = {
      //   "Data": this.state.branch,
      //   "_token": "vcO9EvF6wZK0xEafB9Za7b43gO3Yhg56Lr6kB19D",
      //   "form": "data",
      // }
      // // var UrlSuffix = "";
      // this.setState({
      //   branch: {
      //     "Content": branchContent,
      //     // "UrlSuffix": UrlSuffix
      //   }
      // });
    }
    event.preventDefault();
    var Identifier = IdentifierStart+IdentifierEnd;
    var SendChangesHelper = this.SendChangesHelper(IdentifierStart,IdentifierEnd);

    var UrlMiddle = SendChangesHelper.UrlMiddle;
    var UrlEnd = SendChangesHelper.UrlEnd;
    var Content = SendChangesHelper.Content;



    // alert(JSON.stringify(SendChangesHelper, null, 2));

    // this.setState({
    //   Changes: Changes
    // });


    var URLPrefix = 'https://test-c6f20.firebaseio.com/Reports/Report_1';
    var URL = URLPrefix+UrlMiddle+UrlEnd+'.json'
    // alert(JSON.stringify(Content, null, 2));
    axios.put(URL, Content)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    if (SendChangesHelper.OldName !== null) {
      var  OtherUrlEnd = SendChangesHelper.OldName;
      var OtherURL = URLPrefix+UrlMiddle+"/"+OtherUrlEnd+'.json';

      // alert(SendChangesHelper.OldName);
      // alert(OtherURL);
      axios.put(OtherURL, [])
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }


  }

  render() {

    return (
      <div>
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
            <div>
            </div>
          }
        </div>

          <div>
            <form >

              <input type="hidden" name="_token" defaultValue="npSVkUIOsNL20SlLcSZeGJGBnmGSGE13wJMvXhqb" ></input>
              <input className="kv-di-no" type="text" name="form" defaultValue="data"></input>
              <br></br>
              <h2>JS Data</h2>
              <DataHelper
                identifier="Changes"
                Attr={this.state.Attr}
                Data={this.state.Data.content}
                ChangeUpdateContents={(Identifier,value) => this.ChangeUpdateContents(Identifier,value)}
                ChangeUpdateName={(IdentifierStart,IdentifierEnd,value) => this.ChangeUpdateName(IdentifierStart,IdentifierEnd,value)}
                submit={(IdentifierStart,IdentifierEnd) => this.SendChanges(IdentifierStart,IdentifierEnd)}
                />
            </form>
            Changes
            <pre>{JSON.stringify(this.state.Changes, null, 2) }</pre>
            Data
            <pre>{JSON.stringify(this.state.Data, null, 2) }</pre>
          </div>

      </div>
    );


  }
}

// Recursive component
const DataHelper = ({ identifier,Attr, Data, ChangeUpdateContents, ChangeUpdateName, submit}) => {



  return (
    <ul className="kv-list-parent">
      {typeof Data !== 'undefined' && Object.keys(Data).map((keyName, i) => (

        <li key={identifier+"["+"'content'"+"]['"+keyName+"']"}>


          <div className="kv-item-container  kv-di-in ">
            {/* Base Casfe */}
            {Data[keyName].type == "folder" ?
              <div className="kv-di-in">📁</div>
              :
              <div className="kv-di-in">📃</div>
            }

            <label >
              <input className="kv-tog-on-ib-switch kv-tog-off-ib-switch" type="checkbox" name="checkbox" defaultValue="value" ></input>
              <input  onBlur={(Identifier,value) => {ChangeUpdateName(identifier+"["+"'content'"+"]","['"+keyName+"']",event.target.value)}} className="kv-field-container kv-name kv-tog-on-ib" type="text"  defaultValue={keyName} ></input>
              <div className="kv-name-unedit kv-name kv-tog-off-ib ">{keyName}</div>
              <span className="kv-little-button ">^</span>
            </label>


            <input className="kv-di-no" type="text"  defaultValue={Data[keyName].type} ></input>


            {Data[keyName].type == "folder" &&
              <input className="kv-di-no" type="text"  defaultValue={Data[keyName].entity_type} ></input>
            }


            <button onClick={(IdentifierStart,IdentifierEnd) => {submit(identifier+"["+"'content'"+"]","['"+keyName+"']")}} className="kv-little-button" type="submit"  value="update">✓</button>
            <button className="kv-little-button" type="submit"  value="delete">×</button>



            {Data[keyName].type == "folder" &&
              <label className="kv-po-re">
                <span className="kv-little-button ">+</span>
                <input className="kv-tog-on-bl-switch" type="checkbox" name="checkbox" defaultValue="value" ></input>
                <div className="kv-popover kv-tog-on-bl kv-item-container  kv-di-in" >
                  <div className="" >
                    <span>📁</span>
                    <input className="kv-field-container kv-name kv-di-in "  type="text"     ></input>
                    <button type="submit" className="kv-little-button"  value="create_folder">+</button>
                  </div>
                  <div className="kv-mar-top-3">
                    <span>📃</span>
                    <input className="kv-field-container kv-name kv-di-in"  type="text"  ></input>
                    <button type="submit" className="kv-little-button"  value="create_file">+</button>
                  </div>
                </div>
              </label>
            }


          </div>
          {Data[keyName].type == "folder" ?

            <DataHelper
              identifier= {identifier+"["+"'content'"+"]['"+keyName+"']"}
              Attr= {Attr}
              Data={Data[keyName].content}
              ChangeUpdateContents={(Identifier,value) => {ChangeUpdateContents(Identifier,value)}}
              ChangeUpdateName={(IdentifierStart,IdentifierEnd,value) => {ChangeUpdateName(IdentifierStart,IdentifierEnd,value)}}
              submit={(IdentifierStart,IdentifierEnd) => {submit(IdentifierStart,IdentifierEnd)}}
              />

            :
            <ul className="kv-list-parent">
              <li>
                <div className="kv-item-container ">
                  <textarea onChange={(Identifier,value) => {ChangeUpdateContents(identifier+"["+"'content'"+"]['"+keyName+"']['"+Attr[2]+"']",event.target.value)}} className="kv-field-container kv-content-container kv-di-in"  rows="8" defaultValue={Data[keyName].content}></textarea>
                </div>
              </li>
            </ul>
          }
        </li>
      ))}

    </ul>


  )
}
