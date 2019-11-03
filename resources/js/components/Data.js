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
      10: 'oldname',
    },
    loading: "loaded",

  };
  componentDidMount () {
    this.GetAllData();
  }

  GetAllData(){
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
      var ShowData = response.data;
      var CreateDecomDataChanges = this.CreateDecomDataChanges(ShowData);
      var loading = "loaded";
      this.setState({
        ShowData: ShowData,
        ShowDecomDataChanges: CreateDecomDataChanges,
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
    // var ShowData = {
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
    // var CreateDecomDataChanges = this.CreateDecomDataChanges(ShowData);
    // var loading = "failed";
    //
    // this.setState({
    //   ShowData: ShowData,
    //   ShowDecomDataChanges: CreateDecomDataChanges,
    //   loading:loading
    // });

    // --------
    // offline end
    // --------





  }

  CreateDecomDataChanges(ShowData)  {
    var Attr = this.state.Attr;
    var result = {content: this.CreateDecomDataChangesHelper(ShowData.content,Attr)};

    return result;
  }

  CreateDecomDataChangesHelper(ShowData, Attr)  {

    var result = {};

    Object.keys(ShowData).forEach(function(keyName){

      result[keyName] = {};

      if (ShowData[keyName].type == "folder"){

        result[keyName][Attr[2]] = this.CreateDecomDataChangesHelper( ShowData[keyName].content,Attr);
        result[keyName][Attr[6]]= {}

      } else {
        result[keyName][Attr[2]] = ShowData[keyName].content;
      }
      result[keyName][Attr[1]] = ShowData[keyName].type;
    }, this);



    return result;
  }


  CreateData(ShowDecomDataChanges)  {
    var Attr = this.state.Attr;
    var result = {content: this.CreateDataHelper(ShowDecomDataChanges.content,Attr)};

    return result;
  }

  CreateDataHelper(ShowDecomDataChanges, Attr)  {

    var result = {};

    Object.keys(ShowDecomDataChanges).forEach(function(keyName){


      // result[keyName][Attr[3]] = "update/delete";
      if (ShowDecomDataChanges[keyName] !== null) {
        result[keyName] = {};

        if (ShowDecomDataChanges[keyName].type == "folder"){

          result[keyName][Attr[2]] = this.CreateDataHelper( ShowDecomDataChanges[keyName].content,Attr);
          // result[keyName][Attr[6]]= {}

          // result[keyName][Attr[6]]["folder"] = null;
          // result[keyName][Attr[6]]["file"] = null;
          // result[keyName][Attr[3]] = "create_folder"+"/"+"create_file";

        } else {
          result[keyName][Attr[2]] = ShowDecomDataChanges[keyName].content;
        }
        result[keyName][Attr[1]] = ShowDecomDataChanges[keyName].type;
      }
    }, this);



    return result;
  }


  UpdateDecomDataChanges (changerIdentifier,value){

    var ShowDecomDataChanges = this.state.ShowDecomDataChanges;
    eval(changerIdentifier+"=value");
    var ShowData = this.CreateData(ShowDecomDataChanges);
    this.setState({
      ShowDecomDataChanges: ShowDecomDataChanges,
      ShowData: ShowData
    });



  }


  UpdateNameDecomDataChanges (IdentifierStart,IdentifierEnd,value){
    var changerIdentifier = IdentifierStart+IdentifierEnd;

    var ShowDecomDataChanges = this.state.ShowDecomDataChanges;

    var SubjectSelector = changerIdentifier;
    SubjectSelector = SubjectSelector.replaceAll("\\['", ".");
    SubjectSelector = SubjectSelector.replaceAll("\\']", "");
    var branch = eval(changerIdentifier);

    var oldname = IdentifierEnd;
    oldname = oldname.replaceAll("\\['", "");
    oldname = oldname.replaceAll("\\']", "");

    var Attr = this.state.Attr;
    branch[Attr[10]] = oldname;

    // eval(changerIdentifier+"= null");
    eval("delete "+changerIdentifier);
    eval(IdentifierStart+"['"+value+"']=branch");
    var ShowData = this.CreateData(ShowDecomDataChanges);
    this.setState({
      ShowDecomDataChanges: ShowDecomDataChanges,
      ShowData: ShowData
    });



  }

  SendDataChanges(IdentifierStart,IdentifierEnd){
    event.preventDefault();
    var Identifier = IdentifierStart+IdentifierEnd;
    var ComprDataChanges = this.CreateComprDataChanges(IdentifierStart,IdentifierEnd);

    var UrlMiddle = ComprDataChanges.UrlMiddle;
    var UrlEnd = ComprDataChanges.UrlEnd;
    var Content = ComprDataChanges.Content;



    // alert(JSON.stringify(ComprDataChanges, null, 2));

    // this.setState({
    //   ShowDecomDataChanges: ShowDecomDataChanges
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

    if (ComprDataChanges.OldName !== null) {
      var  OtherUrlEnd = ComprDataChanges.OldName;
      var OtherURL = URLPrefix+UrlMiddle+"/"+OtherUrlEnd+'.json';

      // alert(ComprDataChanges.OldName);
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



  CreateComprDataChanges(IdentifierStart,IdentifierEnd){
    var ShowDecomDataChanges = this.state.ShowDecomDataChanges;
    // eval(IdentifierStart,IdentifierEnd+"['action']='update'");
    var Identifier = IdentifierStart+IdentifierEnd;
    
    var ShowComprDataChanges = eval(Identifier);

    var UrlMiddle = IdentifierStart;
    UrlMiddle = UrlMiddle.replaceAll("\\['", "/");
    UrlMiddle = UrlMiddle.replaceAll("'\\]", "");
    UrlMiddle = UrlMiddle.replace("ShowDecomDataChanges", "");


    var UrlEnd = IdentifierEnd;
    UrlEnd = UrlEnd.replaceAll("\\['", "/");
    UrlEnd = UrlEnd.replaceAll("'\\]", "");

    var Attr = this.state.Attr;
    if (typeof ShowComprDataChanges[Attr[10]] !== 'undefined') {
      var OldName = ShowComprDataChanges[Attr[10]]
      delete ShowComprDataChanges[Attr[10]];
    } else {
      var OldName = null
    }
    return {
      UrlMiddle:UrlMiddle,
      UrlEnd:UrlEnd,
      Content:ShowComprDataChanges,
      OldName:OldName
    };

    // var ShowDecomDataChanges = this.state.ShowDecomDataChanges;
    //
    // var ShowComprDataChangesContent = {
    //   "Data": this.state.ShowComprDataChanges,
    //   "_token": "vcO9EvF6wZK0xEafB9Za7b43gO3Yhg56Lr6kB19D",
    //   "form": "data",
    // }
    // // var UrlSuffix = "";
    // this.setState({
    //   ShowComprDataChanges: {
    //     "Content": ShowComprDataChangesContent,
    //     // "UrlSuffix": UrlSuffix
    //   }
    // });
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
                identifier="ShowDecomDataChanges"
                Attr={this.state.Attr}
                ShowData={this.state.ShowData.content}
                UpdateDecomDataChanges={(changerIdentifier,value) => this.UpdateDecomDataChanges(changerIdentifier,value)}
                UpdateNameDecomDataChanges={(IdentifierStart,IdentifierEnd,value) => this.UpdateNameDecomDataChanges(IdentifierStart,IdentifierEnd,value)}
                submit={(IdentifierStart,IdentifierEnd) => this.SendDataChanges(IdentifierStart,IdentifierEnd)}
                />
            </form>
            ShowDecomDataChanges
            <pre>{JSON.stringify(this.state.ShowDecomDataChanges, null, 2) }</pre>
            ShowData
            <pre>{JSON.stringify(this.state.ShowData, null, 2) }</pre>
          </div>

      </div>
    );


  }
}







// Recursive component
const DataHelper = ({ identifier,Attr, ShowData, UpdateDecomDataChanges, UpdateNameDecomDataChanges, submit}) => {



  return (
    <ul className="kv-list-parent">
      {typeof ShowData !== 'undefined' && Object.keys(ShowData).map((keyName, i) => (

        <li key={identifier+"["+"'content'"+"]['"+keyName+"']"}>


          <div className="kv-item-container  kv-di-in ">
            {/* Base Casfe */}
            {ShowData[keyName].type == "folder" ?
              <div className="kv-di-in">📁</div>
              :
              <div className="kv-di-in">📃</div>
            }

            <label >
              <input className="kv-tog-on-ib-switch kv-tog-off-ib-switch" type="checkbox" name="checkbox" defaultValue="value" ></input>
              <input  onBlur={(changerIdentifier,value) => {UpdateNameDecomDataChanges(identifier+"["+"'content'"+"]","['"+keyName+"']",event.target.value)}} className="kv-field-container kv-name kv-tog-on-ib" type="text"  defaultValue={keyName} ></input>
              <div className="kv-name-unedit kv-name kv-tog-off-ib ">{keyName}</div>
              <span className="kv-little-button ">^</span>
            </label>


            <input className="kv-di-no" type="text"  defaultValue={ShowData[keyName].type} ></input>


            {ShowData[keyName].type == "folder" &&
              <input className="kv-di-no" type="text"  defaultValue={ShowData[keyName].entity_type} ></input>
            }


            <button onClick={(IdentifierStart,IdentifierEnd) => {submit(identifier+"["+"'content'"+"]","['"+keyName+"']")}} className="kv-little-button" type="submit"  value="update">✓</button>
            <button className="kv-little-button" type="submit"  value="delete">×</button>



            {ShowData[keyName].type == "folder" &&
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
          {ShowData[keyName].type == "folder" ?

            <DataHelper
              identifier= {identifier+"["+"'content'"+"]['"+keyName+"']"}
              Attr= {Attr}
              ShowData={ShowData[keyName].content}
              UpdateDecomDataChanges={(changerIdentifier,value) => {UpdateDecomDataChanges(changerIdentifier,value)}}
              UpdateNameDecomDataChanges={(IdentifierStart,IdentifierEnd,value) => {UpdateNameDecomDataChanges(IdentifierStart,IdentifierEnd,value)}}
              submit={(IdentifierStart,IdentifierEnd) => {submit(IdentifierStart,IdentifierEnd)}}
              />

            :
            <ul className="kv-list-parent">
              <li>
                <div className="kv-item-container ">
                  <textarea onChange={(changerIdentifier,value) => {UpdateDecomDataChanges(identifier+"["+"'content'"+"]['"+keyName+"']['"+Attr[2]+"']",event.target.value)}} className="kv-field-container kv-content-container kv-di-in"  rows="8" defaultValue={ShowData[keyName].content}></textarea>
                </div>
              </li>
            </ul>
          }
        </li>
      ))}

    </ul>


  )
}
